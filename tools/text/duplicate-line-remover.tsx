"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Copy, Check, Eraser, ListFilter, ToggleLeft, ToggleRight } from "lucide-react";

export default function DuplicateLineRemover() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [preserveOrder, setPreserveOrder] = React.useState(true);
  const [caseInsensitive, setCaseInsensitive] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleRemove = () => {
    const lines = input.split(/\r?\n/);
    const seen = new Set<string>();
    const result: string[] = [];

    for (const line of lines) {
      const key = caseInsensitive ? line.trim().toLowerCase() : line;
      if (!seen.has(key)) {
        seen.add(key);
        result.push(line);
      }
    }

    if (preserveOrder) {
      setOutput(result.join("\n"));
    } else {
      setOutput(
        [...result]
          .sort((a, b) => {
            const ka = caseInsensitive ? a.trim().toLowerCase() : a;
            const kb = caseInsensitive ? b.trim().toLowerCase() : b;
            return ka < kb ? -1 : ka > kb ? 1 : 0;
          })
          .join("\n")
      );
    }
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
            <ListFilter className="h-5 w-5" />
            Enter Your Text
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text with duplicate lines..."
            className="min-h-[200px] resize-y"
          />
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPreserveOrder((prev) => !prev)}
              aria-pressed={preserveOrder}
            >
              {preserveOrder ? <ToggleRight className="mr-2 h-4 w-4" /> : <ToggleLeft className="mr-2 h-4 w-4" />}
              {preserveOrder ? "Preserve order" : "Sorted output"}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setCaseInsensitive((prev) => !prev)}
              aria-pressed={caseInsensitive}
            >
              {caseInsensitive ? <ToggleRight className="mr-2 h-4 w-4" /> : <ToggleLeft className="mr-2 h-4 w-4" />}
              {caseInsensitive ? "Case-insensitive" : "Case-sensitive"}
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleRemove} className="flex-1">
              Remove Duplicate Lines
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
              <span>Result</span>
              <span className="text-sm font-normal text-muted-foreground">
                {input.split(/\r?\n/).length - output.split(/\r?\n/).length} duplicates removed
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
