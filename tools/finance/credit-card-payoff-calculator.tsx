"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CreditCard, CalendarClock, TrendingDown } from "lucide-react";

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = React.useState("5000");
  const [apr, setApr] = React.useState([21]);
  const [monthlyPayment, setMonthlyPayment] = React.useState("200");

  const cardBalance = parseFloat(balance) || 0;
  const payment = parseFloat(monthlyPayment) || 0;
  const monthlyRate = apr[0] / 100 / 12;

  const result = React.useMemo(() => {
    if (cardBalance <= 0) {
      return { months: 0, totalInterest: 0, totalPaid: 0 };
    }

    const minimumNeeded = cardBalance * monthlyRate;
    if (payment <= minimumNeeded) {
      return null;
    }

    let remaining = cardBalance;
    let months = 0;
    let totalInterest = 0;

    while (remaining > 0 && months < 1200) {
      const interest = remaining * monthlyRate;
      totalInterest += interest;
      remaining = remaining + interest - payment;
      months += 1;
    }

    return { months, totalInterest, totalPaid: cardBalance + totalInterest };
  }, [cardBalance, monthlyRate, payment]);

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Credit Card Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cc-balance">Card Balance ($)</Label>
              <Input
                id="cc-balance"
                type="number"
                min={0}
                value={balance}
                onChange={(event) => setBalance(event.target.value)}
                placeholder="5000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cc-payment">Monthly Payment ($)</Label>
              <Input
                id="cc-payment"
                type="number"
                min={0}
                value={monthlyPayment}
                onChange={(event) => setMonthlyPayment(event.target.value)}
                placeholder="200"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Annual Percentage Rate (APR)</Label>
              <Text variant="muted">{apr[0]}%</Text>
            </div>
            <Slider value={apr} onValueChange={setApr} min={5} max={36} step={0.5} />
          </div>
        </CardContent>
      </Card>

      {result === null ? (
        <Card>
          <CardContent className="py-8 text-center">
            <Heading level="h3" className="text-lg font-bold text-red-500">
              Payment too low to pay off this debt
            </Heading>
            <Text variant="muted" className="mt-2">
              Your monthly payment must exceed the monthly interest charge of{" "}
              <span className="font-semibold text-foreground">
                ${formatCurrency(cardBalance * monthlyRate)}
              </span>
              . Increase your payment to make progress on the balance.
            </Text>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Payoff Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <Text variant="muted" className="flex items-center gap-1 text-sm">
                  <CalendarClock className="h-4 w-4" />
                  Debt-Free In
                </Text>
                <Heading level="h3" className="text-2xl font-bold text-green-600">
                  {Math.floor(result.months / 12)}y {result.months % 12}m
                </Heading>
                <Text variant="muted" className="text-xs">
                  ({result.months} months)
                </Text>
              </div>
              <div className="space-y-1">
                <Text variant="muted" className="flex items-center gap-1 text-sm">
                  <TrendingDown className="h-4 w-4" />
                  Total Interest Paid
                </Text>
                <Heading level="h3" className="text-2xl font-bold text-red-500">
                  ${formatCurrency(result.totalInterest)}
                </Heading>
              </div>
              <div className="space-y-1">
                <Text variant="muted" className="text-sm">
                  Total Amount Paid
                </Text>
                <Heading level="h3" className="text-2xl font-bold">
                  ${formatCurrency(result.totalPaid)}
                </Heading>
              </div>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              Assumes no new charges on the card and a fixed monthly payment. Paying even $25-50
              more per month can cut years off your payoff time.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
