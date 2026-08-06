"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Check, FileText } from "lucide-react";

export default function RobotsTxtGenerator() {
  const [userAgent, setUserAgent] = React.useState("*");
  const [allowPaths, setAllowPaths] = React.useState(["/"]);
  const [disallowPaths, setDisallowPaths] = React.useState([""]);
  const [crawlDelay, setCrawlDelay] = React.useState("");
  const [sitemap, setSitemap] = React.useState("");
  const [copied, setCopied] = React.useState(false);

  const addAllowPath = () => {
    setAllowPaths([...allowPaths, ""]);
  };

  const removeAllowPath = (index: number) => {
    setAllowPaths(allowPaths.filter((_, i) => i !== index));
  };

  const updateAllowPath = (index: number, value: string) => {
    const newPaths = [...allowPaths];
    newPaths[index] = value;
    setAllowPaths(newPaths);
  };

  const addDisallowPath = () => {
    setDisallowPaths([...disallowPaths, ""]);
  };

  const removeDisallowPath = (index: number) => {
    setDisallowPaths(disallowPaths.filter((_, i) => i !== index));
  };

  const updateDisallowPath = (index: number, value: string) => {
    const newPaths = [...disallowPaths];
    newPaths[index] = value;
    setDisallowPaths(newPaths);
  };

  const generateRobotsTxt = () => {
    let output = `User-agent: ${userAgent}\n`;

    allowPaths.filter(Boolean).forEach((path) => {
      output += `Allow: ${path}\n`;
    });

    disallowPaths.filter(Boolean).forEach((path) => {
      output += `Disallow: ${path}\n`;
    });

    if (crawlDelay) {
      output += `Crawl-delay: ${crawlDelay}\n`;
    }

    if (sitemap) {
      output += `Sitemap: ${sitemap}\n`;
    }

    return output;
  };

  const output = generateRobotsTxt();

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
            <FileText className="h-5 w-5" />
            Robots.txt Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">User Agent</label>
            <input
              type="text"
              placeholder="*"
              value={userAgent}
              onChange={(e) => setUserAgent(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Allow Paths</label>
            {allowPaths.map((path, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="/"
                  value={path}
                  onChange={(e) => updateAllowPath(index, e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                {allowPaths.length > 1 && (
                  <Button
                    onClick={() => removeAllowPath(index)}
                    variant="outline"
                    size="sm"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={addAllowPath} variant="outline" size="sm">
              Add Allow Path
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Disallow Paths</label>
            {disallowPaths.map((path, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  placeholder="/admin"
                  value={path}
                  onChange={(e) => updateDisallowPath(index, e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                {disallowPaths.length > 1 && (
                  <Button
                    onClick={() => removeDisallowPath(index)}
                    variant="outline"
                    size="sm"
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <Button onClick={addDisallowPath} variant="outline" size="sm">
              Add Disallow Path
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Crawl Delay (seconds)</label>
            <input
              type="text"
              placeholder="10"
              value={crawlDelay}
              onChange={(e) => setCrawlDelay(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Sitemap URL</label>
            <input
              type="text"
              placeholder="https://example.com/sitemap.xml"
              value={sitemap}
              onChange={(e) => setSitemap(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated robots.txt</CardTitle>
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
