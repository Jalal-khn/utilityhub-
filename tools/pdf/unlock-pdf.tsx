"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Download, FileText, Loader2, Lock } from "lucide-react";
import { PDFDocument } from "pdf-lib";
import { pdfToBlobs } from "@/lib/pdf-render";

export default function UnlockPdf() {
  const [file, setFile] = React.useState<File | null>(null);
  const [password, setPassword] = React.useState("");
  const [unlockedUrl, setUnlockedUrl] = React.useState<string>("");
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setUnlockedUrl("");
    } else if (selectedFile) {
      alert("Please upload a PDF file");
    }
  };

  const unlockPdf = async () => {
    if (!file) {
      alert("Please upload a PDF file");
      return;
    }

    if (!password) {
      alert("Please enter the password");
      return;
    }

    setIsProcessing(true);

    try {
      const renderedPages = await pdfToBlobs(file, "image/jpeg", 1.5, password);

      const newPdf = await PDFDocument.create();
      for (const blob of renderedPages) {
        const jpgBytes = new Uint8Array(await blob.arrayBuffer());
        const image = await newPdf.embedJpg(jpgBytes);
        const page = newPdf.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }

      const bytes = await newPdf.save();
      const blob = new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
      setUnlockedUrl(URL.createObjectURL(blob));
    } catch (error) {
      const message = (error as Error).message || "";
      if (message.includes("Password") || message.includes("password")) {
        alert("Incorrect password for this PDF.");
      } else {
        alert("Error unlocking PDF: " + message);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadUnlocked = () => {
    if (!unlockedUrl || !file) return;
    const link = document.createElement("a");
    link.href = unlockedUrl;
    link.download = `unlocked_${file.name}`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Protected PDF
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 text-center">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <Text variant="muted">Click to upload password-protected PDF</Text>
            </label>
          </div>
        </CardContent>
      </Card>

      {file && (
        <>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Unlock Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter PDF password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button onClick={unlockPdf} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Unlocking...
                  </>
                ) : (
                  "Unlock PDF"
                )}
              </Button>

              <div className="rounded-lg bg-muted/60 p-3">
                <Text variant="muted" className="text-xs">
                  The PDF is decrypted with your password and re-rendered page-by-page as images into a new,
                  unlocked PDF. Text will no longer be selectable.
                </Text>
              </div>
            </CardContent>
          </Card>

          {unlockedUrl && (
            <Card>
              <CardHeader>
                <CardTitle>PDF Unlocked Successfully</CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={downloadUnlocked} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Unlocked PDF
                </Button>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
