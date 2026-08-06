"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Copy, Check, Share2 } from "lucide-react";

const ogTypes = [
  { value: "website", name: "Website" },
  { value: "article", name: "Article" },
  { value: "product", name: "Product" },
  { value: "profile", name: "Profile" },
  { value: "video.movie", name: "Video" },
  { value: "music.song", name: "Music" },
];

export default function OpenGraphGenerator() {
  const [title, setTitle] = React.useState("");
  const [type, setType] = React.useState("website");
  const [url, setUrl] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [siteName, setSiteName] = React.useState("");
  const [locale, setLocale] = React.useState("en_US");
  const [copied, setCopied] = React.useState(false);

  const escapeAttr = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

  const generateTags = () => {
    const tags: string[] = [
      `<meta property="og:title" content="${escapeAttr(title)}" />`,
      `<meta property="og:type" content="${type}" />`,
    ];
    if (url) tags.push(`<meta property="og:url" content="${escapeAttr(url)}" />`);
    if (description) tags.push(`<meta property="og:description" content="${escapeAttr(description)}" />`);
    if (image) tags.push(`<meta property="og:image" content="${escapeAttr(image)}" />`);
    if (siteName) tags.push(`<meta property="og:site_name" content="${escapeAttr(siteName)}" />`);
    if (locale) tags.push(`<meta property="og:locale" content="${escapeAttr(locale)}" />`);
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
            <Share2 className="h-5 w-5" />
            Open Graph Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="og-title">Page Title</Label>
              <Input id="og-title" placeholder="Your Page Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og-type">Object Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="og-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ogTypes.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="og-url">Canonical URL</Label>
              <Input id="og-url" placeholder="https://example.com/page" value={url} onChange={(e) => setUrl(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og-sitename">Site Name</Label>
              <Input id="og-sitename" placeholder="Example Site" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og-image">Image URL</Label>
              <Input id="og-image" placeholder="https://example.com/image.jpg" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="og-locale">Locale</Label>
              <Input id="og-locale" placeholder="en_US" value={locale} onChange={(e) => setLocale(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="og-description">Description</Label>
            <Textarea id="og-description" placeholder="A brief description of your page" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[100px]" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Open Graph Tags</CardTitle>
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
