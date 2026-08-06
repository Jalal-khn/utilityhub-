"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Copy, Check, FileText } from "lucide-react";

export default function WordCounter() {
  const [text, setText] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;
  const charCountNoSpaces = text.replace(/\s/g, "").length;
  const sentenceCount = text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphCount = text.split(/\n\n+/).filter(Boolean).length;
  const readingTime = Math.ceil(wordCount / 200);

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
            <FileText className="h-5 w-5" />
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
              Words
            </Text>
            <Heading level="h3" className="text-3xl font-bold">
              {wordCount.toLocaleString()}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Characters
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
              Sentences
            </Text>
            <Heading level="h3" className="text-3xl font-bold">
              {sentenceCount.toLocaleString()}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Paragraphs
            </Text>
            <Heading level="h3" className="text-3xl font-bold">
              {paragraphCount.toLocaleString()}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Reading Time
            </Text>
            <Heading level="h3" className="text-3xl font-bold">
              {readingTime} min
            </Heading>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
