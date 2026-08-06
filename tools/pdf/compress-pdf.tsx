"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileText, Loader2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function CompressPdf() {
  const [file, setFile] = React.useState<File | null>(null);
  const [compressedUrl, setCompressedUrl] = React.useState<string>("");
  const [originalSize, setOriginalSize] = React.useState<number>(0);
  const [compressedSize, setCompressedSize] = React.useState<number>(0);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setOriginalSize(selectedFile.size);
      setCompressedUrl("");
      setCompressedSize(0);
    } else if (selectedFile) {
      alert("Please upload a PDF file");
    }
  };

  const compressPdf = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);

      const compressedBytes = await pdf.save({ useObjectStreams: true });
      const blob = new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" });
      setCompressedUrl(URL.createObjectURL(blob));
      setCompressedSize(blob.size);
    } catch (error) {
      alert("Error compressing PDF: " + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedUrl || !file) return;
    const link = document.createElement("a");
    link.href = compressedUrl;
    link.download = `compressed_${file.name}`;
    link.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const savings =
    originalSize > 0 && compressedSize > 0
      ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload PDF file</Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Compress PDF</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={compressPdf} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Compressing...
                  </>
                ) : (
                  "Compress PDF"
                )}
              </Button>
              <div className="rounded-lg bg-muted/60 p-3">
                <Text variant="muted" className="text-xs">
                  This rebuilds the PDF structure and removes embedded metadata to reduce size. The embedded
                  images themselves are not re-compressed, so size savings depend on how much metadata and
                  redundant structure the file contains.
                </Text>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Original</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Text variant="muted" className="text-sm">
                  Size: {formatSize(originalSize)}
                </Text>
              </CardContent>
            </Card>

            {compressedUrl && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Compressed</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Text variant="muted" className="text-sm">
                    Size: {formatSize(compressedSize)}
                  </Text>
                  {savings > 0 ? (
                    <Text className="text-sm font-semibold text-green-500">
                      {savings}% smaller
                    </Text>
                  ) : (
                    <Text className="text-sm text-muted-foreground">
                      No size reduction (this file was already optimized).
                    </Text>
                  )}
                  <Button onClick={downloadCompressed} size="sm" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
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
