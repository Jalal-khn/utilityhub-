"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Square, ArrowRightLeft } from "lucide-react";

const areaUnits = {
  "square-meters": { name: "Square Meters", factor: 1 },
  "square-kilometers": { name: "Square Kilometers", factor: 1000000 },
  "square-centimeters": { name: "Square Centimeters", factor: 0.0001 },
  "square-millimeters": { name: "Square Millimeters", factor: 0.000001 },
  "square-miles": { name: "Square Miles", factor: 2589988.11 },
  "square-yards": { name: "Square Yards", factor: 0.83612736 },
  "square-feet": { name: "Square Feet", factor: 0.09290304 },
  "square-inches": { name: "Square Inches", factor: 0.00064516 },
  acres: { name: "Acres", factor: 4046.8564224 },
  hectares: { name: "Hectares", factor: 10000 },
};

export default function AreaConverter() {
  const [value, setValue] = React.useState("");
  const [fromUnit, setFromUnit] = React.useState("square-meters");
  const [toUnit, setToUnit] = React.useState("square-feet");
  const [result, setResult] = React.useState("");

  const convertArea = () => {
    const num = parseFloat(value);
    if (Number.isNaN(num)) {
      setResult("Invalid input");
      return;
    }

    const fromFactor = areaUnits[fromUnit as keyof typeof areaUnits].factor;
    const toFactor = areaUnits[toUnit as keyof typeof areaUnits].factor;
    const converted = (num * fromFactor) / toFactor;

    setResult(converted.toFixed(6));
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
            <Square className="h-5 w-5" />
            Area Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="area-value">Value</Label>
              <Input
                id="area-value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter area"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area-from">From Unit</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger id="area-from">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(areaUnits).map(([key, unit]) => (
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
              <Label htmlFor="area-to">To Unit</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger id="area-to">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(areaUnits).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={convertArea} className="flex-1">
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
                {result} {areaUnits[toUnit as keyof typeof areaUnits].name}
              </Heading>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
