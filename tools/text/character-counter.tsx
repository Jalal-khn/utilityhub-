"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Copy, Check, Type } from "lucide-react";

export default function CharacterCounter() {
  const [text, setText] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;
  const letterCount = text.replace(/[^a-zA-Z]/g, "").length;
  const numberCount = text.replace(/[^0-9]/g, "").length;
  const spaceCount = text.split(" ").length - 1;
  const lineCount = text.split("\n").length;

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Type className="h-5 w-5" />
            Enter Your Text
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] resize-y"
          />
          <div className="flex gap-2">
            <Button onClick={handleClear} variant="outline" size="sm">
              Clear
            </Button>
            <Button onClick={handleCopy} variant="outline" size="sm" disabled={!text}>
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
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Total Characters
            </Text>
            <Heading level="h3" className="text-3xl font-bold">
              {charCount.toLocaleString()}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Characters (no spaces)
            </Text>
            <Heading level="h3" className="text-3xl font-bold">
              {charCountNoSpaces.toLocaleString()}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Letters
            </Text>
            <Heading level="h3" className="text-3xl font-bold">
              {letterCount.toLocaleString()}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Numbers
            </Text>
            <Heading level="h3" className="text-3xl font-bold">
              {numberCount.toLocaleString()}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Spaces
            </Text>
            <Heading level="h3" className="text-3xl font-bold">
              {Math.max(0, spaceCount).toLocaleString()}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Lines
            </Text>
            <Heading level="h3" className="text-3xl font-bold">
              {lineCount.toLocaleString()}
            </Heading>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
