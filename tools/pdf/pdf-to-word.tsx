"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Upload, Download, FileText, Loader2 } from "lucide-react";
import { extractPdfText } from "@/lib/pdf-render";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export default function PdfToWord() {
  const [file, setFile] = React.useState<File | null>(null);
  const [outputUrl, setOutputUrl] = React.useState("");
  const [outputName, setOutputName] = React.useState("converted.doc");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setOutputUrl("");
    } else if (selectedFile) {
      alert("Please upload a PDF file");
    }
  };

  const convert = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const pages = await extractPdfText(file);
      const base = (file.name.replace(/\.pdf$/i, "") || "document").replace(/[\\/:*?"<>|]/g, "");

      let html =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'><head><meta charset='utf-8'><title>Converted from " +
        base +
        "</title></head><body>";
      pages.forEach((text, index) => {
        html += `<p style='font-size:12pt;font-weight:bold'>Page ${index + 1}</p>`;
        html += `<p style='font-size:12pt'>${escapeHtml(text || "(No extractable text on this page)")}</p>`;
      });
      html += "</body></html>";

      const blob = new Blob(["\ufeff" + html], { type: "application/msword" });
      setOutputUrl(URL.createObjectURL(blob));
      setOutputName(base + ".doc");
    } catch (error) {
      alert("Error converting PDF: " + (error as Error).message);
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
            Upload PDF
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input type="file" accept="application/pdf" onChange={handleFileChange} className="hidden" id="pdf-word-upload" />
            <label htmlFor="pdf-word-upload" className="cursor-pointer">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload a PDF file</Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardHeader>
            <CardTitle>Convert to Word</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={convert} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Convert to Word (.doc)"
              )}
            </Button>
            <Text variant="muted" className="text-xs">
              Extracts the selectable text from each page into a Word document. Text-only; scanned (image) PDFs produce empty pages.
            </Text>
          </CardContent>
        </Card>
      )}

      {outputUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Word Document Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = outputUrl;
                link.download = outputName;
                link.click();
              }}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download .doc
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
