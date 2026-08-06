"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Copy, RefreshCw, Key } from "lucide-react";

export default function PasswordGenerator() {
  const [password, setPassword] = React.useState("");
  const [length, setLength] = React.useState([16]);
  const [includeUppercase, setIncludeUppercase] = React.useState(true);
  const [includeLowercase, setIncludeLowercase] = React.useState(true);
  const [includeNumbers, setIncludeNumbers] = React.useState(true);
  const [includeSymbols, setIncludeSymbols] = React.useState(true);
  const [copied, setCopied] = React.useState(false);

  const randomInt = (maxExclusive: number) => {
    const range = maxExclusive;
    const values = new Uint32Array(1);
    do {
      crypto.getRandomValues(values);
    } while (values[0] >= Math.floor(0x100000000 / range) * range);
    return values[0] % range;
  };

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const selectedSets: string[] = [];
    if (includeUppercase) selectedSets.push(uppercase);
    if (includeLowercase) selectedSets.push(lowercase);
    if (includeNumbers) selectedSets.push(numbers);
    if (includeSymbols) selectedSets.push(symbols);

    if (selectedSets.length === 0) {
      setPassword("Select at least one character type");
      return;
    }

    const charset = selectedSets.join("");
    const chars: string[] = [];

    for (let i = 0; i < length[0]; i++) {
      if (i < selectedSets.length) {
        const set = selectedSets[i];
        chars.push(set[randomInt(set.length)]);
      } else {
        chars.push(charset[randomInt(charset.length)]);
      }
    }

    for (let i = chars.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    setPassword(chars.join(""));
  };

  const copyToClipboard = () => {
    if (password && !password.includes("Select")) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  React.useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between gap-2">
              <Heading className="text-xl font-mono break-all">{password}</Heading>
              <div className="flex gap-2">
                <Button onClick={generatePassword} variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
                <Button onClick={copyToClipboard} variant="outline" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {copied && <Text className="text-xs text-green-500">Copied!</Text>}
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Password Length</Label>
                <Text variant="muted">{length[0]}</Text>
              </div>
              <Slider
                value={length}
                onValueChange={setLength}
                min={8}
                max={64}
                step={1}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={(checked) => setIncludeUppercase(checked === true)}
                />
                <label htmlFor="uppercase" className="cursor-pointer">Include Uppercase (A-Z)</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={(checked) => setIncludeLowercase(checked === true)}
                />
                <label htmlFor="lowercase" className="cursor-pointer">Include Lowercase (a-z)</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={(checked) => setIncludeNumbers(checked === true)}
                />
                <label htmlFor="numbers" className="cursor-pointer">Include Numbers (0-9)</label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={(checked) => setIncludeSymbols(checked === true)}
                />
                <label htmlFor="symbols" className="cursor-pointer">Include Symbols (!@#$%^&*)</label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
