"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Thermometer, ArrowRightLeft } from "lucide-react";

export default function TemperatureConverter() {
  const [value, setValue] = React.useState("");
  const [fromUnit, setFromUnit] = React.useState("celsius");
  const [toUnit, setToUnit] = React.useState("fahrenheit");
  const [result, setResult] = React.useState("");

  const convertTemperature = () => {
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResult("Invalid input");
      return;
    }

    let celsius: number;
    
    // Convert to Celsius first
    switch (fromUnit) {
      case "celsius":
        celsius = num;
        break;
      case "fahrenheit":
        celsius = (num - 32) * (5/9);
        break;
      case "kelvin":
        celsius = num - 273.15;
        break;
      default:
        celsius = num;
    }

    // Convert from Celsius to target
    let converted: number;
    switch (toUnit) {
      case "celsius":
        converted = celsius;
        break;
      case "fahrenheit":
        converted = (celsius * 9/5) + 32;
        break;
      case "kelvin":
        converted = celsius + 273.15;
        break;
      default:
        converted = celsius;
    }

    setResult(converted.toFixed(2));
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
            <Thermometer className="h-5 w-5" />
            Temperature Converter
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
                placeholder="Enter temperature"
              />
            </div>

            <div className="space-y-2">
              <Label>From Unit</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
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
                  <SelectItem value="celsius">Celsius (°C)</SelectItem>
                  <SelectItem value="fahrenheit">Fahrenheit (°F)</SelectItem>
                  <SelectItem value="kelvin">Kelvin (K)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={convertTemperature} className="flex-1">
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
                {result} {toUnit === "celsius" ? "°C" : toUnit === "fahrenheit" ? "°F" : "K"}
              </Heading>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
