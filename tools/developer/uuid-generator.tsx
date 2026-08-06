"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Copy, Check, RefreshCw, Hash } from "lucide-react";

export default function UUIDGenerator() {
  const [uuids, setUuids] = React.useState<string[]>([]);
  const [count, setCount] = React.useState(5);
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  const generateUUID = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const generateUUIDs = () => {
    const newUuids = Array.from({ length: count }, () => generateUUID());
    setUuids(newUuids);
  };

  const copyUUID = (uuid: string, index: number) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join("\n"));
  };

  React.useEffect(() => {
    generateUUIDs();
  }, [count]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Generator Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button onClick={generateUUIDs} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Regenerate
            </Button>
            <Text variant="muted">
              {count} UUID{count !== 1 ? "s" : ""}
            </Text>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setCount(Math.max(1, count - 1))}
              variant="outline"
              size="sm"
            >
              -
            </Button>
            <Text variant="muted">{count}</Text>
            <Button
              onClick={() => setCount(Math.min(50, count + 1))}
              variant="outline"
              size="sm"
            >
              +
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Generated UUIDs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {uuids.map((uuid, index) => (
            <div key={index} className="flex items-center gap-2">
              <code className="flex-1 bg-muted px-3 py-2 rounded text-sm font-mono">
                {uuid}
              </code>
              <Button
                onClick={() => copyUUID(uuid, index)}
                variant="outline"
                size="sm"
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          ))}
          <Button onClick={copyAll} variant="outline" className="w-full">
            <Copy className="h-4 w-4 mr-2" />
            Copy All
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
