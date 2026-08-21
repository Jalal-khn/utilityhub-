"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, Coins, PiggyBank, LineChart } from "lucide-react";

export default function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = React.useState("500");
  const [rate, setRate] = React.useState([12]);
  const [years, setYears] = React.useState([15]);

  const monthly = parseFloat(monthlyInvestment) || 0;
  const monthlyRate = rate[0] / 100 / 12;
  const months = years[0] * 12;

  const futureValue =
    monthlyRate === 0
      ? monthly * months
      : monthly * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
        (1 + monthlyRate);

  const invested = monthly * months;
  const estimatedGains = futureValue - invested;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" />
            SIP Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="sip-monthly">Monthly Investment ($)</Label>
            <Input
              id="sip-monthly"
              type="number"
              min={0}
              value={monthlyInvestment}
              onChange={(event) => setMonthlyInvestment(event.target.value)}
              placeholder="500"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Expected Return Rate (% per year)</Label>
              <Text variant="muted">{rate[0]}%</Text>
            </div>
            <Slider value={rate} onValueChange={setRate} min={1} max={30} step={0.5} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Investment Period</Label>
              <Text variant="muted">{years[0]} years</Text>
            </div>
            <Slider value={years} onValueChange={setYears} min={1} max={40} step={1} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SIP Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Text variant="muted" className="text-sm">
                Total Invested
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(invested)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-4 w-4" />
                Estimated Returns
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-green-600">
                ${formatCurrency(estimatedGains)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Coins className="h-4 w-4" />
                Total Value
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-green-600">
                ${formatCurrency(futureValue)}
              </Heading>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground flex items-start gap-1">
            <PiggyBank className="h-3 w-3 mt-0.5 shrink-0" />
            Estimates assume a constant return rate. Actual mutual fund returns vary year to year.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
