"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Upload, Download, FileImage, Loader2, X } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function ImageToPdf() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [generatedUrl, setGeneratedUrl] = React.useState<string>("");
  const [generatedName, setGeneratedName] = React.useState("image-to-pdf.pdf");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const imageFiles = selectedFiles.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) {
      alert("Please upload at least one supported image file");
      return;
    }

    setFiles((prev) => [...prev, ...imageFiles]);
    setGeneratedUrl("");
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setGeneratedUrl("");
  };

  const loadImageAsPngArrayBuffer = async (file: File): Promise<ArrayBuffer> => {
    const imageUrl = URL.createObjectURL(file);

    try {
      const image = await new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(new Error("Unable to load image"));
        img.src = imageUrl;
      });

      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Unable to create canvas context");
      }

      context.drawImage(image, 0, 0);

      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((result) => {
          if (result) {
            resolve(result);
          } else {
            reject(new Error("Failed to convert image"));
          }
        }, "image/png");
      });

      return await blob.arrayBuffer();
    } finally {
      URL.revokeObjectURL(imageUrl);
    }
  };

  const convertImagesToPdf = async () => {
    if (files.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    setIsProcessing(true);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const page = pdfDoc.addPage([612, 792]);
        let embeddedImage;

        if (file.type === "image/png") {
          embeddedImage = await pdfDoc.embedPng(await file.arrayBuffer());
        } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
          embeddedImage = await pdfDoc.embedJpg(await file.arrayBuffer());
        } else {
          embeddedImage = await pdfDoc.embedPng(await loadImageAsPngArrayBuffer(file));
        }

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
      setGeneratedName(files[0]?.name.replace(/\.[^.]+$/, "") + ".pdf" || "image-to-pdf.pdf");
    } catch (error) {
      alert("Error converting images to PDF: " + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadPdf = () => {
    if (!generatedUrl) return;

    const link = document.createElement("a");
    link.href = generatedUrl;
    link.download = generatedName;
    link.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Images
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload" className="cursor-pointer">
              <FileImage className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload images</Text>
              <Text variant="muted" className="text-xs">
                PNG, JPG, JPEG, and WEBP images are supported
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
            <Button onClick={convertImagesToPdf} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert Images to PDF"
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
