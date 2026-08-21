"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, Coins, PiggyBank } from "lucide-react";

const COMPOUNDING_OPTIONS = [
  { label: "Yearly", value: "1" },
  { label: "Half-Yearly", value: "2" },
  { label: "Quarterly", value: "4" },
  { label: "Monthly", value: "12" },
  { label: "Daily", value: "365" },
];

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = React.useState("10000");
  const [monthlyContribution, setMonthlyContribution] = React.useState("500");
  const [rate, setRate] = React.useState([8]);
  const [years, setYears] = React.useState([10]);
  const [compounding, setCompounding] = React.useState("12");

  const initialPrincipal = parseFloat(principal) || 0;
  const monthlyAddition = parseFloat(monthlyContribution) || 0;
  const compoundsPerYear = parseFloat(compounding) || 1;

  const periodicRate = rate[0] / 100 / compoundsPerYear;
  const totalMonths = years[0] * 12;
  const periodsPerMonth = compoundsPerYear / 12;

  let balance = initialPrincipal;
  for (let month = 0; month < totalMonths; month += 1) {
    balance *= Math.pow(1 + periodicRate, periodsPerMonth);
    balance += monthlyAddition;
  }

  const futureValue = balance;
  const totalContributions = initialPrincipal + monthlyAddition * totalMonths;
  const totalInterest = futureValue - totalContributions;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Investment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ci-principal">Initial Investment ($)</Label>
              <Input
                id="ci-principal"
                type="number"
                min={0}
                value={principal}
                onChange={(event) => setPrincipal(event.target.value)}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ci-monthly">Monthly Addition ($)</Label>
              <Input
                id="ci-monthly"
                type="number"
                min={0}
                value={monthlyContribution}
                onChange={(event) => setMonthlyContribution(event.target.value)}
                placeholder="500"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Interest Rate (%)</Label>
                <Text variant="muted">{rate[0]}%</Text>
              </div>
              <Slider value={rate} onValueChange={setRate} min={1} max={20} step={0.25} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Time Period</Label>
                <Text variant="muted">{years[0]} years</Text>
              </div>
              <Slider value={years} onValueChange={setYears} min={1} max={50} step={1} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Compounding Frequency</Label>
            <Select value={compounding} onValueChange={setCompounding}>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                {COMPOUNDING_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Growth Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Coins className="h-4 w-4" />
                Future Value
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-green-600">
                ${formatCurrency(futureValue)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <PiggyBank className="h-4 w-4" />
                Total Contributions
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(totalContributions)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4" />
                Interest Earned
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-green-600">
                ${formatCurrency(totalInterest)}
              </Heading>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
