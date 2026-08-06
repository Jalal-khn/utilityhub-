"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, Twitter } from "lucide-react";

const cardTypes = [
  { value: "summary_large_image", name: "Summary Large Image" },
  { value: "summary", name: "Summary" },
  { value: "app", name: "App" },
  { value: "player", name: "Player" },
];

export default function TwitterCardGenerator() {
  const [cardType, setCardType] = React.useState("summary_large_image");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [site, setSite] = React.useState("");
  const [creator, setCreator] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const escapeAttr = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  const generateTags = () => {
    const tags: string[] = [`<meta name="twitter:card" content="${cardType}" />`];
    if (title) tags.push(`<meta name="twitter:title" content="${escapeAttr(title)}" />`);
    if (description) tags.push(`<meta name="twitter:description" content="${escapeAttr(description)}" />`);
    if (image) tags.push(`<meta name="twitter:image" content="${escapeAttr(image)}" />`);
    if (site) tags.push(`<meta name="twitter:site" content="${escapeAttr(site)}" />`);
    if (creator) tags.push(`<meta name="twitter:creator" content="${escapeAttr(creator)}" />`);
    if (url) tags.push(`<meta name="twitter:url" content="${escapeAttr(url)}" />`);
    return tags.join("\n");
  };

  const output = generateTags();

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
            <Twitter className="h-5 w-5" />
            Twitter Card Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="tc-card">Card Type</Label>
              <Select value={cardType} onValueChange={setCardType}>
                <SelectTrigger id="tc-card">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {cardTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tc-title">Title</Label>
              <Input id="tc-title" placeholder="Page Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tc-image">Image URL</Label>
              <Input id="tc-image" placeholder="https://example.com/image.jpg" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tc-site">Site Handle</Label>
              <Input id="tc-site" placeholder="@example" value={site} onChange={(e) => setSite(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tc-creator">Creator Handle</Label>
              <Input id="tc-creator" placeholder="@author" value={creator} onChange={(e) => setCreator(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tc-url">Page URL</Label>
              <Input id="tc-url" placeholder="https://example.com/page" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="tc-description">Description</Label>
            <Textarea id="tc-description" placeholder="A brief description of your page" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[100px]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Twitter Card Tags</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea value={output} readOnly className="min-h-[200px] font-mono text-sm" />
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
