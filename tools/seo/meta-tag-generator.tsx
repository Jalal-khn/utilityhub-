"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, Code } from "lucide-react";

export default function MetaTagGenerator() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [keywords, setKeywords] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [ogImage, setOgImage] = React.useState("");
  const [canonical, setCanonical] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const escapeHtml = (value: string) =>
    value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const generateMetaTags = () => {
    const tags: string[] = [];

    if (title) {
      const safe = escapeHtml(title);
      tags.push(`<title>${safe}</title>`);
      tags.push(`<meta name="title" content="${safe}" />`);
      tags.push(`<meta property="og:title" content="${safe}" />`);
      tags.push(`<meta name="twitter:title" content="${safe}" />`);
    }

    if (description) {
      const safe = escapeHtml(description);
      tags.push(`<meta name="description" content="${safe}" />`);
      tags.push(`<meta property="og:description" content="${safe}" />`);
      tags.push(`<meta name="twitter:description" content="${safe}" />`);
    }

    if (keywords) {
      tags.push(`<meta name="keywords" content="${escapeHtml(keywords)}" />`);
    }

    if (author) {
      tags.push(`<meta name="author" content="${escapeHtml(author)}" />`);
    }

    if (ogImage) {
      tags.push(`<meta property="og:image" content="${escapeHtml(ogImage)}" />`);
      tags.push(`<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`);
    }

    if (canonical) {
      tags.push(`<link rel="canonical" href="${escapeHtml(canonical)}" />`);
    }

    tags.push(`<meta property="og:type" content="website" />`);
    tags.push(`<meta name="twitter:card" content="summary_large_image" />`);

    return tags.join("\n");
  };

  const output = generateMetaTags();

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Meta Tag Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              placeholder="Your Page Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Meta Description</Label>
            <Textarea
              id="description"
              placeholder="A brief description of your page"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (comma separated)</Label>
            <Input
              id="keywords"
              placeholder="keyword1, keyword2, keyword3"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              placeholder="Author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ogImage">OG Image URL</Label>
            <Input
              id="ogImage"
              placeholder="https://example.com/og-image.jpg"
              value={ogImage}
              onChange={(e) => setOgImage(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonical">Canonical URL</Label>
            <Input
              id="canonical"
              placeholder="https://example.com/page"
              value={canonical}
              onChange={(e) => setCanonical(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Meta Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={output}
            readOnly
            className="min-h-[200px] font-mono text-sm"
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
    </div>
  );
}
