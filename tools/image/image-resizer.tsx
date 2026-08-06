"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, Image as ImageIcon, Loader2 } from "lucide-react";

export default function ImageResizer() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string>("");
  const [resizedUrl, setResizedUrl] = React.useState<string>("");
  const [width, setWidth] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [maintainAspect, setMaintainAspect] = React.useState(true);
  const [originalDimensions, setOriginalDimensions] = React.useState({ width: 0, height: 0 });
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      const url = URL.createObjectURL(selectedFile);
      setOriginalUrl(url);
      setResizedUrl("");

      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height });
        setWidth(img.width.toString());
        setHeight(img.height.toString());
      };
      img.src = url;
    }
  };

  const handleWidthChange = (value: string) => {
    setWidth(value);
    if (maintainAspect && originalDimensions.width > 0) {
      const ratio = originalDimensions.height / originalDimensions.width;
      const newHeight = Math.round(parseInt(value) * ratio);
      setHeight(newHeight.toString());
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (maintainAspect && originalDimensions.height > 0) {
      const ratio = originalDimensions.width / originalDimensions.height;
      const newWidth = Math.round(parseInt(value) * ratio);
      setWidth(newWidth.toString());
    }
  };

  const resizeImage = () => {
    if (!file || !originalUrl || !width || !height) return;

    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = parseInt(width);
      canvas.height = parseInt(height);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setResizedUrl(URL.createObjectURL(blob));
            }
            setIsProcessing(false);
          },
          file.type
        );
      }
    };
    img.src = originalUrl;
  };

  const downloadResized = () => {
    if (!resizedUrl || !file) return;
    const link = document.createElement("a");
    link.href = resizedUrl;
    link.download = `resized_${file.name}`;
    link.click();
  };

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
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <Text variant="muted">Click to upload or drag and drop</Text>
              <Text variant="muted" className="text-xs">
                PNG, JPG, WEBP supported
              </Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Resize Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Width (px)</Label>
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    placeholder="Width"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Height (px)</Label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    placeholder="Height"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="maintain-aspect"
                  checked={maintainAspect}
                  onChange={(e) => setMaintainAspect(e.target.checked)}
                  className="h-4 w-4"
                />
                <Label htmlFor="maintain-aspect">Maintain aspect ratio</Label>
              </div>

              <Text variant="muted" className="text-sm">
                Original: {originalDimensions.width} x {originalDimensions.height} px
              </Text>

              <Button onClick={resizeImage} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Resize Image"
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Original</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <img src={originalUrl} alt="Original" className="w-full rounded" />
                <Text variant="muted" className="text-sm">
                  {originalDimensions.width} x {originalDimensions.height} px
                </Text>
              </CardContent>
            </Card>

            {resizedUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Resized</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <img src={resizedUrl} alt="Resized" className="w-full rounded" />
                  <Text variant="muted" className="text-sm">
                    {width} x {height} px
                  </Text>
                  <Button onClick={downloadResized} size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
