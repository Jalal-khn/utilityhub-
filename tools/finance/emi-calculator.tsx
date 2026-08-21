"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, CalendarClock, TrendingDown, Sparkles } from "lucide-react";

interface EmiResult {
  emi: number;
  totalInterest: number;
  totalPayment: number;
  monthsWithPrepayment: number;
  interestWithPrepayment: number;
  interestSaved: number;
  monthsSaved: number;
}

export default function EmiCalculator() {
  const [principal, setPrincipal] = React.useState("500000");
  const [rate, setRate] = React.useState([8.5]);
  const [years, setYears] = React.useState([20]);
  const [prepayment, setPrepayment] = React.useState("0");

  const loanAmount = parseFloat(principal) || 0;
  const extraPayment = parseFloat(prepayment) || 0;

  const monthlyRate = rate[0] / 100 / 12;
  const numberOfPayments = years[0] * 12;

  const emi =
    loanAmount <= 0
      ? 0
      : monthlyRate === 0
        ? loanAmount / numberOfPayments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const result = React.useMemo<EmiResult>(() => {
    const baseInterest = emi * numberOfPayments - loanAmount;

    if (extraPayment <= 0 || emi <= 0) {
      return {
        emi,
        totalInterest: baseInterest,
        totalPayment: emi * numberOfPayments,
        monthsWithPrepayment: numberOfPayments,
        interestWithPrepayment: baseInterest,
        interestSaved: 0,
        monthsSaved: 0,
      };
    }

    let balance = loanAmount;
    let months = 0;
    let paidInterest = 0;
    const maxMonths = numberOfPayments * 2;

    while (balance > 0 && months < maxMonths) {
      const interest = balance * monthlyRate;
      paidInterest += interest;
      balance = balance + interest - emi - extraPayment;
      months += 1;
    }

    return {
      emi,
      totalInterest: baseInterest,
      totalPayment: emi * numberOfPayments,
      monthsWithPrepayment: months,
      interestWithPrepayment: paidInterest,
      interestSaved: Math.max(0, baseInterest - paidInterest),
      monthsSaved: Math.max(0, numberOfPayments - months),
    };
  }, [emi, extraPayment, loanAmount, monthlyRate, numberOfPayments]);

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            EMI Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="emi-principal">Loan Amount ($)</Label>
              <Input
                id="emi-principal"
                type="number"
                min={0}
                value={principal}
                onChange={(event) => setPrincipal(event.target.value)}
                placeholder="500000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emi-prepayment">Extra Monthly Payment ($)</Label>
              <Input
                id="emi-prepayment"
                type="number"
                min={0}
                value={prepayment}
                onChange={(event) => setPrepayment(event.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Interest Rate (%)</Label>
              <Text variant="muted">{rate[0]}%</Text>
            </div>
            <Slider value={rate} onValueChange={setRate} min={1} max={25} step={0.05} />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Loan Tenure</Label>
              <Text variant="muted">{years[0]} years</Text>
            </div>
            <Slider value={years} onValueChange={setYears} min={1} max={30} step={1} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>EMI Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <CalendarClock className="h-4 w-4" />
                Monthly EMI
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(result.emi)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <TrendingDown className="h-4 w-4" />
                Total Interest (without prepayment)
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-red-500">
                ${formatCurrency(result.totalInterest)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Calculator className="h-4 w-4" />
                Total Payment
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(result.totalPayment)}
              </Heading>
            </div>
          </div>

          {extraPayment > 0 && (
            <div className="rounded-lg border border-green-500/40 bg-green-500/10 p-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-1">
                  <Text variant="muted" className="flex items-center gap-1 text-sm">
                    <Sparkles className="h-4 w-4 text-green-600" />
                    Interest Saved
                  </Text>
                  <Heading level="h3" className="text-xl font-bold text-green-600">
                    ${formatCurrency(result.interestSaved)}
                  </Heading>
                </div>
                <div className="space-y-1">
                  <Text variant="muted" className="text-sm">
                    Loan Paid Off In
                  </Text>
                  <Heading level="h3" className="text-xl font-bold text-green-600">
                    {Math.floor(result.monthsWithPrepayment / 12)}y{" "}
                    {result.monthsWithPrepayment % 12}m
                  </Heading>
                </div>
                <div className="space-y-1">
                  <Text variant="muted" className="text-sm">
                    Time Saved
                  </Text>
                  <Heading level="h3" className="text-xl font-bold text-green-600">
                    {Math.floor(result.monthsSaved / 12)}y {result.monthsSaved % 12}m
                  </Heading>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
