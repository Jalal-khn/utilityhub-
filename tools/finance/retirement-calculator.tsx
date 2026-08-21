"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Armchair, Coins, TrendingUp } from "lucide-react";

export default function RetirementCalculator() {
  const [currentSavings, setCurrentSavings] = React.useState("50000");
  const [monthlyContribution, setMonthlyContribution] = React.useState("800");
  const [rate, setRate] = React.useState([7]);
  const [currentAge, setCurrentAge] = React.useState([30]);
  const [retirementAge, setRetirementAge] = React.useState([65]);

  const savings = parseFloat(currentSavings) || 0;
  const monthly = parseFloat(monthlyContribution) || 0;
  const years = Math.max(0, retirementAge[0] - currentAge[0]);
  const months = years * 12;
  const monthlyRate = rate[0] / 100 / 12;

  const futureValue =
    monthlyRate === 0
      ? savings + monthly * months
      : savings * Math.pow(1 + monthlyRate, months) +
        monthly *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
          (1 + monthlyRate);

  const totalContributions = savings + monthly * months;
  const growth = futureValue - totalContributions;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Armchair className="h-5 w-5" />
            Retirement Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ret-current">Current Savings ($)</Label>
              <Input
                id="ret-current"
                type="number"
                min={0}
                value={currentSavings}
                onChange={(event) => setCurrentSavings(event.target.value)}
                placeholder="50000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ret-monthly">Monthly Contribution ($)</Label>
              <Input
                id="ret-monthly"
                type="number"
                min={0}
                value={monthlyContribution}
                onChange={(event) => setMonthlyContribution(event.target.value)}
                placeholder="800"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Current Age</Label>
                <Text variant="muted">{currentAge[0]}</Text>
              </div>
              <Slider
                value={currentAge}
                onValueChange={setCurrentAge}
                min={18}
                max={70}
                step={1}
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Retirement Age</Label>
                <Text variant="muted">{retirementAge[0]}</Text>
              </div>
              <Slider
                value={retirementAge}
                onValueChange={setRetirementAge}
                min={40}
                max={80}
                step={1}
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Return Rate (%)</Label>
                <Text variant="muted">{rate[0]}%</Text>
              </div>
              <Slider value={rate} onValueChange={setRate} min={1} max={15} step={0.5} />
            </div>
          </div>

          <Text variant="muted" className="text-sm">
            Years until retirement: <span className="font-semibold text-foreground">{years}</span>
          </Text>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Projected Nest Egg at Age {retirementAge[0]}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Coins className="h-4 w-4" />
                Projected Savings
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-green-600">
                ${formatCurrency(futureValue)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="text-sm">
                Total You Contributed
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(totalContributions)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4" />
                Investment Growth
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-green-600">
                ${formatCurrency(growth)}
              </Heading>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Projections assume a constant annual return and do not account for inflation, fees, or
            taxes. A common rule of thumb is to aim for 10-12x your final annual salary.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
