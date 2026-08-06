"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Copy, Check, Unlock } from "lucide-react";

export default function Base64Decoder() {
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [error, setError] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const decode = () => {
    const cleaned = input.replace(/\s+/g, "");
    if (!cleaned) {
      setOutput("");
      setError("");
      return;
    }
    try {
      const binary = atob(cleaned);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      setOutput(new TextDecoder("utf-8").decode(bytes));
      setError("");
    } catch (e) {
      setError("Invalid Base64 string");
      setOutput("");
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
    setError("");
  };

  React.useEffect(() => {
    if (input) {
      decode();
    } else {
      setOutput("");
      setError("");
    }
  }, [input]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Unlock className="h-5 w-5" />
            Base64 String
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Enter Base64 string to decode..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[150px] font-mono text-sm"
          />
          <div className="flex gap-2">
            <Button onClick={handleClear} variant="outline" disabled={!input}>
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <Text className="text-destructive">{error}</Text>
          </CardContent>
        </Card>
      )}

      {output && (
        <Card>
          <CardHeader>
            <CardTitle>Decoded Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={output}
              readOnly
              className="min-h-[150px]"
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
