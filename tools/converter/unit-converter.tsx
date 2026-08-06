"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft } from "lucide-react";

const CONVERSIONS: Record<string, Record<string, number>> = {
  length: {
    "meters": 1,
    "kilometers": 0.001,
    "centimeters": 100,
    "millimeters": 1000,
    "miles": 0.000621371,
    "yards": 1.09361,
    "feet": 3.28084,
    "inches": 39.3701,
  },
  weight: {
    "kilograms": 1,
    "grams": 1000,
    "milligrams": 1000000,
    "pounds": 2.20462,
    "ounces": 35.274,
    "tonnes": 0.001,
  },
  temperature: {
    "celsius": 1,
    "fahrenheit": 1,
    "kelvin": 1,
  },
};

const CATEGORY_DEFAULTS: Record<string, [string, string]> = {
  length: ["meters", "kilometers"],
  weight: ["kilograms", "grams"],
  temperature: ["celsius", "fahrenheit"],
};

export default function UnitConverter() {
  const [category, setCategory] = React.useState("length");
  const [value, setValue] = React.useState("");
  const [fromUnit, setFromUnit] = React.useState("meters");
  const [toUnit, setToUnit] = React.useState("kilometers");
  const [result, setResult] = React.useState<number | null>(null);

  const convert = () => {
    const num = parseFloat(value);
    if (isNaN(num)) return;

    if (category === "temperature") {
      const tempUnits = CONVERSIONS.temperature;
      if (tempUnits[fromUnit] == null || tempUnits[toUnit] == null) return;
      let temp = num;
      if (fromUnit === "celsius" && toUnit === "fahrenheit") {
        temp = (num * 9/5) + 32;
      } else if (fromUnit === "celsius" && toUnit === "kelvin") {
        temp = num + 273.15;
      } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
        temp = (num - 32) * 5/9;
      } else if (fromUnit === "fahrenheit" && toUnit === "kelvin") {
        temp = (num - 32) * 5/9 + 273.15;
      } else if (fromUnit === "kelvin" && toUnit === "celsius") {
        temp = num - 273.15;
      } else if (fromUnit === "kelvin" && toUnit === "fahrenheit") {
        temp = (num - 273.15) * 9/5 + 32;
      }
      setResult(temp);
    } else {
      const conversions = CONVERSIONS[category];
      if (!conversions || conversions[fromUnit] == null || conversions[toUnit] == null) return;
      const baseValue = num / conversions[fromUnit];
      const convertedValue = baseValue * conversions[toUnit];
      setResult(convertedValue);
    }
  };

  const handleCategoryChange = (next: string) => {
    setCategory(next);
    const defaults = CATEGORY_DEFAULTS[next];
    if (defaults) {
      setFromUnit(defaults[0]);
      setToUnit(defaults[1]);
    }
  };

  React.useEffect(() => {
    convert();
  }, [value, fromUnit, toUnit, category]);

  const units = Object.keys(CONVERSIONS[category]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRightLeft className="h-5 w-5" />
            Unit Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="length">Length</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Value</Label>
              <Input
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>To</Label>
            <Select value={toUnit} onValueChange={setToUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit.charAt(0).toUpperCase() + unit.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {result !== null && (
            <Card className="bg-muted">
              <CardContent className="pt-6">
                <Text variant="muted" className="text-sm mb-1">
                  Result
                </Text>
                <Heading level="h3" className="text-3xl font-bold">
                  {result.toFixed(4)} {toUnit}
                </Heading>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
