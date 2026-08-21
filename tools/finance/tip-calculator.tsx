"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Receipt, Users, HandCoins, Split } from "lucide-react";

const QUICK_TIPS = [10, 15, 18, 20, 25];

export default function TipCalculator() {
  const [billAmount, setBillAmount] = React.useState("50");
  const [tipPercent, setTipPercent] = React.useState([15]);
  const [people, setPeople] = React.useState([1]);

  const bill = parseFloat(billAmount) || 0;
  const tipAmount = (bill * tipPercent[0]) / 100;
  const totalBill = bill + tipAmount;
  const perPersonTotal = totalBill / people[0];
  const tipPerPerson = tipAmount / people[0];

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Bill Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="bill-amount">Bill Amount ($)</Label>
            <Input
              id="bill-amount"
              type="number"
              min={0}
              step={0.01}
              value={billAmount}
              onChange={(event) => setBillAmount(event.target.value)}
              placeholder="50"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Tip Percentage</Label>
              <Text variant="muted">{tipPercent[0]}%</Text>
            </div>
            <Slider value={tipPercent} onValueChange={setTipPercent} min={0} max={40} step={1} />
            <div className="flex flex-wrap gap-2">
              {QUICK_TIPS.map((percent) => (
                <Button
                  key={percent}
                  variant={tipPercent[0] === percent ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTipPercent([percent])}
                >
                  {percent}%
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Split Between</Label>
              <Text variant="muted" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {people[0]} {people[0] === 1 ? "person" : "people"}
              </Text>
            </div>
            <Slider value={people} onValueChange={setPeople} min={1} max={20} step={1} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tip Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <HandCoins className="h-4 w-4" />
                Tip Amount
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-green-600">
                ${formatCurrency(tipAmount)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="text-sm">
                Total Bill
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(totalBill)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Split className="h-4 w-4" />
                Per Person
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(perPersonTotal)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="text-sm">
                Tip Per Person
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-green-600">
                ${formatCurrency(tipPerPerson)}
              </Heading>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
