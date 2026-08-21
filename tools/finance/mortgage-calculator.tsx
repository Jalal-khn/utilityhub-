"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Home, Calendar, TrendingDown, PiggyBank } from "lucide-react";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = React.useState("300000");
  const [downPaymentPercent, setDownPaymentPercent] = React.useState([20]);
  const [rate, setRate] = React.useState([6.5]);
  const [years, setYears] = React.useState([30]);

  const price = parseFloat(homePrice) || 0;
  const downPayment = (price * downPaymentPercent[0]) / 100;
  const loanAmount = price - downPayment;

  const monthlyRate = rate[0] / 100 / 12;
  const numberOfPayments = years[0] * 12;

  const monthlyPayment =
    loanAmount <= 0
      ? 0
      : monthlyRate === 0
        ? loanAmount / numberOfPayments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - loanAmount;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Mortgage Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="home-price">Home Price ($)</Label>
            <Input
              id="home-price"
              type="number"
              min={0}
              value={homePrice}
              onChange={(event) => setHomePrice(event.target.value)}
              placeholder="300000"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Down Payment</Label>
              <Text variant="muted">
                {downPaymentPercent[0]}% (${downPayment.toLocaleString()})
              </Text>
            </div>
            <Slider
              value={downPaymentPercent}
              onValueChange={setDownPaymentPercent}
              min={0}
              max={50}
              step={1}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Interest Rate (%)</Label>
              <Text variant="muted">{rate[0]}%</Text>
            </div>
            <Slider value={rate} onValueChange={setRate} min={0.5} max={15} step={0.05} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Loan Term</Label>
              <Text variant="muted">{years[0]} years</Text>
            </div>
            <Slider value={years} onValueChange={setYears} min={5} max={40} step={1} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Mortgage Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Calendar className="h-4 w-4" />
                Monthly Payment
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(monthlyPayment)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <PiggyBank className="h-4 w-4" />
                Loan Amount
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${loanAmount.toLocaleString()}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <TrendingDown className="h-4 w-4" />
                Total Interest
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-red-500">
                ${formatCurrency(totalInterest)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Home className="h-4 w-4" />
                Total Cost of Home
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(downPayment + totalPayment)}
              </Heading>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
