"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Text } from "@/components/ui/typography";
import { Upload, Download, RotateCw, Loader2 } from "lucide-react";

const clamp = (value: number) => Math.min(360, Math.max(0, Math.round(value)));

export default function RotateImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [angle, setAngle] = React.useState(90);
  const [outputUrl, setOutputUrl] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setOutputUrl("");
    }
  };

  const handleAngleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(e.target.value);
    setAngle(Number.isNaN(parsed) ? 0 : clamp(parsed));
  };

  const rotate = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const objectUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = objectUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error("Unable to read image"));
      });

      const radians = (angle * Math.PI) / 180;
      const cos = Math.abs(Math.cos(radians));
      const sin = Math.abs(Math.sin(radians));
      const width = Math.round(img.naturalWidth * cos + img.naturalHeight * sin);
      const height = Math.round(img.naturalWidth * sin + img.naturalHeight * cos);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Unable to create canvas");

      ctx.translate(width / 2, height / 2);
      ctx.rotate(radians);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => (result ? resolve(result) : reject(new Error("Rotation failed"))), "image/png");
      });
      setOutputUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert("Error rotating image: " + (error as Error).message);
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
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="rotate-upload" />
            <label htmlFor="rotate-upload" className="cursor-pointer">
              <RotateCw className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload an image</Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardHeader>
            <CardTitle>Rotation Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-2">
              {[90, 180, 270].map((preset) => (
                <Button
                  key={preset}
                  type="button"
                  variant={angle === preset ? "default" : "outline"}
                  onClick={() => setAngle(preset)}
                >
                  {preset}°
                </Button>
              ))}
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <Text variant="muted">Angle</Text>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={angle}
                    onChange={handleAngleInput}
                    min={0}
                    max={360}
                    className="w-20 text-center"
                  />
                  <Text variant="muted">degrees</Text>
                </div>
              </div>
              <Slider value={[angle]} onValueChange={(value) => setAngle(value[0])} min={0} max={360} step={1} />
            </div>
            <Button onClick={rotate} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rotating...
                </>
              ) : (
                <>
                  <RotateCw className="mr-2 h-4 w-4" />
                  Rotate {angle}°
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {outputUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Rotated Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img src={outputUrl} alt="Rotated image" className="w-full rounded-lg border" />
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = outputUrl;
                link.download = "rotated.png";
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
