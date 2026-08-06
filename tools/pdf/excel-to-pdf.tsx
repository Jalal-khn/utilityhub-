"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Upload, Download, Table2, Loader2 } from "lucide-react";
import { PDFDocument, StandardFonts } from "pdf-lib";
import * as XLSX from "xlsx";

export default function ExcelToPdf() {
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
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array", cellDates: true });
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      if (!firstSheet) {
        throw new Error("The file contains no sheets.");
      }

      const rows: unknown[][] = XLSX.utils.sheet_to_json(firstSheet, { header: 1, defval: "" });
      if (rows.length === 0) {
        throw new Error("No tabular data found in the file.");
      }

      const pdfDoc = await PDFDocument.create();
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 9;
      const margin = 40;
      const pageWidth = 612;
      const pageHeight = 792;
      const lineHeight = 13;
      const maxChars = Math.floor((pageWidth - margin * 2) / (fontSize * 0.52));

      let page = pdfDoc.addPage([pageWidth, pageHeight]);
      let y = pageHeight - margin;

      for (const row of rows) {
        const line = row
          .map((cell) => {
            if (cell instanceof Date) {
              return cell.toISOString().slice(0, 10);
            }
            return String(cell ?? "");
          })
          .join(" | ");

        const wrapped = line.slice(0, maxChars);

        if (y < margin) {
          page = pdfDoc.addPage([pageWidth, pageHeight]);
          y = pageHeight - margin;
        }
        page.drawText(wrapped, { x: margin, y, size: fontSize, font });
        y -= lineHeight;
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
            Upload Spreadsheet
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input type="file" accept=".csv,.tsv,.txt,.xls,.xlsx" onChange={handleFileChange} className="hidden" id="excel-pdf-upload" />
            <label htmlFor="excel-pdf-upload" className="cursor-pointer">
              <Table2 className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload a spreadsheet or CSV</Text>
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
              The first worksheet is converted. Cell data is rendered as text; formatting is not preserved.
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
