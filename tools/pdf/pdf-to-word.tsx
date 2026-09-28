"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Upload, Download, FileText, Loader2 } from "lucide-react";
import JSZip from "jszip";
import { getPdfjs } from "@/lib/pdfjs";

interface TextItem {
  x: number;
  y: number;
  str: string;
}

interface Line {
  y: number;
  text: string;
}

type PdfTextLines = { lines: Line[]; threshold: number };

async function extractPdfLines(file: File): Promise<PdfTextLines[]> {
  const pdfjsLib = await getPdfjs();
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  try {
    const pages: PdfTextLines[] = [];
    const gaps: number[] = [];
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p);
      const content = await page.getTextContent();
      const items: TextItem[] = [];
      for (const item of content.items as unknown[]) {
        const anyItem = item as { str?: string; transform?: number[] };
        if (anyItem.str && anyItem.str.trim() && anyItem.transform) {
          items.push({ x: anyItem.transform[4], y: anyItem.transform[5], str: anyItem.str });
        }
      }

      const sorted = [...items].sort((a, b) => b.y - a.y);
      const lines: Line[] = [];
      for (const item of sorted) {
        const existing = lines[lines.length - 1];
        if (existing && Math.abs(existing.y - item.y) <= 4) {
          // Same visual line: append by x ordering
          let text = existing.text;
          // Insert before trailing words that are further right (rare) — simple append is fine
          text = `${text} ${item.str}`;
          lines[lines.length - 1] = { ...existing, text };
          continue;
        }
        lines.push({ y: item.y, text: item.str });
      }

      for (let i = 1; i < lines.length; i++) {
        gaps.push(lines[i - 1].y - lines[i].y);
      }

      pages.push({ lines, threshold: 0 });
      page.cleanup();
    }

    gaps.sort((a, b) => a - b);
    const medianGap = gaps.length ? gaps[Math.floor(gaps.length / 2)] : 13;
    const threshold = Math.max(medianGap * 1.7, 13);

    for (const page of pages) {
      page.threshold = threshold;
    }
    return pages;
  } finally {
    await pdf.destroy();
  }
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildDocx(paragraphs: string[], pageBreakAfter: Set<number>): Promise<Blob> {
  const paragraphXml = paragraphs
    .map((text, index) => {
      const pageBreak = pageBreakAfter.has(index)
        ? "<w:pPr><w:pageBreakBefore/></w:pPr>"
        : "<w:pPr><w:spacing w:after=\"120\" w:line=\"276\" w:lineRule=\"auto\"/></w:pPr>";
      const runProps = "<w:rPr><w:rFonts w:ascii=\"Calibri\" w:hAnsi=\"Calibri\" w:eastAsia=\"Calibri\"/><w:sz w:val=\"22\"/></w:rPr>";
      return `<w:p>${pageBreak}<w:r>${runProps}<w:t xml:space=\"preserve\">${escapeXml(text)}</w:t></w:r></w:p>`;
    })
    .join("");

  const documentXml =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">' +
    `<w:body>${paragraphXml}</w:body></w:document>`;

  const contentTypes =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">' +
    '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>' +
    '<Default Extension="xml" ContentType="application/xml"/>' +
    '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>' +
    "</Types>";

  const rels =
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">' +
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>' +
    "</Relationships>";

  const zip = new JSZip();
  zip.file("[Content_Types].xml", contentTypes);
  zip.folder("_rels")?.file(".rels", rels);
  zip.folder("word")?.file("document.xml", documentXml);
  return zip.generateAsync({ type: "blob", mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
}

export default function PdfToWord() {
  const [file, setFile] = React.useState<File | null>(null);
  const [outputUrl, setOutputUrl] = React.useState("");
  const [pageCount, setPageCount] = React.useState(0);
  const [charCount, setCharCount] = React.useState(0);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setOutputUrl("");
      setPageCount(0);
      setCharCount(0);
    } else if (selectedFile) {
      alert("Please upload a PDF file");
    }
  };

  const convert = async () => {
    if (!file) return;
    setIsProcessing(true);
    try {
      const pages = await extractPdfLines(file);
      const paragraphs: string[] = [];
      const pageBreakAfter = new Set<number>();

      let totalChars = 0;
      for (let p = 0; p < pages.length; p++) {
        const { lines, threshold } = pages[p];
        for (const line of lines) {
          if (!line.text.trim()) continue;
          paragraphs.push(line.text.trim());
          totalChars += line.text.trim().length;
        }
        if (p < pages.length - 1 && lines.length > 0) {
          pageBreakAfter.add(paragraphs.length - 1);
        }
      }

      if (paragraphs.length === 0) {
        throw new Error(
          "No editable text was found in this PDF. This usually means the PDF is a scan or image-based document. Convert it to text with an OCR tool first, or use PDF to JPG to extract the pages as images."
        );
      }

      const blob = await buildDocx(paragraphs, pageBreakAfter);
      setOutputUrl(URL.createObjectURL(blob));
      setPageCount(pages.length);
      setCharCount(totalChars);
    } catch (error) {
      alert("Error converting PDF to Word: " + (error as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadBase = (file?.name || "document").replace(/\.pdf$/i, "");

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
                "Convert PDF to Word"
              )}
            </Button>
            <Text variant="muted" className="text-xs">
              Text from each page is extracted and rebuilt as an editable .docx in your browser — nothing is uploaded. Layout and images are not preserved; scanned PDFs need OCR first.
            </Text>
          </CardContent>
        </Card>
      )}

      {outputUrl && (
        <Card>
          <CardHeader>
            <CardTitle>Word Document Ready</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Text variant="muted" className="text-sm">
              {pageCount} page{pageCount === 1 ? "" : "s"} converted · {charCount.toLocaleString()} characters extracted. Opens in Microsoft Word, Google Docs and LibreOffice.
            </Text>
            <Button
              onClick={() => {
                const link = document.createElement("a");
                link.href = outputUrl;
                link.download = `${downloadBase}.docx`;
                link.click();
              }}
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Word (.docx)
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}