"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Hash } from "lucide-react";

export default function HexToRgb() {
  const [hex, setHex] = React.useState("");
  const [rgb, setRgb] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const convertHexToRgb = () => {
    const hexValue = hex.trim();
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue);
    
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      const rgbValue = `rgb(${r}, ${g}, ${b})`;
      setRgb(rgbValue);
    } else {
      setRgb("Invalid HEX format. Use #RRGGBB format.");
    }
  };

  const copyToClipboard = () => {
    if (rgb && !rgb.includes("Invalid")) {
      navigator.clipboard.writeText(rgb);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setHex("");
    setRgb("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            HEX to RGB Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>HEX Color</Label>
            <Input
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#3b82f6"
              maxLength={7}
            />
            <Text variant="muted" className="text-xs">
              Enter HEX color code (e.g., #3b82f6 or 3b82f6)
            </Text>
          </div>

          <div className="flex gap-2">
            <Button onClick={convertHexToRgb} className="flex-1">
              Convert
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear
            </Button>
          </div>

          {rgb && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <Text variant="muted" className="text-sm mb-2">RGB Result:</Text>
                <Heading className="text-2xl font-bold">{rgb}</Heading>
              </div>

              {!rgb.includes("Invalid") && (
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-lg border-2 border-border"
                    style={{ backgroundColor: hex.startsWith("#") ? hex : `#${hex}` }}
                  />
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="h-4 w-4 mr-2" />
                    {copied ? "Copied!" : "Copy RGB"}
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
