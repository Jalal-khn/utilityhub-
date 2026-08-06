"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Upload, Download, FileImage, Loader2, X } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function JpgToPdf() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [generatedUrl, setGeneratedUrl] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/jpg"
    );

    if (imageFiles.length === 0) {
      alert("Please upload JPG or JPEG images");
      return;
    }

    setFiles((prev) => [...prev, ...imageFiles]);
    setGeneratedUrl("");
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setGeneratedUrl("");
  };

  const convertJpgToPdf = async () => {
    if (files.length === 0) {
      alert("Please upload at least one JPG image");
      return;
    }

    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const page = pdfDoc.addPage([612, 792]);
        const embeddedImage = await pdfDoc.embedJpg(await file.arrayBuffer());
        const scale = Math.min(0.9 * 612 / embeddedImage.width, 0.9 * 792 / embeddedImage.height);
        const drawWidth = embeddedImage.width * scale;
        const drawHeight = embeddedImage.height * scale;
        const x = (612 - drawWidth) / 2;
        const y = (792 - drawHeight) / 2;

        page.drawImage(embeddedImage, {
          x,
          y,
          width: drawWidth,
          height: drawHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setGeneratedUrl(url);
    } catch (error) {
      alert("Error converting JPG to PDF: " + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPdf = () => {
    if (!generatedUrl) return;
    const link = document.createElement("a");
    link.href = generatedUrl;
    link.download = "jpg-to-pdf.pdf";
    link.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload JPG Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input
              type="file"
              accept="image/jpeg,image/jpg"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="jpg-upload"
            />
            <label htmlFor="jpg-upload" className="cursor-pointer">
              <FileImage className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload JPG images</Text>
              <Text variant="muted" className="text-xs">
                Each image becomes a separate PDF page
              </Text>
            </label>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Text variant="muted" className="text-sm">
                Selected images ({files.length}):
              </Text>
              {files.map((file, index) => (
                <div key={`${file.name}-${index}`} className="flex items-center justify-between rounded bg-muted p-2">
                  <Text className="truncate text-sm">{file.name}</Text>
                  <Button onClick={() => removeFile(index)} variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Create PDF</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={convertJpgToPdf} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert JPG to PDF"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {generatedUrl && (
        <Card>
          <CardHeader>
            <CardTitle>PDF Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={downloadPdf} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
