"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock } from "lucide-react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = React.useState("");
  const [result, setResult] = React.useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalHours: number;
  } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;

    const [y, m, d] = birthDate.split("-").map(Number);
    if (!y || !m || !d) return;

    const birth = new Date(y, m - 1, d);
    const today = new Date();

    if (birth > today) {
      alert("Birth date cannot be in the future");
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const daysBetween = (from: Date, to: Date) => {
      const utcFrom = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
      const utcTo = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
      return Math.round((utcTo - utcFrom) / (1000 * 60 * 60 * 24));
    };

    const totalDays = daysBetween(birth, today);
    const totalHours = totalDays * 24;

    setResult({ years, months, days, totalDays, totalHours });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Enter Your Birth Date
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birthdate">Date of Birth</Label>
            <Input
              id="birthdate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>
          <Button onClick={calculateAge} className="w-full">
            Calculate Age
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Your Age
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Text variant="muted" className="text-sm">
                  Years
                </Text>
                <Heading level="h3" className="text-3xl font-bold">
                  {result.years}
                </Heading>
              </div>
              <div className="space-y-1">
                <Text variant="muted" className="text-sm">
                  Months
                </Text>
                <Heading level="h3" className="text-3xl font-bold">
                  {result.months}
                </Heading>
              </div>
              <div className="space-y-1">
                <Text variant="muted" className="text-sm">
                  Days
                </Text>
                <Heading level="h3" className="text-3xl font-bold">
                  {result.days}
                </Heading>
              </div>
              <div className="space-y-1">
                <Text variant="muted" className="text-sm">
                  Total Days
                </Text>
                <Heading level="h3" className="text-3xl font-bold">
                  {result.totalDays.toLocaleString()}
                </Heading>
              </div>
              <div className="space-y-1 md:col-span-2">
                <Text variant="muted" className="text-sm">
                  Total Hours
                </Text>
                <Heading level="h3" className="text-3xl font-bold">
                  {result.totalHours.toLocaleString()}
                </Heading>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
