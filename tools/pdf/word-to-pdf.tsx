"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Upload, Download, FileText, Loader2 } from "lucide-react";
import { PDFDocument, StandardFonts, PDFFont } from "pdf-lib";

function wrapText(text: string, font: PDFFont, fontSize: number, maxWidth: number): string[] {
  const paragraphs = text.split(/\n/);
  const lines: string[] = [];
  for (const paragraph of paragraphs) {
    if (!paragraph.trim()) {
      lines.push("");
      continue;
    }
    const words = paragraph.split(/\s+/);
    let current = "";
    for (const word of words) {
      const candidate = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, fontSize) <= maxWidth) {
        current = candidate;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

export default function WordToPdf() {
  const [file, setFile] = React.useState<File | null>(null);
  const [outputUrl, setOutputUrl] = React.useState("");
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
      let text = "";
      const lower = file.name.toLowerCase();

      if (lower.endsWith(".txt")) {
        text = (await file.text()).trim();
      } else if (lower.endsWith(".docx")) {
        const mammoth = (await import("mammoth/mammoth.browser")).default;
        const result = await mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
        text = (result.value || "").trim();
      } else {
        throw new Error("Unsupported file type. Please upload a .txt or .docx file.");
      }

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 11;
      const margin = 50;
      const pageWidth = 612;
      const pageHeight = 792;
      const maxWidth = pageWidth - margin * 2;
      const lineHeight = 15;
      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      if (!text) {
        page.drawText("No text content detected in the file.", { x: margin, y, size: fontSize, font });
      } else {
        const lines = wrapText(text, font, fontSize, maxWidth);
        for (const line of lines) {
          if (y < margin) {
            page = pdfDoc.addPage([pageWidth, pageHeight]);
            y = pageHeight - margin;
          }
          page.drawText(line, { x: margin, y, size: fontSize, font });
          y -= lineHeight;
        }
      }

      const bytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      setOutputUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert("Error converting file: " + (error as Error).message);
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
            Upload Text or Word Document
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input type="file" accept=".txt,.docx" onChange={handleFileChange} className="hidden" id="word-pdf-upload" />
            <label htmlFor="word-pdf-upload" className="cursor-pointer">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload a .txt or .docx file</Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <Card>
          <CardHeader>
            <CardTitle>Convert to PDF</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={convert} disabled={isProcessing} className="w-full">
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Converting...
                </>
              ) : (
                "Create PDF"
              )}
            </Button>
            <Text variant="muted" className="text-xs">
              Text is extracted from the document and rendered into the PDF. Formatting is not preserved.
            </Text>
          </CardContent>
        </Card>
      )}

      {outputUrl && (
        <Card>
          <CardHeader>
            <CardTitle>PDF Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = outputUrl;
                link.download = "converted.pdf";
                link.click();
              }}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
