"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ reset }: ErrorPageProps): React.ReactElement {
  return (
    <div className="flex items-center justify-center py-16">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Something went wrong</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Something went wrong loading this page. If you&apos;re developing
            locally, check that the Supabase stack is running (
            <code className="text-foreground">npm run db:start</code>).
          </p>
          <Button className="mt-4" onClick={reset}>
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
