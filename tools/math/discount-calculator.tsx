"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heading, Text } from "@/components/ui/typography";
import { BadgePercent } from "lucide-react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function DiscountCalculator() {
  const [price, setPrice] = React.useState("100");
  const [discount, setDiscount] = React.useState("20");

  const priceNum = parseFloat(price);
  const discountNum = parseFloat(discount);

  const isValid = !Number.isNaN(priceNum) && !Number.isNaN(discountNum) && priceNum >= 0 && discountNum >= 0;

  const savings = isValid ? (priceNum * discountNum) / 100 : 0;
  const finalPrice = isValid ? priceNum - savings : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BadgePercent className="h-5 w-5" />
            Discount Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="original-price">Original Price</Label>
            <Input
              id="original-price"
              type="number"
              min={0}
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="100"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discount-percent">Discount Percentage (%)</Label>
            <Input
              id="discount-percent"
              type="number"
              min={0}
              max={100}
              step="0.01"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="20"
            />
          </div>

          {!isValid && (
            <p className="text-sm text-destructive">Enter a valid non-negative price and discount percentage.</p>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Final Price
            </Text>
            <Heading level="h3" className="text-2xl font-bold">
              {isValid ? formatCurrency(finalPrice) : "—"}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              You Save
            </Text>
            <Heading level="h3" className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {isValid ? formatCurrency(savings) : "—"}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              Discount Applied
            </Text>
            <Heading level="h3" className="text-2xl font-bold">
              {isValid ? `${discountNum}%` : "—"}
            </Heading>
          </CardContent>
        </Card>
      </div>

      {isValid && discountNum > 100 && (
        <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          The discount percentage exceeds 100%. Double-check your inputs.
        </div>
      )}
    </div>
  );
}
