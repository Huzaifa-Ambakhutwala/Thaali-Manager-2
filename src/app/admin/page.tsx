import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/authz";
import { getAdminSummary } from "@/lib/data/admin";
import { SupabaseAdminNotConfiguredError } from "@/lib/supabase/admin";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { session } = await requireAdmin();
  let summary: Awaited<ReturnType<typeof getAdminSummary>> | null = null;
  let needsSupabaseConfig = false;
  try {
    summary = await getAdminSummary();
  } catch (err) {
    if (err instanceof SupabaseAdminNotConfiguredError) needsSupabaseConfig = true;
    else throw err;
  }

  return (
    <AppShell title="Admin" nav="admin">
      <PageHeader
        title="Super Admin"
        description={
          <>
            Signed in as <span className="font-medium text-foreground">{session.user.email}</span>
          </>
        }
        actions={<Badge variant="secondary">Admin</Badge>}
      />

      {needsSupabaseConfig ? (
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Finish setup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              The Admin dashboard needs Supabase admin credentials to read zones/coordinators/members.
            </p>
            <div className="rounded-xl border bg-muted/30 p-3 font-mono text-xs">
              <div>SUPABASE_URL=...</div>
              <div>SUPABASE_SERVICE_ROLE_KEY=...</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Add them to <span className="font-medium text-foreground">.env.local</span> and restart the dev
              server.
            </p>
            <Link href="/" className={cn(buttonVariants({ variant: "secondary" }))}>
              Back to home
            </Link>
          </CardContent>
        </Card>
      ) : summary ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <KpiCard label="Zones" value={summary.zones} />
          <KpiCard label="Coordinators" value={summary.coordinators} />
          <KpiCard label="Members" value={summary.members} />
        </div>
      ) : null}
    </AppShell>
  );
}

