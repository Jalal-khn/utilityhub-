"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Percent, Coins, CalendarClock } from "lucide-react";

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = React.useState("10000");
  const [rate, setRate] = React.useState([5]);
  const [years, setYears] = React.useState([5]);

  const amount = parseFloat(principal) || 0;
  const interest = (amount * rate[0] * years[0]) / 100;
  const total = amount + interest;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Simple Interest Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="si-principal">Principal Amount ($)</Label>
            <Input
              id="si-principal"
              type="number"
              min={0}
              value={principal}
              onChange={(event) => setPrincipal(event.target.value)}
              placeholder="10000"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Interest Rate (% per year)</Label>
              <Text variant="muted">{rate[0]}%</Text>
            </div>
            <Slider value={rate} onValueChange={setRate} min={0.5} max={30} step={0.25} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Time Period</Label>
              <Text variant="muted">{years[0]} years</Text>
            </div>
            <Slider value={years} onValueChange={setYears} min={1} max={30} step={1} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Result Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Percent className="h-4 w-4" />
                Interest Earned
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-green-600">
                ${formatCurrency(interest)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Coins className="h-4 w-4" />
                Total Amount
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(total)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <CalendarClock className="h-4 w-4" />
                Interest Per Year
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(years[0] > 0 ? interest / years[0] : 0)}
              </Heading>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Formula: Interest = (Principal x Rate x Time) / 100. Simple interest is earned only on
            the original principal - unlike compound interest, growth is linear.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
