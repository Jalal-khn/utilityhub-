"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { Copy, Check, Eraser, Link2 } from "lucide-react";

export default function UrlEncoder() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleEncode = () => {
    setOutput(encodeURIComponent(input));
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
            <Link2 className="h-5 w-5" />
            URL Encoder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste text or a URL to encode (e.g. https://example.com/?q=hello world)"
            className="min-h-[160px] resize-y"
          />
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleEncode} className="flex-1">
              Encode URL
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
            <CardTitle>Encoded Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              readOnly
              value={output}
              onFocus={(e) => e.target.select()}
              className="min-h-[120px] font-mono text-sm resize-y"
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
                  Copy Result
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
