"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heading, Text } from "@/components/ui/typography";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Receipt } from "lucide-react";

const GST_RATES = [
  { label: "5% (e.g. essential goods)", value: "5" },
  { label: "12% (e.g. standard goods)", value: "12" },
  { label: "18% (e.g. most services)", value: "18" },
  { label: "28% (e.g. luxury goods)", value: "28" },
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);

export default function GstCalculator() {
  const [amount, setAmount] = React.useState("10000");
  const [rate, setRate] = React.useState("18");
  const [type, setType] = React.useState<"inclusive" | "exclusive">("exclusive");

  const baseAmount = parseFloat(amount);
  const gstRate = parseFloat(rate);
  const isValid = !Number.isNaN(baseAmount) && baseAmount >= 0 && !Number.isNaN(gstRate) && gstRate >= 0;

  const gstAmount = isValid ? (baseAmount * gstRate) / 100 : 0;
  const totalInclusive = isValid ? baseAmount + gstAmount : 0;
  const totalExclusive = isValid ? baseAmount - gstAmount : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            GST Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gst-amount">
              {type === "exclusive" ? "Net Amount (before GST)" : "Gross Amount (GST included)"}
            </Label>
            <Input
              id="gst-amount"
              type="number"
              min={0}
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="10000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gst-rate">GST Rate</Label>
            <Select value={rate} onValueChange={setRate}>
              <SelectTrigger id="gst-rate" className="w-full">
                <SelectValue placeholder="Select GST rate" />
              </SelectTrigger>
              <SelectContent>
                {GST_RATES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Calculation Type</Label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setType("exclusive")}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  type === "exclusive" ? "border-primary bg-primary/10 text-primary" : "bg-background hover:bg-muted/40"
                }`}
              >
                Add GST (exclusive)
              </button>
              <button
                type="button"
                onClick={() => setType("inclusive")}
                className={`flex-1 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                  type === "inclusive" ? "border-primary bg-primary/10 text-primary" : "bg-background hover:bg-muted/40"
                }`}
              >
                Remove GST (inclusive)
              </button>
            </div>
          </div>

          {!isValid && <p className="text-sm text-destructive">Enter a valid amount and GST rate.</p>}
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              {type === "exclusive" ? "Net Amount" : "Amount Without GST"}
            </Text>
            <Heading level="h3" className="text-2xl font-bold">
              {isValid ? formatCurrency(type === "exclusive" ? baseAmount : totalExclusive) : "—"}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              GST Amount
            </Text>
            <Heading level="h3" className="text-2xl font-bold text-primary">
              {isValid ? formatCurrency(gstAmount) : "—"}
            </Heading>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Text variant="muted" className="text-sm">
              {type === "exclusive" ? "Total with GST" : "Total Including GST"}
            </Text>
            <Heading level="h3" className="text-2xl font-bold">
              {isValid ? formatCurrency(type === "exclusive" ? totalInclusive : baseAmount) : "—"}
            </Heading>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
