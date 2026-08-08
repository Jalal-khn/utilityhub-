"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Upload, Download, FileText, Loader2, RotateCw } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";

export default function RotatePdf() {
  const [file, setFile] = React.useState<File | null>(null);
  const [rotatedUrl, setRotatedUrl] = React.useState<string>("");
  const [rotation, setRotation] = React.useState<90 | 180 | 270>(90);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setRotatedUrl("");
    } else if (selectedFile) {
      alert("Please upload a PDF file");
    }
  };

  const rotatePdf = async () => {
    if (!file) return;

    setIsProcessing(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      const pages = pdf.getPages();

      pages.forEach(page => {
        page.setRotation(degrees(rotation));
      });

      const rotatedBytes = await pdf.save();
      const blob = new Blob([rotatedBytes as any], { type: "application/pdf" });
      setRotatedUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert("Error rotating PDF: " + (error as Error).message);
    }

    setIsProcessing(false);
  };

  const downloadRotated = () => {
    if (!rotatedUrl || !file) return;
    const link = document.createElement("a");
    link.href = rotatedUrl;
    link.download = `rotated_${file.name}`;
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
              <CardTitle className="flex items-center gap-2">
                <RotateCw className="h-5 w-5" />
                Rotation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup value={rotation.toString()} onValueChange={(v) => setRotation(parseInt(v) as 90 | 180 | 270)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="90" id="90" />
                  <label htmlFor="90" className="cursor-pointer">90° Clockwise</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="180" id="180" />
                  <label htmlFor="180" className="cursor-pointer">180°</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="270" id="270" />
                  <label htmlFor="270" className="cursor-pointer">270° Clockwise</label>
                </div>
              </RadioGroup>

              <Button onClick={rotatePdf} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Rotating...
                  </>
                ) : (
                  "Rotate PDF"
                )}
              </Button>
            </CardContent>
          </Card>

          {rotatedUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Rotated PDF Ready</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={downloadRotated} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Rotated PDF
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
