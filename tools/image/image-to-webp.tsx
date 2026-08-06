"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Upload, Download, Image as ImageIcon, Loader2 } from "lucide-react";

export default function ImageToWebp() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string>("");
  const [convertedUrl, setConvertedUrl] = React.useState<string>("");
  const [quality, setQuality] = React.useState([85]);
  const [originalSize, setOriginalSize] = React.useState<number>(0);
  const [convertedSize, setConvertedSize] = React.useState<number>(0);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setOriginalUrl(URL.createObjectURL(selectedFile));
      setConvertedUrl("");
      setConvertedSize(0);
    }
  };

  const convertToWebp = () => {
    if (!file || !originalUrl) return;

    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setConvertedUrl(URL.createObjectURL(blob));
              setConvertedSize(blob.size);
            }
            setIsProcessing(false);
          },
          "image/webp",
          quality[0] / 100
        );
      } else {
        setIsProcessing(false);
      }
    };
    img.onerror = () => {
      setIsProcessing(false);
      alert("Unable to load the image");
    };
    img.src = originalUrl;
  };

  const downloadConverted = () => {
    if (!convertedUrl || !file) return;
    const link = document.createElement("a");
    link.href = convertedUrl;
    const fileName = file.name.substring(0, file.name.lastIndexOf(".")) + ".webp";
    link.download = fileName;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const savings = originalSize > 0 && convertedSize > 0
    ? Math.round(((originalSize - convertedSize) / originalSize) * 100)
    : 0;

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
                PNG, JPG, GIF, and other formats supported
              </Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Conversion Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Text variant="muted">Quality</Text>
                  <Text variant="muted">{quality[0]}%</Text>
                </div>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  min={10}
                  max={100}
                  step={5}
                />
                <Text variant="muted" className="text-xs">
                  WEBP provides superior compression. Higher quality = larger file size.
                </Text>
              </div>
              <Button onClick={convertToWebp} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  "Convert to WEBP"
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
                  Size: {formatSize(originalSize)}
                </Text>
              </CardContent>
            </Card>

            {convertedUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">WEBP</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <img src={convertedUrl} alt="Converted" className="w-full rounded" />
                  <Text variant="muted" className="text-sm">
                    Size: {formatSize(convertedSize)}
                  </Text>
                  {savings > 0 && (
                    <Text className="text-sm text-green-500 font-semibold">
                      {savings}% smaller
                    </Text>
                  )}
                  <Button onClick={downloadConverted} size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download WEBP
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
