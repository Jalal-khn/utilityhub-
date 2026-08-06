"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Check, X } from "lucide-react";

export default function PasswordStrengthChecker() {
  const [password, setPassword] = React.useState("");
  const [strength, setStrength] = React.useState<{
    score: number;
    label: string;
    color: string;
    checks: { label: string; passed: boolean }[];
  } | null>(null);

  const checkPassword = (pwd: string) => {
    if (!pwd) {
      setStrength(null);
      return;
    }

    const checks = [
      { label: "At least 8 characters", passed: pwd.length >= 8 },
      { label: "At least 12 characters", passed: pwd.length >= 12 },
      { label: "Contains uppercase letter", passed: /[A-Z]/.test(pwd) },
      { label: "Contains lowercase letter", passed: /[a-z]/.test(pwd) },
      { label: "Contains number", passed: /[0-9]/.test(pwd) },
      { label: "Contains special character", passed: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd) },
    ];

    const passedCount = checks.filter(c => c.passed).length;
    let score = 0;
    let label = "";
    let color = "";

    if (passedCount <= 2) {
      score = 1;
      label = "Weak";
      color = "text-red-500";
    } else if (passedCount <= 4) {
      score = 2;
      label = "Fair";
      color = "text-yellow-500";
    } else if (passedCount <= 5) {
      score = 3;
      label = "Good";
      color = "text-blue-500";
    } else {
      score = 4;
      label = "Strong";
      color = "text-green-500";
    }

    setStrength({ score, label, color, checks });
  };

  React.useEffect(() => {
    checkPassword(password);
  }, [password]);

  const clearAll = () => {
    setPassword("");
    setStrength(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Password Strength Checker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password to check"
            />
          </div>

          <Button onClick={clearAll} variant="outline" className="w-full">
            Clear
          </Button>

          {strength && (
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <Text variant="muted" className="text-sm mb-2">Strength:</Text>
                <Heading className={`text-2xl font-bold ${strength.color}`}>
                  {strength.label}
                </Heading>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`h-2 flex-1 rounded ${
                        i <= strength.score
                          ? strength.color.replace("text-", "bg-")
                          : "bg-muted-foreground/20"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Text variant="muted" className="text-sm">Requirements:</Text>
                {strength.checks.map((check, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {check.passed ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-red-500" />
                    )}
                    <Text className={check.passed ? "text-green-500" : "text-red-500"}>
                      {check.label}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
