"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { QRCodeSVG } from "qrcode.react";
import { Download, Contact } from "lucide-react";

export default function VcardQrGenerator() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [organization, setOrganization] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [qrRef, setQrRef] = React.useState<SVGSVGElement | null>(null);

  const escapeVcard = (value: string) => value.replace(/([\\;,])/g, "\\$1").replace(/\n/g, "\\n");

  const buildVcard = () => {
    const lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${escapeVcard(lastName)};${escapeVcard(firstName)};;;`,
      `FN:${escapeVcard(`${firstName} ${lastName}`.trim())}`,
      phone ? `TEL:${escapeVcard(phone)}` : null,
      email ? `EMAIL:${escapeVcard(email)}` : null,
      organization ? `ORG:${escapeVcard(organization)}` : null,
      title ? `TITLE:${escapeVcard(title)}` : null,
      website ? `URL:${escapeVcard(website)}` : null,
      "END:VCARD",
    ];
    return lines.filter(Boolean).join("\n");
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
        link.download = "vcard-qr.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const hasContent = firstName || lastName || phone || email || organization || title || website;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Contact className="h-5 w-5" />
            vCard QR Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vcard-first">First Name</Label>
              <Input id="vcard-first" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-last">Last Name</Label>
              <Input id="vcard-last" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-phone">Phone</Label>
              <Input id="vcard-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+92 300 1234567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-email">Email</Label>
              <Input id="vcard-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-org">Company</Label>
              <Input id="vcard-org" value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Acme Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vcard-title">Job Title</Label>
              <Input id="vcard-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Developer" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="vcard-website">Website</Label>
            <Input id="vcard-website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" />
          </div>

          {hasContent && (
            <div className="flex flex-col items-center space-y-4">
              <div className="rounded-lg border border-border bg-white p-4">
                <QRCodeSVG ref={setQrRef} value={buildVcard()} size={220} level="H" includeMargin />
              </div>
              <Button onClick={downloadQRCode}>
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </Button>
              <Textarea readOnly value={buildVcard()} rows={5} className="font-mono text-xs" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
