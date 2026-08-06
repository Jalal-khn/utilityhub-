"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Text } from "@/components/ui/typography";
import { Upload, Copy, Check, ImageIcon, Loader2 } from "lucide-react";

export default function ImageToBase64() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState("");
  const [base64, setBase64] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setFile(selectedFile);
      setBase64("");
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const convertToBase64 = () => {
    if (!file) return;
    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setBase64(result.split(",")[1] ?? result);
      setIsProcessing(false);
    };
    reader.onerror = () => {
      alert("Error reading the image file");
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const copyBase64 = () => {
    if (!base64) return;
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="img-base64-upload" />
            <label htmlFor="img-base64-upload" className="cursor-pointer">
              <ImageIcon className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload an image</Text>
            </label>
          </div>

          {previewUrl && (
            <div className="overflow-hidden rounded-lg border">
              <img src={previewUrl} alt="Preview" className="max-h-72 w-full object-contain" />
            </div>
          )}

          {file && (
            <Button onClick={convertToBase64} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert to Base64"
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {base64 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Base64 Output</span>
              <span className="text-sm font-normal text-muted-foreground">
                {base64.length.toLocaleString()} characters
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              value={base64}
              className="min-h-[160px] font-mono text-xs"
              onFocus={(e) => e.target.select()}
            />
            <Button onClick={copyBase64} variant="outline" className="w-full">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Base64
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
