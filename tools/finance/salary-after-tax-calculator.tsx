"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Wallet, Receipt, Percent } from "lucide-react";

interface TaxBracket {
  upTo: number;
  rate: number;
}

const TAX_SYSTEMS: Record<
  string,
  { label: string; currency: string; deduction: number; brackets: TaxBracket[]; note: string }
> = {
  us: {
    label: "United States (Federal, Single)",
    currency: "$",
    deduction: 15000,
    brackets: [
      { upTo: 11925, rate: 0.1 },
      { upTo: 48475, rate: 0.12 },
      { upTo: 103350, rate: 0.22 },
      { upTo: 197300, rate: 0.24 },
      { upTo: 250525, rate: 0.32 },
      { upTo: 626350, rate: 0.35 },
      { upTo: Infinity, rate: 0.37 },
    ],
    note: "Estimates federal income tax only with the standard deduction. State tax, Social Security, and Medicare are not included.",
  },
  uk: {
    label: "United Kingdom",
    currency: "£",
    deduction: 12570,
    brackets: [
      { upTo: 50270, rate: 0.2 },
      { upTo: 125140, rate: 0.4 },
      { upTo: Infinity, rate: 0.45 },
    ],
    note: "Estimates income tax only with the personal allowance. National Insurance contributions are not included.",
  },
  ca: {
    label: "Canada (Federal)",
    currency: "C$",
    deduction: 16129,
    brackets: [
      { upTo: 57375, rate: 0.15 },
      { upTo: 114750, rate: 0.205 },
      { upTo: 177882, rate: 0.26 },
      { upTo: 253414, rate: 0.29 },
      { upTo: Infinity, rate: 0.33 },
    ],
    note: "Estimates federal tax only with the basic personal amount. Provincial tax and CPP/EI are not included.",
  },
};

function calculateTax(taxableIncome: number, brackets: TaxBracket[]): number {
  let tax = 0;
  let previousThreshold = 0;
  for (const bracket of brackets) {
    if (taxableIncome <= previousThreshold) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.upTo) - previousThreshold;
    tax += taxableInBracket * bracket.rate;
    previousThreshold = bracket.upTo;
  }
  return tax;
}

export default function SalaryAfterTaxCalculator() {
  const [country, setCountry] = React.useState("us");
  const [grossSalary, setGrossSalary] = React.useState("60000");

  const system = TAX_SYSTEMS[country];
  const gross = parseFloat(grossSalary) || 0;
  const taxableIncome = Math.max(0, gross - system.deduction);
  const estimatedTax = calculateTax(taxableIncome, system.brackets);
  const netIncome = gross - estimatedTax;
  const effectiveRate = gross > 0 ? (estimatedTax / gross) * 100 : 0;
  const monthlyNet = netIncome / 12;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Salary Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Country / Tax System</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TAX_SYSTEMS).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="gross-salary">Gross Annual Salary ({system.currency})</Label>
              <Input
                id="gross-salary"
                type="number"
                min={0}
                value={grossSalary}
                onChange={(event) => setGrossSalary(event.target.value)}
                placeholder="60000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Take-Home Estimate</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Text variant="muted" className="text-sm">
                Gross Salary
              </Text>
              <Heading level="h3" className="text-xl font-bold">
                {system.currency}
                {formatCurrency(gross)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Receipt className="h-4 w-4" />
                Estimated Tax
              </Text>
              <Heading level="h3" className="text-xl font-bold text-red-500">
                {system.currency}
                {formatCurrency(estimatedTax)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="text-sm">
                Net (Take-Home)
              </Text>
              <Heading level="h3" className="text-xl font-bold text-green-600">
                {system.currency}
                {formatCurrency(netIncome)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Percent className="h-4 w-4" />
                Effective Tax Rate
              </Text>
              <Heading level="h3" className="text-xl font-bold">
                {effectiveRate.toFixed(1)}%
              </Heading>
            </div>
          </div>

          <div className="rounded-lg border bg-muted/40 p-4">
            <Text variant="muted" className="text-sm">
              Monthly take-home:{" "}
              <span className="font-bold text-foreground">
                {system.currency}
                {formatCurrency(monthlyNet)}
              </span>{" "}
              | Tax-free allowance:{" "}
              <span className="font-semibold text-foreground">
                {system.currency}
                {system.deduction.toLocaleString()}
              </span>
            </Text>
          </div>

          <p className="text-xs text-muted-foreground">{system.note}</p>
        </CardContent>
      </Card>
    </div>
  );
}
