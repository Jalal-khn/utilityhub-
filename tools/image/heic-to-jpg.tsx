"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Upload, Download, ImageIcon, Loader2 } from "lucide-react";

export default function HeicToJpg() {
  const [file, setFile] = React.useState<File | null>(null);
  const [outputUrl, setOutputUrl] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setOutputUrl("");
    }
  };

  const convert = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const heic2any = (await import("heic2any")).default;
      const result = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality: 0.92,
      });
      const blob = Array.isArray(result) ? result[0] : result;
      setOutputUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert(
        "Error converting image: " +
          (error as Error).message +
          " Make sure you selected a valid HEIC/HEIF file."
      );
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
            Upload HEIC / HEIF Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input
              type="file"
              accept=".heic,.heif,image/heic,image/heif"
              onChange={handleFileChange}
              className="hidden"
              id="heic-upload"
            />
            <label htmlFor="heic-upload" className="cursor-pointer">
              <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload a HEIC or HEIF file</Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardHeader>
            <CardTitle>Convert to JPG</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={convert} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert to JPG"
              )}
            </Button>
            <Text variant="muted" className="text-xs">
              Conversion runs locally in your browser using WebAssembly.
            </Text>
          </CardContent>
        </Card>
      )}

      {outputUrl && (
        <Card>
          <CardHeader>
            <CardTitle>JPG Ready</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img src={outputUrl} alt="Converted JPG" className="w-full rounded-lg border" />
            <Button
              onClick={() => {
                const base = (file?.name || "converted").replace(/\.[^.]+$/, "");
                const link = document.createElement("a");
                link.href = outputUrl;
                link.download = `${base}.jpg`;
                link.click();
              }}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download JPG
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
