"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Contrast } from "lucide-react";

interface RGB {
  r: number;
  g: number;
  b: number;
}

function hexToRgb(hex: string): RGB | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function luminance(c: RGB): number {
  const a = [c.r, c.g, c.b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function contrastRatio(c1: RGB, c2: RGB): number {
  const l1 = luminance(c1);
  const l2 = luminance(c2);
  const [light, dark] = l1 >= l2 ? [l1, l2] : [l2, l1];
  return (light + 0.05) / (dark + 0.05);
}

function rating(ratio: number) {
  if (ratio >= 7) return { label: "AAA (Excellent)", color: "bg-green-500" };
  if (ratio >= 4.5) return { label: "AA (Good)", color: "bg-emerald-400" };
  if (ratio >= 3) return { label: "AA Large Text (Acceptable)", color: "bg-yellow-400" };
  if (ratio >= 1.8) return { label: "Poor", color: "bg-orange-400" };
  return { label: "Very Poor", color: "bg-red-500" };
}

export default function ContrastChecker() {
  const [fg, setFg] = React.useState("#000000");
  const [bg, setBg] = React.useState("#ffffff");

  const fgRgb = hexToRgb(fg);
  const bgRgb = hexToRgb(bg);
  const ratio = fgRgb && bgRgb ? contrastRatio(fgRgb, bgRgb) : null;
  const verdict = ratio ? rating(ratio) : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Contrast className="h-5 w-5" />
            Contrast Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contrast-fg">Text Color</Label>
              <div className="flex items-center gap-2">
                <input
                  id="contrast-fg"
                  type="color"
                  value={fg}
                  onChange={(e) => setFg(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded border border-input"
                />
                <Input value={fg} onChange={(e) => setFg(e.target.value)} placeholder="#000000" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contrast-bg">Background Color</Label>
              <div className="flex items-center gap-2">
                <input
                  id="contrast-bg"
                  type="color"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded border border-input"
                />
                <Input value={bg} onChange={(e) => setBg(e.target.value)} placeholder="#ffffff" />
              </div>
            </div>
          </div>

          <div
            className="rounded-lg border border-border p-6 text-center"
            style={{ backgroundColor: bg, color: fg }}
          >
            <Heading level="h3" className="text-xl font-bold">Aa</Heading>
            <Text className="text-sm">Sample text for contrast preview</Text>
          </div>

          {ratio !== null && verdict && (
            <div className="rounded-lg bg-muted p-4 text-center">
              <Text variant="muted" className="text-sm">Contrast Ratio</Text>
              <Heading className="text-3xl font-bold">{ratio.toFixed(2)}:1</Heading>
              <div className="mt-2 flex justify-center">
                <Badge className={verdict.color}>{verdict.label}</Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
