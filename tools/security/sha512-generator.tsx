"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Lock } from "lucide-react";

export default function Sha512Generator() {
  const [input, setInput] = React.useState("");
  const [hash, setHash] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const generateSHA512 = async () => {
    if (!input) {
      setHash("");
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const hashBuffer = await crypto.subtle.digest("SHA-512", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    setHash(hashHex);
  };

  React.useEffect(() => {
    generateSHA512();
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
            SHA512 Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sha512-input">Input Text</Label>
            <Input
              id="sha512-input"
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
              <div className="rounded-lg bg-muted p-4">
                <Text variant="muted" className="mb-2 text-sm">SHA512 Hash:</Text>
                <Heading className="font-mono text-lg break-all">{hash}</Heading>
              </div>

              <Button onClick={copyToClipboard} variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Hash"}
              </Button>

              <div className="rounded bg-muted p-3">
                <Text variant="muted" className="text-xs">
                  SHA512 produces a 512-bit (64-byte) hash value. It is part of the SHA-2 family and offers strong
                  collision resistance, making it suitable for data integrity and digital signatures.
                </Text>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
