import * as React from "react";

import { cn } from "@/lib/utils";

function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-md bg-muted", className)} />;
}

export function KpiSkeletonRow({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-3", className)}>
      <div className="rounded-xl border bg-card p-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-3 h-8 w-16" />
        <Skeleton className="mt-2 h-3 w-40" />
      </div>
      <div className="rounded-xl border bg-card p-5">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="mt-3 h-8 w-14" />
        <Skeleton className="mt-2 h-3 w-44" />
      </div>
      <div className="rounded-xl border bg-card p-5">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-3 h-8 w-20" />
        <Skeleton className="mt-2 h-3 w-36" />
      </div>
    </div>
  );
}

