"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, FileText, Loader2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";

export default function SplitPdf() {
  const [file, setFile] = React.useState<File | null>(null);
  const [splitMode, setSplitMode] = React.useState<"range" | "extract">("range");
  const [pageRange, setPageRange] = React.useState("1-");
  const [extractPages, setExtractPages] = React.useState("");
  const [splitUrls, setSplitUrls] = React.useState<{ name: string; url: string }[]>([]);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setSplitUrls([]);
    } else if (selectedFile) {
      alert("Please upload a PDF file");
    }
  };

  const splitPdf = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const totalPages = pdf.getPageCount();
      const urls: { name: string; url: string }[] = [];

      if (splitMode === "range") {
        const parts = pageRange.split("-");
        if (parts.length !== 2) {
          throw new Error("Invalid page range. Use a format like 1-5 or 3-");
        }

        const startRaw = parseInt(parts[0].trim(), 10);
        const endRaw = parts[1].trim() === "" ? totalPages : parseInt(parts[1].trim(), 10);

        if (
          isNaN(startRaw) || isNaN(endRaw) ||
          startRaw < 1 || startRaw > totalPages ||
          endRaw < 1 || endRaw > totalPages
        ) {
          throw new Error("Invalid page range. Pages must be between 1 and " + totalPages);
        }

        const startPage = Math.min(startRaw, endRaw) - 1;
        const endPage = Math.max(startRaw, endRaw) - 1;

        const newPdf = await PDFDocument.create();
        const pageIndices: number[] = [];
        for (let i = startPage; i <= endPage; i++) {
          pageIndices.push(i);
        }
        const copiedPages = await newPdf.copyPages(pdf, pageIndices);
        copiedPages.forEach(page => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
        urls.push({ name: `split_${file.name}`, url: URL.createObjectURL(blob) });
      } else {
        const pages = extractPages.split(",").map(s => parseInt(s.trim())).filter(n => !isNaN(n) && n > 0 && n <= totalPages);
        
        const newPdf = await PDFDocument.create();
        const copiedPages = await newPdf.copyPages(pdf, pages.map(p => p - 1));
        copiedPages.forEach(page => newPdf.addPage(page));

        const pdfBytes = await newPdf.save();
        const blob = new Blob([pdfBytes as any], { type: "application/pdf" });
        urls.push({ name: `extracted_${file.name}`, url: URL.createObjectURL(blob) });
      }

      setSplitUrls(urls);
    } catch (error) {
      alert("Error splitting PDF: " + (error as Error).message);
    }

    setIsProcessing(false);
  };

  const downloadSplit = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
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
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <Text variant="muted">Click to upload PDF file</Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Split Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Split Mode</Label>
                <select
                  value={splitMode}
                  onChange={(e) => setSplitMode(e.target.value as "range" | "extract")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="range">Page Range</option>
                  <option value="extract">Extract Specific Pages</option>
                </select>
              </div>

              {splitMode === "range" ? (
                <div className="space-y-2">
                  <Label>Page Range (e.g., 1-5 or 3-)</Label>
                  <Input
                    value={pageRange}
                    onChange={(e) => setPageRange(e.target.value)}
                    placeholder="1-"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <Label>Pages to Extract (comma separated, e.g., 1,3,5)</Label>
                  <Input
                    value={extractPages}
                    onChange={(e) => setExtractPages(e.target.value)}
                    placeholder="1,3,5"
                  />
                </div>
              )}

              <Button onClick={splitPdf} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Split PDF"
                )}
              </Button>
            </CardContent>
          </Card>

          {splitUrls.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Split PDFs Ready</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {splitUrls.map((item, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-3 rounded">
                    <Text className="text-sm">{item.name}</Text>
                    <Button onClick={() => downloadSplit(item.url, item.name)} size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
