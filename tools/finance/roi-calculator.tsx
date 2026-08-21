"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent, Coins, CalendarClock } from "lucide-react";

export default function RoiCalculator() {
  const [initialInvestment, setInitialInvestment] = React.useState("10000");
  const [finalValue, setFinalValue] = React.useState("15000");
  const [years, setYears] = React.useState("3");

  const initial = parseFloat(initialInvestment) || 0;
  const final = parseFloat(finalValue) || 0;
  const holdingYears = parseFloat(years) || 0;

  const profit = final - initial;
  const roi = initial > 0 ? (profit / initial) * 100 : 0;
  const annualizedRoi =
    initial > 0 && holdingYears > 0
      ? (Math.pow(final / initial, 1 / holdingYears) - 1) * 100
      : null;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Investment Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="roi-initial">Amount Invested ($)</Label>
              <Input
                id="roi-initial"
                type="number"
                value={initialInvestment}
                onChange={(event) => setInitialInvestment(event.target.value)}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roi-final">Final Value ($)</Label>
              <Input
                id="roi-final"
                type="number"
                value={finalValue}
                onChange={(event) => setFinalValue(event.target.value)}
                placeholder="15000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roi-years">Holding Period (Years)</Label>
              <Input
                id="roi-years"
                type="number"
                min={0}
                step={0.5}
                value={years}
                onChange={(event) => setYears(event.target.value)}
                placeholder="3"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ROI Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Text variant="muted" className="text-sm">
                Net Profit / Loss
              </Text>
              <Heading
                level="h3"
                className={`text-2xl font-bold ${profit >= 0 ? "text-green-600" : "text-red-500"}`}
              >
                {profit >= 0 ? "+" : "-"}${formatCurrency(Math.abs(profit))}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Percent className="h-4 w-4" />
                Total ROI
              </Text>
              <Heading
                level="h3"
                className={`text-2xl font-bold ${roi >= 0 ? "text-green-600" : "text-red-500"}`}
              >
                {roi.toFixed(2)}%
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <CalendarClock className="h-4 w-4" />
                Annualized ROI (CAGR)
              </Text>
              <Heading
                level="h3"
                className={`text-2xl font-bold ${
                  annualizedRoi !== null && annualizedRoi >= 0 ? "text-green-600" : "text-red-500"
                }`}
              >
                {annualizedRoi !== null ? `${annualizedRoi.toFixed(2)}%` : "-"}
              </Heading>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground flex items-start gap-1">
            <Coins className="h-3 w-3 mt-0.5 shrink-0" />
            Total ROI shows the overall return for the whole period. Annualized ROI (CAGR) shows the
            smoothed yearly return, making it easier to compare investments held for different
            lengths of time.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
