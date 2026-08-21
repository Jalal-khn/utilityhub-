"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Clock, CalendarDays, CalendarRange, Wallet } from "lucide-react";

export default function HourlyToSalaryCalculator() {
  const [hourlyRate, setHourlyRate] = React.useState("25");
  const [hoursPerWeek, setHoursPerWeek] = React.useState([40]);
  const [weeksPerYear, setWeeksPerYear] = React.useState([52]);

  const rate = parseFloat(hourlyRate) || 0;
  const weeklySalary = rate * hoursPerWeek[0];
  const annualSalary = weeklySalary * weeksPerYear[0];
  const monthlySalary = annualSalary / 12;
  const dailySalary = weeklySalary / 5;

  const formatCurrency = (value: number) =>
    value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Work Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="hourly-rate">Hourly Rate ($)</Label>
            <Input
              id="hourly-rate"
              type="number"
              min={0}
              step={0.01}
              value={hourlyRate}
              onChange={(event) => setHourlyRate(event.target.value)}
              placeholder="25"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Hours per Week</Label>
              <Text variant="muted">{hoursPerWeek[0]} hours</Text>
            </div>
            <Slider
              value={hoursPerWeek}
              onValueChange={setHoursPerWeek}
              min={1}
              max={80}
              step={1}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Label>Weeks Worked per Year</Label>
              <Text variant="muted">{weeksPerYear[0]} weeks</Text>
            </div>
            <Slider
              value={weeksPerYear}
              onValueChange={setWeeksPerYear}
              min={1}
              max={52}
              step={1}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Salary Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Wallet className="h-4 w-4" />
                Annual Salary
              </Text>
              <Heading level="h3" className="text-2xl font-bold text-green-600">
                ${formatCurrency(annualSalary)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <CalendarDays className="h-4 w-4" />
                Monthly Salary
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(monthlySalary)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <CalendarRange className="h-4 w-4" />
                Weekly Salary
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(weeklySalary)}
              </Heading>
            </div>
            <div className="space-y-1">
              <Text variant="muted" className="flex items-center gap-1 text-sm">
                <Clock className="h-4 w-4" />
                Daily Salary
              </Text>
              <Heading level="h3" className="text-2xl font-bold">
                ${formatCurrency(dailySalary)}
              </Heading>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
