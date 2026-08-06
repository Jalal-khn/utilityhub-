"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/components/ui/typography";
import { Copy, Check, Eraser, KeyRound, ShieldAlert } from "lucide-react";

interface DecodedJwt {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  expiresAt?: string;
}

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
  return decodeURIComponent(
    atob(padded)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join("")
  );
}

export default function JwtDecoder() {
  const [input, setInput] = React.useState("");
  const [decoded, setDecoded] = React.useState<DecodedJwt | null>(null);
  const [error, setError] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const handleDecode = () => {
    setError("");
    const token = input.trim();
    if (!token) {
      setError("Please paste a JWT token.");
      setDecoded(null);
      return;
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      setError("Invalid JWT: expected three dot-separated parts (header.payload.signature).");
      setDecoded(null);
      return;
    }

    try {
      const [headerRaw, payloadRaw, signature] = parts;
      const header = JSON.parse(base64UrlDecode(headerRaw)) as Record<string, unknown>;
      const payload = JSON.parse(base64UrlDecode(payloadRaw)) as Record<string, unknown>;

      const exp = payload.exp as number | undefined;
      const expiresAt = exp ? new Date(exp * 1000).toLocaleString() : undefined;

      setDecoded({ header, payload, signature, expiresAt });
    } catch {
      setError("Unable to decode this token. Make sure it is a valid JWT string.");
      setDecoded(null);
    }
  };

  const handleCopy = () => {
    if (!decoded) return;
    navigator.clipboard.writeText(JSON.stringify({ header: decoded.header, payload: decoded.payload }, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput("");
    setDecoded(null);
    setError("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <KeyRound className="h-5 w-5" />
            JWT Decoder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0..."
            className="min-h-[140px] font-mono text-xs resize-y"
          />
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              {error}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleDecode} className="flex-1">
              Decode Token
            </Button>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {decoded && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Header</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">{JSON.stringify(decoded.header, null, 2)}</pre>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Payload</span>
                {decoded.expiresAt && (
                  <span className="text-sm font-normal text-muted-foreground">Expires: {decoded.expiresAt}</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <pre className="overflow-x-auto rounded-lg bg-muted p-4 font-mono text-xs">{JSON.stringify(decoded.payload, null, 2)}</pre>
              <Button onClick={handleCopy} variant="outline" className="w-full">
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Header &amp; Payload
                  </>
                )}
              </Button>
              <div className="rounded-lg bg-muted/60 p-3">
                <Text variant="muted" className="text-xs">
                  Note: This tool decodes the JWT header and payload for inspection only. It does not verify the digital
                  signature, so only trust tokens from a source you already trust.
                </Text>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
