"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Shuffle, Droplets } from "lucide-react";

const gradientTypes = [
  { value: "linear", name: "Linear" },
  { value: "radial", name: "Radial" },
];

const gradientDirections = [
  { value: "to bottom", name: "To Bottom" },
  { value: "to right", name: "To Right" },
  { value: "to bottom right", name: "To Bottom Right" },
  { value: "to top", name: "To Top" },
  { value: "to left", name: "To Left" },
];

function randomColor(): string {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export default function GradientGenerator() {
  const [type, setType] = React.useState("linear");
  const [direction, setDirection] = React.useState("to bottom");
  const [color1, setColor1] = React.useState("#6366f1");
  const [color2, setColor2] = React.useState("#ec4899");
  const [copied, setCopied] = React.useState(false);

  const css =
    type === "linear"
      ? `linear-gradient(${direction}, ${color1}, ${color2})`
      : `radial-gradient(circle, ${color1}, ${color2})`;

  const randomize = () => {
    setColor1(randomColor());
    setColor2(randomColor());
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Gradient Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className="h-40 rounded-lg border-4 border-border"
            style={{ background: css }}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="gradient-type">Gradient Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="gradient-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradientTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {type === "linear" && (
              <div className="space-y-2">
                <Label htmlFor="gradient-direction">Direction</Label>
                <Select value={direction} onValueChange={setDirection}>
                  <SelectTrigger id="gradient-direction">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {gradientDirections.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="gradient-color1">Color 1</Label>
              <div className="flex items-center gap-2">
                <input
                  id="gradient-color1"
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded border border-input"
                />
                <Input value={color1} onChange={(e) => setColor1(e.target.value)} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="gradient-color2">Color 2</Label>
              <div className="flex items-center gap-2">
                <input
                  id="gradient-color2"
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                  className="h-10 w-12 cursor-pointer rounded border border-input"
                />
                <Input value={color2} onChange={(e) => setColor2(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={randomize} variant="outline" className="flex-1">
              <Shuffle className="h-4 w-4 mr-2" />
              Randomize
            </Button>
            <Button onClick={copyToClipboard} className="flex-1">
              <Copy className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy CSS"}
            </Button>
          </div>

          <div className="rounded-lg bg-muted p-3">
            <Text variant="muted" className="text-xs font-mono break-all">
              {css}
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
