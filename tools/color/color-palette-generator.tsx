"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Shuffle, SwatchBook } from "lucide-react";

const paletteNames = ["Emerald", "Ocean", "Sunset", "Lavender", "Forest", "Crimson", "Candy", "Desert"];

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(): string[] {
  const hue = Math.floor(Math.random() * 360);
  return [10, 25, 40, 55, 70].map((l) => hslToHex(hue, 65, l));
}

export default function ColorPaletteGenerator() {
  const [palette, setPalette] = React.useState<string[]>(() => generatePalette());
  const [copied, setCopied] = React.useState<string | null>(null);

  const regenerate = () => setPalette(generatePalette());

  const copyColor = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SwatchBook className="h-5 w-5" />
            Color Palette Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={regenerate} className="w-full">
            <Shuffle className="h-4 w-4 mr-2" />
            Generate New Palette
          </Button>

          <div className="grid gap-2 sm:grid-cols-5">
            {palette.map((color, i) => (
              <button
                key={color}
                onClick={() => copyColor(color)}
                className="group rounded-lg border border-border overflow-hidden text-left"
                aria-label={`Copy ${color}`}
              >
                <div className="h-28 w-full" style={{ backgroundColor: color }} />
                <div className="bg-background px-2 py-1.5">
                  <Text className="text-xs font-mono">{color}</Text>
                  <Text variant="muted" className="text-[10px]">
                    {paletteNames[i % paletteNames.length]}
                  </Text>
                </div>
              </button>
            ))}
          </div>

          {copied && (
            <div className="rounded-lg bg-muted p-3 text-center text-sm">
              <Copy className="h-4 w-4 inline mr-2" />
              Copied {copied}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
