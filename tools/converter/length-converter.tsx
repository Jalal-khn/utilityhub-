"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ruler, ArrowRightLeft } from "lucide-react";

const lengthUnits = {
  meters: { name: "Meters", factor: 1 },
  kilometers: { name: "Kilometers", factor: 1000 },
  centimeters: { name: "Centimeters", factor: 0.01 },
  millimeters: { name: "Millimeters", factor: 0.001 },
  miles: { name: "Miles", factor: 1609.344 },
  yards: { name: "Yards", factor: 0.9144 },
  feet: { name: "Feet", factor: 0.3048 },
  inches: { name: "Inches", factor: 0.0254 },
};

export default function LengthConverter() {
  const [value, setValue] = React.useState("");
  const [fromUnit, setFromUnit] = React.useState("meters");
  const [toUnit, setToUnit] = React.useState("feet");
  const [result, setResult] = React.useState("");

  const convertLength = () => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResult("Invalid input");
      return;
    }

    const fromFactor = lengthUnits[fromUnit as keyof typeof lengthUnits].factor;
    const toFactor = lengthUnits[toUnit as keyof typeof lengthUnits].factor;
    
    // Convert to meters first, then to target unit
    const inMeters = num * fromFactor;
    const converted = inMeters / toFactor;

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
            <Ruler className="h-5 w-5" />
            Length Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter length"
              />
            </div>

            <div className="space-y-2">
              <Label>From Unit</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(lengthUnits).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-center md:col-span-2">
              <Button onClick={swapUnits} variant="outline" size="icon">
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2">
              <Label>To Unit</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(lengthUnits).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={convertLength} className="flex-1">
              Convert
            </Button>
            <Button onClick={clearAll} variant="outline">
              Clear
            </Button>
          </div>

          {result && (
            <div className="bg-muted p-4 rounded-lg">
              <Text variant="muted" className="text-sm mb-2">Result:</Text>
              <Heading className="text-2xl font-bold">
                {result} {lengthUnits[toUnit as keyof typeof lengthUnits].name}
              </Heading>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
