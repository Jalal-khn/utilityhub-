"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Copy, Check, Eraser, Sparkles } from "lucide-react";

export default function RemoveExtraSpaces() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleClean = () => {
    const cleaned = input
      .replace(/\u00a0/g, " ")
      .replace(/[ \t]+/g, " ")
      .replace(/\s*\n\s*/g, "\n")
      .replace(/[ \t]+\n/g, "\n")
      .trim();
    setOutput(cleaned);
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
            <Eraser className="h-5 w-5" />
            Enter Your Text
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with extra spaces, tabs, or blank lines..."
            className="min-h-[200px] resize-y"
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleClean} className="flex-1">
              <Sparkles className="mr-2 h-4 w-4" />
              Remove Extra Spaces
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
            <CardTitle className="flex items-center justify-between">
              <span>Cleaned Text</span>
              <span className="text-sm font-normal text-muted-foreground">
                {input.length - output.length} characters removed
              </span>
            </CardTitle>
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
