"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, DollarSign, Scale } from "lucide-react";

export default function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = React.useState("10000");
  const [pricePerUnit, setPricePerUnit] = React.useState("50");
  const [variableCost, setVariableCost] = React.useState("30");

  const fixed = parseFloat(fixedCosts) || 0;
  const price = parseFloat(pricePerUnit) || 0;
  const variable = parseFloat(variableCost) || 0;

  const contributionMargin = price - variable;
  const breakEvenUnits =
    contributionMargin > 0 ? Math.ceil(fixed / contributionMargin) : null;
  const breakEvenRevenue = breakEvenUnits !== null ? breakEvenUnits * price : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Business Numbers
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="be-fixed">Fixed Costs ($)</Label>
              <Input
                id="be-fixed"
                type="number"
                min={0}
                value={fixedCosts}
                onChange={(event) => setFixedCosts(event.target.value)}
                placeholder="10000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="be-price">Price per Unit ($)</Label>
              <Input
                id="be-price"
                type="number"
                min={0}
                step={0.01}
                value={pricePerUnit}
                onChange={(event) => setPricePerUnit(event.target.value)}
                placeholder="50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="be-variable">Variable Cost per Unit ($)</Label>
              <Input
                id="be-variable"
                type="number"
                min={0}
                step={0.01}
                value={variableCost}
                onChange={(event) => setVariableCost(event.target.value)}
                placeholder="30"
              />
            </div>
          </div>

          <Text variant="muted" className="text-sm">
            Contribution margin per unit:{" "}
            <span className="font-semibold text-foreground">
              ${contributionMargin.toFixed(2)}
            </span>{" "}
            (what each sale contributes toward fixed costs and profit)
          </Text>
        </CardContent>
      </Card>

      {breakEvenUnits === null ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Heading level="h3" className="text-lg font-bold text-red-500">
              You lose money on every unit sold
            </Heading>
            <Text variant="muted" className="mt-2">
              The price per unit must be higher than the variable cost per unit for break-even to
              exist. Currently each sale loses ${Math.abs(contributionMargin).toFixed(2)}.
            </Text>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Break-Even Point</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <Text variant="muted" className="flex items-center gap-1 text-sm">
                  <Package className="h-4 w-4" />
                  Units to Sell
                </Text>
                <Heading level="h3" className="text-2xl font-bold text-green-600">
                  {breakEvenUnits.toLocaleString()}
                </Heading>
              </div>
              <div className="space-y-1">
                <Text variant="muted" className="flex items-center gap-1 text-sm">
                  <DollarSign className="h-4 w-4" />
                  Revenue Needed
                </Text>
                <Heading level="h3" className="text-2xl font-bold">
                  ${breakEvenRevenue?.toLocaleString()}
                </Heading>
              </div>
              <div className="space-y-1">
                <Text variant="muted" className="text-sm">
                  Profit After Break-Even (per Unit)
                </Text>
                <Heading level="h3" className="text-2xl font-bold text-green-600">
                  ${contributionMargin.toFixed(2)}
                </Heading>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Fixed costs are expenses that stay the same regardless of sales - rent, salaries,
              insurance. Variable costs change with each unit produced - materials, packaging,
              shipping.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
