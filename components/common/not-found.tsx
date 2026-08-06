import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { FileQuestion, Home } from "lucide-react";

export function NotFound() {
  return (
    <Container className="py-20">
      <Card className="max-w-md mx-auto text-center">
        <CardHeader>
          <FileQuestion className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-semibold leading-none tracking-tight mb-2">
            Page Not Found
          </h1>
          <CardDescription>
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Go to Home
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/tools">Browse All Tools</Link>
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
