"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/typography";
import { Upload, Download, Crop, Loader2 } from "lucide-react";

export default function CropImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState("");
  const [outputUrl, setOutputUrl] = React.useState("");
  const [cropWidth, setCropWidth] = React.useState(0);
  const [cropHeight, setCropHeight] = React.useState(0);
  const [offsetX, setOffsetX] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);
  const [imageSize, setImageSize] = React.useState({ width: 0, height: 0 });
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setOutputUrl("");
      const url = URL.createObjectURL(selectedFile);
      setOriginalUrl(url);
      const img = new Image();
      img.onload = () => {
        const width = Math.min(img.naturalWidth, 1000);
        const height = Math.min(img.naturalHeight, 1000);
        setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
        setCropWidth(width);
        setCropHeight(height);
        setOffsetX(0);
        setOffsetY(0);
      };
      img.src = url;
    }
  };

  const cropImage = async () => {
    if (!file) return;

    const width = Math.max(1, Math.min(cropWidth, imageSize.width - offsetX));
    const height = Math.max(1, Math.min(cropHeight, imageSize.height - offsetY));

    if (width <= 0 || height <= 0 || offsetX < 0 || offsetY < 0) {
      alert("Invalid crop dimensions. Check that the offset plus crop size fits within the image.");
      return;
    }

    setIsProcessing(true);
    try {
      const img = new Image();
      img.src = originalUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("Unable to read image"));
      });

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Unable to create canvas");
      ctx.drawImage(img, offsetX, offsetY, width, height, 0, 0, width, height);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("Crop failed"))), "image/png");
      });
      setOutputUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert("Error cropping image: " + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const clamp = (value: number, max: number) => Math.max(0, Math.min(value, max));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="crop-upload" />
            <label htmlFor="crop-upload" className="cursor-pointer">
              <Crop className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload an image</Text>
            </label>
          </div>

          {originalUrl && (
            <div className="overflow-hidden rounded-lg border">
              <img src={originalUrl} alt="Original" className="max-h-72 w-full object-contain" />
            </div>
          )}
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardHeader>
            <CardTitle>Crop Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crop-width">Width (px)</Label>
                <Input
                  id="crop-width"
                  type="number"
                  min={1}
                  max={imageSize.width}
                  value={cropWidth}
                  onChange={(e) => setCropWidth(clamp(Number(e.target.value) || 0, imageSize.width - offsetX))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="crop-height">Height (px)</Label>
                <Input
                  id="crop-height"
                  type="number"
                  min={1}
                  max={imageSize.height}
                  value={cropHeight}
                  onChange={(e) => setCropHeight(clamp(Number(e.target.value) || 0, imageSize.height - offsetY))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offset-x">Offset X (px)</Label>
                <Input
                  id="offset-x"
                  type="number"
                  min={0}
                  max={imageSize.width}
                  value={offsetX}
                  onChange={(e) => setOffsetX(clamp(Number(e.target.value) || 0, imageSize.width - cropWidth))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="offset-y">Offset Y (px)</Label>
                <Input
                  id="offset-y"
                  type="number"
                  min={0}
                  max={imageSize.height}
                  value={offsetY}
                  onChange={(e) => setOffsetY(clamp(Number(e.target.value) || 0, imageSize.height - cropHeight))}
                />
              </div>
            </div>

            <Button onClick={cropImage} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cropping...
                </>
              ) : (
                "Crop Image"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {outputUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Cropped Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img src={outputUrl} alt="Cropped image" className="w-full rounded-lg border" />
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = outputUrl;
                link.download = "cropped.png";
                link.click();
              }}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PNG
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
