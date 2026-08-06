"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Upload, Download, Image as ImageIcon, Loader2 } from "lucide-react";

export default function PngToJpg() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState<string>("");
  const [convertedUrl, setConvertedUrl] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "image/png") {
      setFile(selectedFile);
      setOriginalUrl(URL.createObjectURL(selectedFile));
      setConvertedUrl("");
    } else if (selectedFile) {
      alert("Please upload a PNG file");
    }
  };

  const convertToJpg = () => {
    if (!file || !originalUrl) return;

    setIsProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setConvertedUrl(URL.createObjectURL(blob));
            }
            setIsProcessing(false);
          },
          "image/jpeg",
          0.95
        );
      }
    };
    img.src = originalUrl;
  };

  const downloadConverted = () => {
    if (!convertedUrl || !file) return;
    const link = document.createElement("a");
    link.href = convertedUrl;
    link.download = file.name.replace(".png", ".jpg");
    link.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PNG Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/png"
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <Text variant="muted">Click to upload PNG file</Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Convert to JPG</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={convertToJpg} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  "Convert to JPG"
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Original PNG</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <img src={originalUrl} alt="Original" className="w-full rounded" />
              </CardContent>
            </Card>

            {convertedUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Converted JPG</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <img src={convertedUrl} alt="Converted" className="w-full rounded" />
                  <Button onClick={downloadConverted} size="sm" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download JPG
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
