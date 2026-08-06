"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, FileText } from "lucide-react";

const LOREM_WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "dolore", "eu", "fugiat", "nulla", "pariatur",
  "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa",
  "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum",
];

export default function LoremIpsumGenerator() {
  const [paragraphs, setParagraphs] = React.useState(3);
  const [sentences, setSentences] = React.useState(5);
  const [generated, setGenerated] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const generateLorem = () => {
    const result = [];
    for (let p = 0; p < paragraphs; p++) {
      const paragraph = [];
      for (let s = 0; s < sentences; s++) {
        const sentenceLength = Math.floor(Math.random() * 8) + 8;
        const sentence = [];
        for (let w = 0; w < sentenceLength; w++) {
          const word = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
          sentence.push(w === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word);
        }
        paragraph.push(sentence.join(" ") + ".");
      }
      result.push(paragraph.join(" "));
    }
    setGenerated(result.join("\n\n"));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generator Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="paragraphs">Paragraphs</Label>
              <Input
                id="paragraphs"
                type="number"
                min="1"
                max="20"
                value={paragraphs}
                onChange={(e) => setParagraphs(parseInt(e.target.value) || 1)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sentences">Sentences per Paragraph</Label>
              <Input
                id="sentences"
                type="number"
                min="1"
                max="20"
                value={sentences}
                onChange={(e) => setSentences(parseInt(e.target.value) || 1)}
              />
            </div>
          </div>
          <Button onClick={generateLorem} className="w-full">
            Generate Lorem Ipsum
          </Button>
        </CardContent>
      </Card>

      {generated && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Text</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="whitespace-pre-wrap text-sm">{generated}</div>
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
