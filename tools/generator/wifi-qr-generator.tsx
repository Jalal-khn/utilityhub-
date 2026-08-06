"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QRCodeSVG } from "qrcode.react";
import { Download, Wifi } from "lucide-react";

export default function WifiQrGenerator() {
  const [ssid, setSsid] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [security, setSecurity] = React.useState("WPA");
  const [hidden, setHidden] = React.useState(false);
  const [qrRef, setQrRef] = React.useState<SVGSVGElement | null>(null);

  const buildWifiString = () => {
    const parts = [
      "WIFI",
      `T:${security}`,
      `S:${escapeSpecial(ssid)}`,
      password && security !== "nopass" ? `P:${escapeSpecial(password)}` : null,
      `H:${hidden}`,
    ];
    return parts.filter(Boolean).join(";") + ";;";
  };

  const escapeSpecial = (value: string) => value.replace(/([\\;,:"])/g, "\\$1");

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
        link.download = "wifi-qr.png";
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
            <Wifi className="h-5 w-5" />
            WiFi QR Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="wifi-ssid">Network Name (SSID)</Label>
            <Input id="wifi-ssid" value={ssid} onChange={(e) => setSsid(e.target.value)} placeholder="My WiFi" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="wifi-security">Security</Label>
              <Select value={security} onValueChange={setSecurity}>
                <SelectTrigger id="wifi-security">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WPA">WPA / WPA2</SelectItem>
                  <SelectItem value="WEP">WEP</SelectItem>
                  <SelectItem value="nopass">No Password</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {security !== "nopass" && (
              <div className="space-y-2">
                <Label htmlFor="wifi-password">Password</Label>
                <Input
                  id="wifi-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Network password"
                  type="password"
                />
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
              className="h-4 w-4 rounded border-input"
            />
            Hidden network
          </label>

          {ssid && (
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-lg border border-border bg-white p-4">
                <QRCodeSVG ref={setQrRef} value={buildWifiString()} size={220} level="H" includeMargin />
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
