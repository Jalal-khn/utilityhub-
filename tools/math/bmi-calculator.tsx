"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Activity, Scale } from "lucide-react";

export default function BMICalculator() {
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [unit, setUnit] = React.useState<"metric" | "imperial">("metric");
  const [result, setResult] = React.useState<{
    bmi: number;
    category: string;
    color: string;
  } | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h || w <= 0 || h <= 0) {
      alert("Please enter valid weight and height");
      return;
    }

    let bmi: number;
    if (unit === "metric") {
      bmi = w / ((h / 100) * (h / 100));
    } else {
      bmi = (w / (h * h)) * 703;
    }

    bmi = Math.round(bmi * 10) / 10;

    let category = "";
    let color = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-500";
    } else if (bmi < 25) {
      category = "Normal weight";
      color = "text-green-500";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-yellow-500";
    } else {
      category = "Obese";
      color = "text-red-500";
    }

    setResult({ bmi, category, color });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Enter Your Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={unit} onValueChange={(v) => setUnit(v as "metric" | "imperial")}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="metric" id="metric" />
              <Label htmlFor="metric">Metric (kg, cm)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="imperial" id="imperial" />
              <Label htmlFor="imperial">Imperial (lbs, inches)</Label>
            </div>
          </RadioGroup>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight ({unit === "metric" ? "kg" : "lbs"})</Label>
              <Input
                id="weight"
                type="number"
                placeholder={unit === "metric" ? "70" : "154"}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height ({unit === "metric" ? "cm" : "inches"})</Label>
              <Input
                id="height"
                type="number"
                placeholder={unit === "metric" ? "175" : "69"}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={calculateBMI} className="w-full">
            Calculate BMI
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5" />
              Your BMI Result
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <Text variant="muted" className="text-sm">
                  BMI
                </Text>
                <Heading level="h2" className="text-5xl font-bold">
                  {result.bmi}
                </Heading>
              </div>
              <div>
                <Text variant="muted" className="text-sm">
                  Category
                </Text>
                <Heading level="h3" className={`text-2xl font-bold ${result.color}`}>
                  {result.category}
                </Heading>
              </div>
              <div className="pt-4 border-t">
                <Text variant="muted" className="text-xs">
                  BMI Categories: Underweight (&lt;18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (≥30)
                </Text>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
