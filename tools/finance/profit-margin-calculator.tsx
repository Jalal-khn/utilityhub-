"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Percent, DollarSign, Layers } from "lucide-react";

export default function ProfitMarginCalculator() {
  const [cost, setCost] = React.useState("40");
  const [revenue, setRevenue] = React.useState("100");

  const costValue = parseFloat(cost) || 0;
  const revenueValue = parseFloat(revenue) || 0;
  const profit = revenueValue - costValue;
  const margin = revenueValue > 0 ? (profit / revenueValue) * 100 : 0;
  const markup = costValue > 0 ? (profit / costValue) * 100 : 0;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Percent className="h-5 w-5" />
            Cost and Revenue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pm-cost">Cost Price ($)</Label>
              <Input
                id="pm-cost"
                type="number"
                min={0}
                step={0.01}
                value={cost}
                onChange={(event) => setCost(event.target.value)}
                placeholder="40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pm-revenue">Selling Price ($)</Label>
              <Input
                id="pm-revenue"
                type="number"
                min={0}
                step={0.01}
                value={revenue}
                onChange={(event) => setRevenue(event.target.value)}
                placeholder="100"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Margin Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <DollarSign className="h-4 w-4" />
                Gross Profit
              </Text>
              <Heading
                level="h3"
                className={`text-2xl font-bold ${profit >= 0 ? "text-green-600" : "text-red-500"}`}
              >
                ${formatCurrency(profit)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Percent className="h-4 w-4" />
                Profit Margin
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                {margin.toFixed(2)}%
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Layers className="h-4 w-4" />
                Markup
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                {markup.toFixed(2)}%
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="text-sm">
                Total Revenue
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(revenueValue)}
              </Heading>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Margin is profit divided by the selling price; markup is profit divided by the cost. A
            50% margin equals a 100% markup - mixing them up is one of the most common pricing
            mistakes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
