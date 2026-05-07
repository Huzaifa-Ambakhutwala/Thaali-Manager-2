import * as React from "react";

import { cn } from "@/lib/utils";

export function EmptyState({
  title,
  description,
  action,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border bg-card px-6 py-10 text-center",
        className,
      )}
    >
      <div className="text-base font-semibold">{title}</div>
      {description ? (
        <div className="mt-1 max-w-md text-sm text-muted-foreground">{description}</div>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}

