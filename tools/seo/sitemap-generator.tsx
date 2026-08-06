"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, Globe } from "lucide-react";

interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: string;
  priority?: string;
}

export default function SitemapGenerator() {
  const [entries, setEntries] = React.useState<SitemapEntry[]>([
    { url: "", lastModified: "", changeFrequency: "weekly", priority: "0.8" },
  ]);
  const [copied, setCopied] = React.useState(false);

  const addEntry = () => {
    setEntries([...entries, { url: "", lastModified: "", changeFrequency: "weekly", priority: "0.8" }]);
  };

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, field: keyof SitemapEntry, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setEntries(newEntries);
  };

  const generateSitemap = () => {
    const urlElements = entries
      .filter((entry) => entry.url)
      .map((entry) => {
        let element = `  <url>\n    <loc>${entry.url}</loc>`;
        if (entry.lastModified) {
          element += `\n    <lastmod>${entry.lastModified}</lastmod>`;
        }
        if (entry.changeFrequency) {
          element += `\n    <changefreq>${entry.changeFrequency}</changefreq>`;
        }
        if (entry.priority) {
          element += `\n    <priority>${entry.priority}</priority>`;
        }
        element += "\n  </url>";
        return element;
      })
      .join("\n");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
  };

  const output = generateSitemap();

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
            <Globe className="h-5 w-5" />
            Sitemap Entries
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {entries.map((entry, index) => (
            <Card key={index} className="p-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>URL *</Label>
                  <Input
                    placeholder="https://example.com/page"
                    value={entry.url}
                    onChange={(e) => updateEntry(index, "url", e.target.value)}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label>Last Modified</Label>
                    <Input
                      type="date"
                      value={entry.lastModified}
                      onChange={(e) => updateEntry(index, "lastModified", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Change Frequency</Label>
                    <select
                      value={entry.changeFrequency}
                      onChange={(e) => updateEntry(index, "changeFrequency", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="always">Always</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="never">Never</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <select
                      value={entry.priority}
                      onChange={(e) => updateEntry(index, "priority", e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="1.0">1.0</option>
                      <option value="0.9">0.9</option>
                      <option value="0.8">0.8</option>
                      <option value="0.7">0.7</option>
                      <option value="0.6">0.6</option>
                      <option value="0.5">0.5</option>
                      <option value="0.4">0.4</option>
                      <option value="0.3">0.3</option>
                      <option value="0.2">0.2</option>
                      <option value="0.1">0.1</option>
                      <option value="0.0">0.0</option>
                    </select>
                  </div>
                </div>

                {entries.length > 1 && (
                  <Button onClick={() => removeEntry(index)} variant="outline" size="sm">
                    Remove Entry
                  </Button>
                )}
              </div>
            </Card>
          ))}

          <Button onClick={addEntry} variant="outline" className="w-full">
            Add URL Entry
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated Sitemap XML</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={output}
            readOnly
            className="min-h-[300px] font-mono text-sm"
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
