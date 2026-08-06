"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QRCodeSVG } from "qrcode.react";
import { Download, MessageCircle } from "lucide-react";

export default function WhatsappQrGenerator() {
  const [phone, setPhone] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [qrRef, setQrRef] = React.useState<SVGSVGElement | null>(null);

  const buildUrl = () => {
    const safePhone = phone.replace(/[^0-9]/g, "");
    const encodedText = encodeURIComponent(message || "Hello");
    return `https://wa.me/${safePhone}${message ? `?text=${encodedText}` : ""}`;
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
        link.download = "whatsapp-qr.png";
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
            <MessageCircle className="h-5 w-5" />
            WhatsApp QR Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 923001234567" />
          </div>
          <div className="space-y-2">
            <Label>Message (Optional)</Label>
            <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Hello!" />
          </div>

          {phone && (
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-lg border border-border bg-white p-4">
                <QRCodeSVG ref={setQrRef} value={buildUrl()} size={220} level="H" includeMargin />
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
