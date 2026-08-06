"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Upload, Download, Presentation, Loader2 } from "lucide-react";
import { PDFDocument, StandardFonts, PDFFont } from "pdf-lib";
import JSZip from "jszip";

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

const unescapeXml = (value: string) =>
  value
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");

async function extractPptxSlides(zip: JSZip): Promise<string[]> {
  const slideFiles = Object.keys(zip.files)
    .filter((name) => /^ppt\/slides\/slide\d+\.xml$/.test(name))
    .sort((a, b) => {
      const na = parseInt(a.match(/slide(\d+)/)![1], 10);
      const nb = parseInt(b.match(/slide(\d+)/)![1], 10);
      return na - nb;
    });

  if (slideFiles.length === 0) {
    throw new Error("No slides found in the presentation.");
  }

  const slides: string[] = [];
  for (const name of slideFiles) {
    const xml = await zip.file(name)!.async("string");
    const texts: string[] = [];
    const regex = /<a:t[^>]*>([\s\S]*?)<\/a:t>/g;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(xml)) !== null) {
      const text = unescapeXml(match[1]).trim();
      if (text) texts.push(text);
    }
    slides.push(texts.join("\n"));
  }
  return slides;
}

export default function PowerpointToPdf() {
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
      const lower = file.name.toLowerCase();
      let slides: string[] = [];

      if (lower.endsWith(".pptx")) {
        const zip = await JSZip.loadAsync(await file.arrayBuffer());
        slides = await extractPptxSlides(zip);
      } else if (lower.endsWith(".txt")) {
        slides = [(await file.text()).trim()];
      } else {
        throw new Error("Unsupported file type. Please upload a .pptx or .txt file.");
      }

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pageWidth = 960;
      const pageHeight = 540;
      const margin = 48;
      const maxWidth = pageWidth - margin * 2;

      slides.forEach((slide, index) => {
        let page = pdfDoc.addPage([pageWidth, pageHeight]);
        let y = pageHeight - margin;
        page.drawText(`Slide ${index + 1}`, { x: margin, y, size: 14, font });
        y -= 26;

        if (!slide) {
          page.drawText("(No text on this slide)", { x: margin, y, size: 12, font });
        } else {
          const lines = wrapText(slide, font, 12, maxWidth);
          for (const line of lines) {
            if (y < margin) {
              page = pdfDoc.addPage([pageWidth, pageHeight]);
              y = pageHeight - margin;
            }
            page.drawText(line, { x: margin, y, size: 12, font });
            y -= 16;
          }
        }
      });

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
            Upload Presentation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input type="file" accept=".txt,.pptx" onChange={handleFileChange} className="hidden" id="ppt-pdf-upload" />
            <label htmlFor="ppt-pdf-upload" className="cursor-pointer">
              <Presentation className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload a .pptx file</Text>
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
              Each slide's text is extracted onto one PDF page. Images and layout are not preserved.
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
