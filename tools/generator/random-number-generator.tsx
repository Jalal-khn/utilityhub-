"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Dice1 } from "lucide-react";

export default function RandomNumberGenerator() {
  const [min, setMin] = React.useState("1");
  const [max, setMax] = React.useState("100");
  const [count, setCount] = React.useState("1");
  const [results, setResults] = React.useState<number[]>([]);
  const [copied, setCopied] = React.useState(false);

  const generateRandomNumbers = () => {
    const minNum = parseInt(min);
    const maxNum = parseInt(max);
    const countNum = parseInt(count);

    if (isNaN(minNum) || isNaN(maxNum) || isNaN(countNum)) {
      setResults([]);
      return;
    }

    if (minNum >= maxNum) {
      setResults([]);
      return;
    }

    if (countNum < 1 || countNum > 1000) {
      setResults([]);
      return;
    }

    const numbers: number[] = [];
    for (let i = 0; i < countNum; i++) {
      const randomNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
      numbers.push(randomNum);
    }

    setResults(numbers);
  };

  const copyToClipboard = () => {
    if (results.length > 0) {
      navigator.clipboard.writeText(results.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setMin("1");
    setMax("100");
    setCount("1");
    setResults([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Dice1 className="h-5 w-5" />
            Random Number Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Minimum</Label>
              <Input
                type="number"
                value={min}
                onChange={(e) => setMin(e.target.value)}
                placeholder="1"
              />
            </div>

            <div className="space-y-2">
              <Label>Maximum</Label>
              <Input
                type="number"
                value={max}
                onChange={(e) => setMax(e.target.value)}
                placeholder="100"
              />
            </div>

            <div className="space-y-2">
              <Label>Count (1-1000)</Label>
              <Input
                type="number"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="1"
                min={1}
                max={1000}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={generateRandomNumbers} className="flex-1">
              <RefreshCw className="h-4 w-4 mr-2" />
              Generate
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear
            </Button>
          </div>

          {results.length > 0 && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <Text variant="muted" className="text-sm mb-2">
                  Generated Numbers ({results.length}):
                </Text>
                <Heading className="text-xl font-mono break-all">
                  {results.join(", ")}
                </Heading>
              </div>

              <Button onClick={copyToClipboard} variant="outline" className="w-full">
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy All Numbers"}
              </Button>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-muted p-3 rounded">
                  <Text variant="muted" className="text-xs">Min</Text>
                  <Heading className="text-lg">{Math.min(...results)}</Heading>
                </div>
                <div className="bg-muted p-3 rounded">
                  <Text variant="muted" className="text-xs">Max</Text>
                  <Heading className="text-lg">{Math.max(...results)}</Heading>
                </div>
                <div className="bg-muted p-3 rounded">
                  <Text variant="muted" className="text-xs">Average</Text>
                  <Heading className="text-lg">
                    {(results.reduce((a, b) => a + b, 0) / results.length).toFixed(2)}
                  </Heading>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
