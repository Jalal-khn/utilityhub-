"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Upload, Download, FlipHorizontal, FlipVertical, Loader2 } from "lucide-react";

export default function FlipImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = React.useState("");
  const [outputUrl, setOutputUrl] = React.useState("");
  const [flipHorizontal, setFlipHorizontal] = React.useState(true);
  const [flipVertical, setFlipVertical] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setOutputUrl("");
      setOriginalUrl(URL.createObjectURL(selectedFile));
    }
  };

  const flipImage = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const img = new Image();
      img.src = originalUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("Unable to read image"));
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Unable to create canvas");

      ctx.translate(flipHorizontal ? canvas.width : 0, flipVertical ? canvas.height : 0);
      ctx.scale(flipHorizontal ? -1 : 1, flipVertical ? -1 : 1);
      ctx.drawImage(img, 0, 0);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("Flip failed"))), "image/png");
      });
      setOutputUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert("Error flipping image: " + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
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
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="flip-upload" />
            <label htmlFor="flip-upload" className="cursor-pointer">
              <FlipHorizontal className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
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
            <CardTitle>Flip Options</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <FlipHorizontal className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="flip-h">Flip horizontally</Label>
                  <p className="text-sm text-muted-foreground">Mirror left to right</p>
                </div>
              </div>
              <Switch id="flip-h" checked={flipHorizontal} onCheckedChange={setFlipHorizontal} />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <FlipVertical className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label htmlFor="flip-v">Flip vertically</Label>
                  <p className="text-sm text-muted-foreground">Mirror top to bottom</p>
                </div>
              </div>
              <Switch id="flip-v" checked={flipVertical} onCheckedChange={setFlipVertical} />
            </div>

            <Button onClick={flipImage} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Flipping...
                </>
              ) : (
                "Flip Image"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {outputUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Flipped Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img src={outputUrl} alt="Flipped image" className="w-full rounded-lg border" />
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = outputUrl;
                link.download = "flipped.png";
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
