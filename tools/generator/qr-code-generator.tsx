"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { QRCodeSVG } from "qrcode.react";
import { Download, QrCode } from "lucide-react";

export default function QrCodeGenerator() {
  const [text, setText] = React.useState("");
  const [size, setSize] = React.useState([256]);
  const [qrRef, setQrRef] = React.useState<SVGSVGElement | null>(null);

  const downloadQRCode = () => {
    if (!qrRef) return;
    
    const svgData = new XMLSerializer().serializeToString(qrRef);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size[0];
      canvas.height = size[0];
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "qrcode.png";
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };
    
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            QR Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Text or URL</Label>
            <Input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text or URL"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>QR Code Size</Label>
                <Text variant="muted">{size[0]}px</Text>
              </div>
              <Slider
                value={size}
                onValueChange={setSize}
                min={128}
                max={512}
                step={32}
              />
            </div>
          </div>

          {text && (
            <div className="flex flex-col items-center space-y-4">
              <div className="bg-white p-4 rounded-lg border-2 border-border">
                <QRCodeSVG
                  ref={setQrRef}
                  value={text}
                  size={size[0]}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <Button onClick={downloadQRCode}>
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
