"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Car, CalendarClock, TrendingDown } from "lucide-react";

export default function CarLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = React.useState("30000");
  const [downPayment, setDownPayment] = React.useState("3000");
  const [tradeIn, setTradeIn] = React.useState("0");
  const [rate, setRate] = React.useState([7]);
  const [years, setYears] = React.useState([5]);

  const price = parseFloat(vehiclePrice) || 0;
  const down = parseFloat(downPayment) || 0;
  const tradeInValue = parseFloat(tradeIn) || 0;
  const loanAmount = Math.max(0, price - down - tradeInValue);

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
  const totalCostOfCar = down + tradeInValue + totalPayment;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="h-5 w-5" />
            Car Loan Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="car-price">Vehicle Price ($)</Label>
              <Input
                id="car-price"
                type="number"
                min={0}
                value={vehiclePrice}
                onChange={(event) => setVehiclePrice(event.target.value)}
                placeholder="30000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="car-down">Down Payment ($)</Label>
              <Input
                id="car-down"
                type="number"
                min={0}
                value={downPayment}
                onChange={(event) => setDownPayment(event.target.value)}
                placeholder="3000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="car-trade">Trade-In Value ($)</Label>
              <Input
                id="car-trade"
                type="number"
                min={0}
                value={tradeIn}
                onChange={(event) => setTradeIn(event.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Interest Rate (%)</Label>
                <Text variant="muted">{rate[0]}%</Text>
              </div>
              <Slider value={rate} onValueChange={setRate} min={0} max={25} step={0.25} />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label>Loan Term</Label>
                <Text variant="muted">{years[0]} years</Text>
              </div>
              <Slider value={years} onValueChange={setYears} min={1} max={8} step={1} />
            </div>
          </div>

          <Text variant="muted" className="text-sm">
            Amount to finance:{" "}
            <span className="font-semibold text-foreground">${loanAmount.toLocaleString()}</span>
          </Text>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Car Loan Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <CalendarClock className="h-4 w-4" />
                Monthly Payment
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(monthlyPayment)}
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
              <Text variant="muted" className="text-sm">
                Total Loan Payments
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(totalPayment)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="text-sm">
                True Cost of Car
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(totalCostOfCar)}
              </Heading>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Sales tax, registration, and fees are not included. Shorter loan terms mean higher
            monthly payments but significantly less total interest.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
