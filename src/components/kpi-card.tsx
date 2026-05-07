import * as React from "react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  label,
  value,
  helper,
  className,
}: {
  label: string;
  value: React.ReactNode;
  helper?: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-3">
        <div className="text-sm font-medium text-muted-foreground">{label}</div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="text-3xl font-semibold leading-none tabular-nums">{value}</div>
        {helper ? <div className="text-xs text-muted-foreground">{helper}</div> : null}
      </CardContent>
    </Card>
  );
}

