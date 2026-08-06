"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeSVG } from "qrcode.react";
import { Download, Link2 } from "lucide-react";

export default function UrlQrGenerator() {
  const [url, setUrl] = React.useState("");
  const [qrRef, setQrRef] = React.useState<SVGSVGElement | null>(null);

  const normalizeUrl = () => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    return `https://${url}`;
  };

  const downloadQRCode = () => {
    if (!qrRef) return;
    const svgData = new XMLSerializer().serializeToString(qrRef);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = 256;
      canvas.height = 256;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const link = document.createElement("a");
        link.download = "url-qr.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Link2 className="h-5 w-5" />
            URL QR Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url-qr-value">Website URL</Label>
            <Input
              id="url-qr-value"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="example.com"
            />
          </div>

          {url && (
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-lg border border-border bg-white p-4">
                <QRCodeSVG ref={setQrRef} value={normalizeUrl()} size={220} level="H" includeMargin />
              </div>
              <Button onClick={downloadQRCode}>
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
