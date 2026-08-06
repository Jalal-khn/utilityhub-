"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heading, Text } from "@/components/ui/typography";
import { CalendarDays } from "lucide-react";

interface DateDiff {
  totalDays: number;
  years: number;
  months: number;
  days: number;
  weeks: number;
  hours: number;
  minutes: number;
}

function computeDiff(start: Date, end: Date): DateDiff {
  const [from, to] = start <= end ? [start, end] : [end, start];

  const daysBetween = (a: Date, b: Date) => {
    const utcA = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utcB = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.round((utcB - utcA) / (1000 * 60 * 60 * 24));
  };

  const totalDays = daysBetween(from, to);

  let years = to.getFullYear() - from.getFullYear();
  let months = to.getMonth() - from.getMonth();
  let days = to.getDate() - from.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(to.getFullYear(), to.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    totalDays,
    years,
    months,
    days,
    weeks: Math.floor(totalDays / 7),
    hours: totalDays * 24,
    minutes: totalDays * 24 * 60,
  };
}

function parseDate(value: string): Date {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function localToday(): string {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export default function DateDifferenceCalculator() {
  const [start, setStart] = React.useState(localToday);
  const [end, setEnd] = React.useState(localToday);

  const startDate = parseDate(start);
  const endDate = parseDate(end);
  const isValid = !Number.isNaN(startDate.getTime()) && !Number.isNaN(endDate.getTime());

  const diff = isValid ? computeDiff(startDate, endDate) : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Date Difference Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input id="start-date" type="date" value={start} onChange={(e) => setStart(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">End Date</Label>
            <Input id="end-date" type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {diff && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <Text variant="muted" className="text-sm">Total Days</Text>
                <Heading level="h3" className="text-3xl font-bold">{diff.totalDays.toLocaleString()}</Heading>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Text variant="muted" className="text-sm">Years / Months / Days</Text>
                <Heading level="h3" className="text-3xl font-bold">
                  {diff.years}y {diff.months}m {diff.days}d
                </Heading>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Text variant="muted" className="text-sm">Total Weeks</Text>
                <Heading level="h3" className="text-3xl font-bold">{diff.weeks.toLocaleString()}</Heading>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Text variant="muted" className="text-sm">Total Hours</Text>
                <Heading level="h3" className="text-3xl font-bold">{diff.hours.toLocaleString()}</Heading>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Text variant="muted" className="text-sm">Total Minutes</Text>
                <Heading level="h3" className="text-3xl font-bold">{diff.minutes.toLocaleString()}</Heading>
              </CardContent>
            </Card>
          </div>
          <div className="rounded-lg bg-muted/60 p-3 text-sm text-muted-foreground">
            The difference is calculated across the full range between the two dates, inclusive of both endpoints.
          </div>
        </>
      )}
    </div>
  );
}
