"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Palette } from "lucide-react";

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = React.useState("#3b82f6");
  const [hex, setHex] = React.useState("#3b82f6");
  const [rgb, setRgb] = React.useState("rgb(59, 130, 246)");
  const [copied, setCopied] = React.useState<"hex" | "rgb" | null>(null);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setSelectedColor(color);
    setHex(color);
    setRgb(hexToRgb(color));
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setSelectedColor(value);
      setHex(value);
      setRgb(hexToRgb(value));
    }
    setHex(value);
  };

  const hexToRgb = (hex: string): string => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgb(${r}, ${g}, ${b})`;
    }
    return "rgb(0, 0, 0)";
  };

  const copyToClipboard = (value: string, type: "hex" | "rgb") => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const presetColors = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16",
    "#22c55e", "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9",
    "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef",
    "#ec4899", "#f43f5e", "#000000", "#6b7280", "#ffffff",
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Picker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <div
              className="w-48 h-48 rounded-lg shadow-lg border-4 border-border"
              style={{ backgroundColor: selectedColor }}
            />
            
            <input
              type="color"
              value={selectedColor}
              onChange={handleColorChange}
              className="w-20 h-12 cursor-pointer rounded"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>HEX</Label>
              <div className="flex gap-2">
                <Input value={hex} onChange={handleHexChange} placeholder="#000000" />
                <Button
                  onClick={() => copyToClipboard(hex, "hex")}
                  variant="outline"
                  size="icon"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copied === "hex" && (
                <Text className="text-xs text-green-500">Copied!</Text>
              )}
            </div>

            <div className="space-y-2">
              <Label>RGB</Label>
              <div className="flex gap-2">
                <Input value={rgb} readOnly placeholder="rgb(0, 0, 0)" />
                <Button
                  onClick={() => copyToClipboard(rgb, "rgb")}
                  variant="outline"
                  size="icon"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {copied === "rgb" && (
                <Text className="text-xs text-green-500">Copied!</Text>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Preset Colors</Label>
            <div className="grid grid-cols-10 gap-2">
              {presetColors.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color);
                    setHex(color);
                    setRgb(hexToRgb(color));
                  }}
                  className="w-8 h-8 rounded border-2 border-border hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
