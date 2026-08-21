"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, ShoppingCart, Coins } from "lucide-react";

export default function InflationCalculator() {
  const [amount, setAmount] = React.useState("1000");
  const [rate, setRate] = React.useState([3]);
  const [years, setYears] = React.useState([10]);

  const money = parseFloat(amount) || 0;
  const inflationFactor = Math.pow(1 + rate[0] / 100, years[0]);
  const futureCost = money * inflationFactor;
  const purchasingPower = money / inflationFactor;
  const lostValue = money - purchasingPower;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Inflation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="inf-amount">Amount Today ($)</Label>
            <Input
              id="inf-amount"
              type="number"
              min={0}
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="1000"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Expected Inflation Rate (% per year)</Label>
              <Text variant="muted">{rate[0]}%</Text>
            </div>
            <Slider value={rate} onValueChange={setRate} min={1} max={15} step={0.25} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Number of Years</Label>
              <Text variant="muted">{years[0]} years</Text>
            </div>
            <Slider value={years} onValueChange={setYears} min={1} max={50} step={1} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Impact Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <ShoppingCart className="h-4 w-4" />
                Same Items Will Cost
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-red-500">
                ${formatCurrency(futureCost)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Coins className="h-4 w-4" />
                Money Buys What Costs Today
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(purchasingPower)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="text-sm">
                Purchasing Power Lost
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-red-500">
                ${formatCurrency(lostValue)}
              </Heading>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            The long-run US inflation average is roughly 3% per year. To outpace inflation,
            investments need to earn more than the inflation rate after fees and taxes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
