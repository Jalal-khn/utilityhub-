"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Copy, Check, Lock } from "lucide-react";

export default function Base64Encoder() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const encode = () => {
    try {
      const bytes = new TextEncoder().encode(input);
      let binary = "";
      const chunkSize = 0x8000;
      for (let i = 0; i < bytes.length; i += chunkSize) {
        binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
      }
      setOutput(btoa(binary));
    } catch (e) {
      setOutput("Error encoding: " + (e as Error).message);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
  };

  React.useEffect(() => {
    if (input) {
      encode();
    } else {
      setOutput("");
    }
  }, [input]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Input Text
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter text to encode..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[150px]"
          />
          <div className="flex gap-2">
            <Button onClick={handleClear} variant="outline" disabled={!input}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Base64 Encoded</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={output}
              readOnly
              className="min-h-[150px] font-mono text-sm"
            />
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
