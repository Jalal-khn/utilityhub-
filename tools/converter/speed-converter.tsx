"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gauge, ArrowRightLeft } from "lucide-react";

const speedUnits = {
  "meters-per-second": { name: "Meters per Second (m/s)", factor: 1 },
  "kilometers-per-hour": { name: "Kilometers per Hour (km/h)", factor: 0.277778 },
  "miles-per-hour": { name: "Miles per Hour (mph)", factor: 0.44704 },
  knots: { name: "Knots (kn)", factor: 0.514444 },
  "feet-per-second": { name: "Feet per Second (ft/s)", factor: 0.3048 },
};

export default function SpeedConverter() {
  const [value, setValue] = React.useState("");
  const [fromUnit, setFromUnit] = React.useState("kilometers-per-hour");
  const [toUnit, setToUnit] = React.useState("miles-per-hour");
  const [result, setResult] = React.useState("");

  const convertSpeed = () => {
    const num = parseFloat(value);
    if (Number.isNaN(num)) {
      setResult("Invalid input");
      return;
    }

    const fromFactor = speedUnits[fromUnit as keyof typeof speedUnits].factor;
    const toFactor = speedUnits[toUnit as keyof typeof speedUnits].factor;
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
            <Gauge className="h-5 w-5" />
            Speed Converter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="speed-value">Value</Label>
              <Input
                id="speed-value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter speed"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="speed-from">From Unit</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger id="speed-from">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(speedUnits).map(([key, unit]) => (
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
              <Label htmlFor="speed-to">To Unit</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger id="speed-to">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(speedUnits).map(([key, unit]) => (
                    <SelectItem key={key} value={key}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={convertSpeed} className="flex-1">
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
                {result} {speedUnits[toUnit as keyof typeof speedUnits].name}
              </Heading>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
