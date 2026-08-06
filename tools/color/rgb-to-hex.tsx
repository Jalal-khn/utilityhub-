"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Hash } from "lucide-react";

export default function RgbToHex() {
  const [red, setRed] = React.useState("");
  const [green, setGreen] = React.useState("");
  const [blue, setBlue] = React.useState("");
  const [hex, setHex] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const convertRgbToHex = () => {
    const r = parseInt(red);
    const g = parseInt(green);
    const b = parseInt(blue);

    if (isNaN(r) || isNaN(g) || isNaN(b) || r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
      setHex("Invalid RGB values. Use 0-255 for each channel.");
      return;
    }

    const toHex = (n: number) => {
      const hex = n.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    const hexValue = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    setHex(hexValue.toUpperCase());
  };

  const copyToClipboard = () => {
    if (hex && !hex.includes("Invalid")) {
      navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setRed("");
    setGreen("");
    setBlue("");
    setHex("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            RGB to HEX Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Red (0-255)</Label>
              <Input
                type="number"
                value={red}
                onChange={(e) => setRed(e.target.value)}
                placeholder="0"
                min={0}
                max={255}
              />
            </div>

            <div className="space-y-2">
              <Label>Green (0-255)</Label>
              <Input
                type="number"
                value={green}
                onChange={(e) => setGreen(e.target.value)}
                placeholder="0"
                min={0}
                max={255}
              />
            </div>

            <div className="space-y-2">
              <Label>Blue (0-255)</Label>
              <Input
                type="number"
                value={blue}
                onChange={(e) => setBlue(e.target.value)}
                placeholder="0"
                min={0}
                max={255}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={convertRgbToHex} className="flex-1">
              Convert
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear
            </Button>
          </div>

          {hex && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <Text variant="muted" className="text-sm mb-2">HEX Result:</Text>
                <Heading className="text-2xl font-bold">{hex}</Heading>
              </div>

              {!hex.includes("Invalid") && (
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-lg border-2 border-border"
                    style={{ backgroundColor: hex }}
                  />
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? "Copied!" : "Copy HEX"}
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
