"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Lock } from "lucide-react";

const K: number[] = [
  0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
  0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
  0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
  0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
  0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
  0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
  0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
  0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
];

const S: number[] = [
  7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
  5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
  4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
  6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];

function md5(input: string): string {
  const bytes = Array.from(new TextEncoder().encode(input));
  const originalBits = bytes.length * 8;
  bytes.push(0x80);
  while (bytes.length % 64 !== 56) bytes.push(0x00);
  const lo = originalBits >>> 0;
  const hi = Math.floor(originalBits / 0x100000000) >>> 0;
  bytes.push(
    lo & 0xff, (lo >>> 8) & 0xff, (lo >>> 16) & 0xff, (lo >>> 24) & 0xff,
    hi & 0xff, (hi >>> 8) & 0xff, (hi >>> 16) & 0xff, (hi >>> 24) & 0xff
  );

  const rotl = (x: number, c: number) => (x << c) | (x >>> (32 - c));
  const add = (x: number, y: number) => (x + y) >>> 0;

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  for (let offset = 0; offset < bytes.length; offset += 64) {
    const M: number[] = [];
    for (let i = 0; i < 16; i++) {
      M.push(
        bytes[offset + i * 4] |
        (bytes[offset + i * 4 + 1] << 8) |
        (bytes[offset + i * 4 + 2] << 16) |
        (bytes[offset + i * 4 + 3] << 24)
      );
    }

    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;

    for (let i = 0; i < 64; i++) {
      let F: number;
      let g: number;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }

      const temp = D;
      D = C;
      C = B;
      B = add(B, rotl(add(add(A, F), add(K[i], M[g])), S[i]));
      A = temp;
    }

    a0 = add(a0, A);
    b0 = add(b0, B);
    c0 = add(c0, C);
    d0 = add(d0, D);
  }

  const toHex = (word: number) =>
    [word & 0xff, (word >>> 8) & 0xff, (word >>> 16) & 0xff, (word >>> 24) & 0xff]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return toHex(a0) + toHex(b0) + toHex(c0) + toHex(d0);
}

export default function Md5Generator() {
  const [input, setInput] = React.useState("");
  const [hash, setHash] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setHash(input ? md5(input) : "");
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
            MD5 Hash Generator
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
                <Text variant="muted" className="text-sm mb-2">MD5 Hash:</Text>
                <Heading className="text-lg font-mono break-all">{hash}</Heading>
              </div>

              <Button onClick={copyToClipboard} variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy Hash"}
              </Button>

              <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded">
                <Text variant="muted" className="text-xs text-yellow-500">
                  ⚠️ MD5 is considered cryptographically broken and should not be used for security purposes. Use SHA-256 instead for secure applications.
                </Text>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
