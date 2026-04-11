"use client";

import Link from "next/link";
import { TreePine } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export default function LoginPage(): React.ReactElement {
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
        <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground" htmlFor="email">
                Email
              </label>
              <Input
                id="email"
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
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Button variant="primary" size="lg" className="w-full" type="submit">
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
