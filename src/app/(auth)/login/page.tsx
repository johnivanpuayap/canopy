"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { TreePine } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { signIn } from "@/lib/actions/auth";

export default function LoginPage(): React.ReactElement {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-center gap-2 pb-4 pt-6">
        <TreePine className="h-10 w-10 text-primary" />
        <h1 className="font-heading text-2xl font-bold text-primary">
          {APP_NAME}
        </h1>
        <p className="text-sm text-muted-foreground">{APP_TAGLINE}</p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            {error && <p className="text-sm text-destructive">{error}</p>}

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              type="submit"
              disabled={isPending}
            >
              Sign in
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className="justify-center pb-6 pt-0">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-secondary font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
