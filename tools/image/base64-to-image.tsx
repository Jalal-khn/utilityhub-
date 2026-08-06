"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Text } from "@/components/ui/typography";
import { Download, ImageIcon, RefreshCw, Loader2 } from "lucide-react";

export default function Base64ToImage() {
  const [input, setInput] = React.useState("");
  const [outputUrl, setOutputUrl] = React.useState("");
  const [error, setError] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const convertToImage = () => {
    const trimmed = input.trim();
    if (!trimmed) {
      setError("Please paste a Base64 string first.");
      setOutputUrl("");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const payload = trimmed.startsWith("data:image") ? (trimmed.split(",")[1] ?? "") : trimmed;
      const compact = payload.replace(/\s+/g, "");

      if (!/^[A-Za-z0-9+/]*={0,2}$/.test(compact) || compact.length % 4 !== 0) {
        throw new Error("Invalid Base64 payload");
      }

      const binary = atob(compact);
      if (binary.length === 0) {
        throw new Error("Empty payload");
      }

      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      let mime = "image/png";
      if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) mime = "image/jpeg";
      else if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) mime = "image/png";
      else if (bytes[0] === 0x47 && bytes[1] === 0x49 && bytes[2] === 0x46) mime = "image/gif";
      else if (bytes[0] === 0x52 && bytes[1] === 0x49 && bytes[2] === 0x46 && bytes[3] === 0x46) mime = "image/webp";

      setOutputUrl(`data:${mime};base64,${compact}`);
    } catch {
      setError("The Base64 string is invalid or does not contain image data.");
      setOutputUrl("");
    } finally {
      setIsProcessing(false);
    }
  };

  const outputExtension = (url: string): string => {
    const match = url.match(/^data:(image\/\w+);/);
    if (!match) return "png";
    const type = match[1].split("/")[1];
    return type === "jpeg" ? "jpg" : type;
  };

  const clearAll = () => {
    setInput("");
    setOutputUrl("");
    setError("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Base64 to Image
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Text variant="muted" className="text-sm">
              Paste a Base64 encoded image string
            </Text>
            <Textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError("");
              }}
              placeholder="data:image/png;base64,iVBORw0KGgo... or raw Base64"
              className="min-h-[160px] font-mono text-xs"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-2">
            <Button onClick={convertToImage} disabled={isProcessing} className="flex-1">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Decoding...
                </>
              ) : (
                "Convert to Image"
              )}
            </Button>
            <Button onClick={clearAll} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {outputUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Decoded Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center rounded-lg border bg-muted/30 p-4">
              <img src={outputUrl} alt="Decoded from Base64" className="max-h-96 w-full object-contain" />
            </div>
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = outputUrl;
                link.download = `decoded-image.${outputExtension(outputUrl)}`;
                link.click();
              }}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
