"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Copy, Check, Eraser, FlipHorizontal2 } from "lucide-react";

type ReverseMode = "characters" | "words" | "lines";

export default function TextReverser() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [mode, setMode] = React.useState<ReverseMode>("characters");
  const [copied, setCopied] = React.useState(false);

  const handleReverse = () => {
    let result = input;
    if (mode === "characters") {
      result = [...input].reverse().join("");
    } else if (mode === "words") {
      result = input.trim().split(/\s+/).reverse().join(" ");
    } else {
      result = input.split("\n").reverse().join("\n");
    }
    setOutput(result);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlipHorizontal2 className="h-5 w-5" />
            Enter Your Text
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste the text you want to reverse..."
            className="min-h-[200px] resize-y"
          />

          <div className="flex flex-wrap gap-2">
            {(["characters", "words", "lines"] as ReverseMode[]).map((item) => (
              <Button
                key={item}
                type="button"
                size="sm"
                variant={mode === item ? "default" : "outline"}
                onClick={() => setMode(item)}
                aria-pressed={mode === item}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={handleReverse} className="flex-1">
              Reverse Text
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Reversed Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              value={output}
              onFocus={(e) => e.target.select()}
              className="min-h-[160px] resize-y"
            />
            <Button onClick={handleCopy} variant="outline" className="w-full">
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Text
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
