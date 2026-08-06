"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Percent } from "lucide-react";

export default function PercentageCalculator() {
  const [activeTab, setActiveTab] = React.useState("what-is");

  // Tab 1: What is X% of Y?
  const [percent1, setPercent1] = React.useState("");
  const [value1, setValue1] = React.useState("");
  const [result1, setResult1] = React.useState<number | null>(null);

  // Tab 2: X is what % of Y?
  const [part2, setPart2] = React.useState("");
  const [whole2, setWhole2] = React.useState("");
  const [result2, setResult2] = React.useState<number | null>(null);

  // Tab 3: X is Y% of what?
  const [result3, setResult3] = React.useState("");
  const [percent3, setPercent3] = React.useState("");
  const [value3, setValue3] = React.useState<number | null>(null);

  // Tab 4: Percentage change
  const [oldValue, setOldValue] = React.useState("");
  const [newValue, setNewValue] = React.useState("");
  const [percentChange, setPercentChange] = React.useState<number | null>(null);

  const calculate1 = () => {
    const p = parseFloat(percent1);
    const v = parseFloat(value1);
    if (!isNaN(p) && !isNaN(v)) {
      setResult1((p / 100) * v);
    }
  };

  const calculate2 = () => {
    const p = parseFloat(part2);
    const w = parseFloat(whole2);
    if (!isNaN(p) && !isNaN(w) && w !== 0) {
      setResult2((p / w) * 100);
    }
  };

  const calculate3 = () => {
    const r = parseFloat(result3);
    const p = parseFloat(percent3);
    if (!isNaN(r) && !isNaN(p) && p !== 0) {
      setValue3((r / p) * 100);
    }
  };

  const calculate4 = () => {
    const old = parseFloat(oldValue);
    const newV = parseFloat(newValue);
    if (!isNaN(old) && !isNaN(newV) && old !== 0) {
      setPercentChange(((newV - old) / old) * 100);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Percentage Calculator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="what-is">What is %</TabsTrigger>
              <TabsTrigger value="is-what">is what %</TabsTrigger>
              <TabsTrigger value="is-of">is % of</TabsTrigger>
              <TabsTrigger value="change">% Change</TabsTrigger>
            </TabsList>

            <TabsContent value="what-is" className="space-y-4">
              <div className="space-y-2">
                <Label>What is</Label>
                <Input
                  type="number"
                  placeholder="25"
                  value={percent1}
                  onChange={(e) => setPercent1(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>% of</Label>
                <Input
                  type="number"
                  placeholder="200"
                  value={value1}
                  onChange={(e) => setValue1(e.target.value)}
                />
              </div>
              <Button onClick={calculate1} className="w-full">
                Calculate
              </Button>
              {result1 !== null && (
                <div className="text-center">
                  <Heading level="h3" className="text-3xl font-bold">
                    {result1.toFixed(2)}
                  </Heading>
                </div>
              )}
            </TabsContent>

            <TabsContent value="is-what" className="space-y-4">
              <div className="space-y-2">
                <Label>What is</Label>
                <Input
                  type="number"
                  placeholder="50"
                  value={part2}
                  onChange={(e) => setPart2(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>% of</Label>
                <Input
                  type="number"
                  placeholder="200"
                  value={whole2}
                  onChange={(e) => setWhole2(e.target.value)}
                />
              </div>
              <Button onClick={calculate2} className="w-full">
                Calculate
              </Button>
              {result2 !== null && (
                <div className="text-center">
                  <Heading level="h3" className="text-3xl font-bold">
                    {result2.toFixed(2)}%
                  </Heading>
                </div>
              )}
            </TabsContent>

            <TabsContent value="is-of" className="space-y-4">
              <div className="space-y-2">
                <Label>What is</Label>
                <Input
                  type="number"
                  placeholder="50"
                  value={result3}
                  onChange={(e) => setResult3(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>% of</Label>
                <Input
                  type="number"
                  placeholder="25"
                  value={percent3}
                  onChange={(e) => setPercent3(e.target.value)}
                />
              </div>
              <Button onClick={calculate3} className="w-full">
                Calculate
              </Button>
              {value3 !== null && (
                <div className="text-center">
                  <Heading level="h3" className="text-3xl font-bold">
                    {value3.toFixed(2)}
                  </Heading>
                </div>
              )}
            </TabsContent>

            <TabsContent value="change" className="space-y-4">
              <div className="space-y-2">
                <Label>From</Label>
                <Input
                  type="number"
                  placeholder="100"
                  value={oldValue}
                  onChange={(e) => setOldValue(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>To</Label>
                <Input
                  type="number"
                  placeholder="150"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>
              <Button onClick={calculate4} className="w-full">
                Calculate
              </Button>
              {percentChange !== null && (
                <div className="text-center">
                  <Heading level="h3" className={`text-3xl font-bold ${percentChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                    {percentChange >= 0 ? "+" : ""}{percentChange.toFixed(2)}%
                  </Heading>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
