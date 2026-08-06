"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Weight, ArrowRightLeft } from "lucide-react";

const weightUnits = {
  milligrams: { name: "Milligrams", factor: 0.000001 },
  grams: { name: "Grams", factor: 0.001 },
  kilograms: { name: "Kilograms", factor: 1 },
  tonnes: { name: "Tonnes", factor: 1000 },
  ounces: { name: "Ounces", factor: 0.028349523125 },
  pounds: { name: "Pounds", factor: 0.45359237 },
  stones: { name: "Stones", factor: 6.35029318 },
};

export default function WeightConverter() {
  const [value, setValue] = React.useState("");
  const [fromUnit, setFromUnit] = React.useState("kilograms");
  const [toUnit, setToUnit] = React.useState("pounds");
  const [result, setResult] = React.useState("");

  const convertWeight = () => {
    const num = parseFloat(value);
    if (Number.isNaN(num)) {
      setResult("Invalid input");
      return;
    }

    const fromFactor = weightUnits[fromUnit as keyof typeof weightUnits].factor;
    const toFactor = weightUnits[toUnit as keyof typeof weightUnits].factor;
    const converted = (num * fromFactor) / toFactor;

    setResult(converted.toFixed(4));
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    if (result) {
      setValue(result);
      setResult("");
    }
  };

  const clearAll = () => {
    setValue("");
    setResult("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Weight className="h-5 w-5" />
            Weight Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="weight-value">Value</Label>
              <Input
                id="weight-value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter weight"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight-from">From Unit</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger id="weight-from">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(weightUnits).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center md:col-span-2">
              <Button onClick={swapUnits} variant="outline" size="icon" aria-label="Swap units">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight-to">To Unit</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger id="weight-to">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(weightUnits).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={convertWeight} className="flex-1">
              Convert
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear
            </Button>
          </div>

          {result && (
            <div className="rounded-lg bg-muted p-4">
              <Text variant="muted" className="mb-2 text-sm">
                Result:
              </Text>
              <Heading className="text-2xl font-bold">
                {result} {weightUnits[toUnit as keyof typeof weightUnits].name}
              </Heading>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
