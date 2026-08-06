"use client";

import * as React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Copy, Check, ArrowRightLeft } from "lucide-react";

export default function CaseConverter() {
  const [text, setText] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const toUpperCase = () => setText(text.toUpperCase());
  const toLowerCase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(
      text
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  };
  const toSentenceCase = () => {
    setText(
      text
        .toLowerCase()
        .split(". ")
        .map((sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1))
        .join(". ")
    );
  };
  const toCamelCase = () => {
    setText(
      text
        .toLowerCase()
        .split(/[\s_-]+/)
        .map((word, index) => {
          if (index === 0) return word;
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join("")
    );
  };
  const toSnakeCase = () => {
    setText(
      text
        .toLowerCase()
        .split(/[\s_-]+/)
        .join("_")
    );
  };
  const toKebabCase = () => {
    setText(
      text
        .toLowerCase()
        .split(/[\s_-]+/)
        .join("-")
    );
  };

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
            <ArrowRightLeft className="h-5 w-5" />
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
          <div className="flex gap-2 flex-wrap">
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

      <Card>
        <CardHeader>
          <CardTitle>Convert Case</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Button onClick={toUpperCase} variant="outline" disabled={!text}>
              UPPERCASE
            </Button>
            <Button onClick={toLowerCase} variant="outline" disabled={!text}>
              lowercase
            </Button>
            <Button onClick={toTitleCase} variant="outline" disabled={!text}>
              Title Case
            </Button>
            <Button onClick={toSentenceCase} variant="outline" disabled={!text}>
              Sentence case
            </Button>
            <Button onClick={toCamelCase} variant="outline" disabled={!text}>
              camelCase
            </Button>
            <Button onClick={toSnakeCase} variant="outline" disabled={!text}>
              snake_case
            </Button>
            <Button onClick={toKebabCase} variant="outline" disabled={!text}>
              kebab-case
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
