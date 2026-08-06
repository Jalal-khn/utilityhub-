"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Lock } from "lucide-react";

export default function Sha256Generator() {
  const [input, setInput] = React.useState("");
  const [hash, setHash] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const generateSHA256 = async () => {
    if (!input) {
      setHash("");
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
  };

  React.useEffect(() => {
    generateSHA256();
  }, [input]);

  const copyToClipboard = () => {
    if (hash) {
      navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setInput("");
    setHash("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            SHA256 Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Input Text</Label>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text to hash"
            />
          </div>

          <Button onClick={clearAll} variant="outline" className="w-full">
            Clear
          </Button>

          {hash && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <Text variant="muted" className="text-sm mb-2">SHA256 Hash:</Text>
                <Heading className="text-lg font-mono break-all">{hash}</Heading>
              </div>

              <Button onClick={copyToClipboard} variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Hash"}
              </Button>

              <div className="bg-muted p-3 rounded">
                <Text variant="muted" className="text-xs">
                  SHA256 is a cryptographic hash function that produces a 256-bit (32-byte) hash value. It's commonly used for password storage and data integrity verification.
                </Text>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
