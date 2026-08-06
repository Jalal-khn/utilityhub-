"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Upload, Download, FileImage, Loader2 } from "lucide-react";
import JSZip from "jszip";
import { pdfToBlobs } from "@/lib/pdf-render";

export default function PdfToImage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>("");
  const [blobs, setBlobs] = React.useState<Blob[]>([]);
  const [pageCount, setPageCount] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setPreviewUrl("");
      setBlobs([]);
      setPageCount(0);
    } else if (selectedFile) {
      alert("Please upload a PDF file");
    }
  };

  const convertPdfToImage = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const rendered = await pdfToBlobs(file, "image/png", 1.5);
      setBlobs(rendered);
      setPageCount(rendered.length);
      setPreviewUrl(URL.createObjectURL(rendered[0]));
    } catch (error) {
      alert("Error converting PDF to image: " + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadAll = async () => {
    if (blobs.length === 0) return;
    const base = (file?.name || "pdf").replace(/\.pdf$/i, "");
    const zip = new JSZip();
    blobs.forEach((blob, index) => {
      zip.file(`${base}-page-${index + 1}.png`, blob);
    });
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = `${base}-images.zip`;
    link.click();
  };

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
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="pdf-upload" />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <FileImage className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload a PDF file</Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardHeader>
            <CardTitle>Convert to Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={convertPdfToImage} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert PDF to Image"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {previewUrl && (
        <Card>
          <CardHeader>
            <CardTitle>PNG Ready</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <img src={previewUrl} alt="Converted PDF preview" className="w-full rounded-lg border" />
            <Text variant="muted" className="text-sm">
              {pageCount} page{pageCount === 1 ? "" : "s"} converted. All pages are included in the ZIP.
            </Text>
            <Button onClick={downloadAll} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download All PNGs (ZIP)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
