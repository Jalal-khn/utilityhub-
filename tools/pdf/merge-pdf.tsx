"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Upload, Download, FileText, Loader2, X } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function MergePdf() {
  const [files, setFiles] = React.useState<File[]>([]);
  const [mergedUrl, setMergedUrl] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const pdfFiles = selectedFiles.filter(f => f.type === "application/pdf");
    setFiles(prev => [...prev, ...pdfFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const mergePdfs = async () => {
    if (files.length < 2) {
      alert("Please select at least 2 PDF files to merge");
      return;
    }

    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach(page => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes as any], { type: "application/pdf" });
      setMergedUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert("Error merging PDFs: " + (error as Error).message);
    }

    setIsProcessing(false);
  };

  const downloadMerged = () => {
    if (!mergedUrl) return;
    const link = document.createElement("a");
    link.href = mergedUrl;
    link.download = "merged.pdf";
    link.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload PDF Files
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <Text variant="muted">Click to upload PDF files</Text>
              <Text variant="muted" className="text-xs">
                Select multiple files to merge
              </Text>
            </label>
          </div>

          {files.length > 0 && (
            <div className="space-y-2">
              <Text variant="muted" className="text-sm">
                Selected files ({files.length}):
              </Text>
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-muted p-2 rounded">
                  <Text className="text-sm truncate">{file.name}</Text>
                  <Button
                    onClick={() => removeFile(index)}
                    variant="ghost"
                    size="sm"
                  >
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
            <CardTitle>Merge PDFs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={mergePdfs} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Merging...
                </>
              ) : (
                "Merge PDFs"
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {mergedUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Merged PDF Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={downloadMerged} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Merged PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
