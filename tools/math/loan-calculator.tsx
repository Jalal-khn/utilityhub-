"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarSign, Calendar, TrendingUp } from "lucide-react";

export default function LoanCalculator() {
  const [amount, setAmount] = React.useState([100000]);
  const [rate, setRate] = React.useState([5]);
  const [years, setYears] = React.useState([30]);
  const [result, setResult] = React.useState<{
    monthlyPayment: number;
    totalPayment: number;
    totalInterest: number;
  } | null>(null);

  const calculateLoan = () => {
    const principal = amount[0];
    const annualRate = rate[0] / 100;
    const monthlyRate = annualRate / 12;
    const numberOfPayments = years[0] * 12;

    if (monthlyRate === 0) {
      const monthlyPayment = principal / numberOfPayments;
      setResult({
        monthlyPayment,
        totalPayment: principal,
        totalInterest: 0,
      });
      return;
    }

    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  React.useEffect(() => {
    calculateLoan();
  }, [amount, rate, years]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Loan Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Loan Amount</Label>
              <Text variant="muted">${amount[0].toLocaleString()}</Text>
            </div>
            <Slider
              value={amount}
              onValueChange={setAmount}
              min={1000}
              max={1000000}
              step={1000}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Interest Rate (%)</Label>
              <Text variant="muted">{rate[0]}%</Text>
            </div>
            <Slider
              value={rate}
              onValueChange={setRate}
              min={0.1}
              max={20}
              step={0.1}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Loan Term (Years)</Label>
              <Text variant="muted">{years[0]} years</Text>
            </div>
            <Slider
              value={years}
              onValueChange={setYears}
              min={1}
              max={30}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Loan Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <Text variant="muted" className="text-sm flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Monthly Payment
                </Text>
                <Heading level="h3" className="text-2xl font-bold">
                  ${result.monthlyPayment.toFixed(2)}
                </Heading>
              </div>
              <div className="space-y-1">
                <Text variant="muted" className="text-sm flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  Total Payment
                </Text>
                <Heading level="h3" className="text-2xl font-bold">
                  ${result.totalPayment.toFixed(2)}
                </Heading>
              </div>
              <div className="space-y-1">
                <Text variant="muted" className="text-sm flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Total Interest
                </Text>
                <Heading level="h3" className="text-2xl font-bold text-red-500">
                  ${result.totalInterest.toFixed(2)}
                </Heading>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
