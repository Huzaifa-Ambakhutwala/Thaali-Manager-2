import { format } from "date-fns";

import { AppShell } from "@/components/app-shell";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { requireCoordinator } from "@/lib/authz";
import { getZone, getZoneSummary } from "@/lib/data/coordinator";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { zoneId, session } = await requireCoordinator();
  const [zone, summary] = await Promise.all([getZone(zoneId), getZoneSummary(zoneId)]);

  return (
    <AppShell title="Dashboard" nav="coordinator">
      <PageHeader
        title={`Welcome, ${session.user.name ?? "Coordinator"}`}
        description={
          <>
            Zone <Badge variant="secondary">{zone.name}</Badge> · Delivery address{" "}
            <span className="text-foreground">{zone.delivery_address}</span>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <KpiCard
          label="Total members"
          value={summary.memberCount}
          helper="Manage active/inactive members in Zone Members."
        />
        <KpiCard
          label="Upcoming assignments"
          value={summary.upcomingAssignments.length}
          helper="Next 7 days"
        />
        <KpiCard label="Zone" value={zone.name} helper="Your current coordinator zone" />
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Upcoming assignments (7 days)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {summary.upcomingAssignments.length ? (
            summary.upcomingAssignments.slice(0, 8).map((a) => {
              const m = Array.isArray(a.member) ? a.member[0] : a.member;
              return (
                <div key={a.id} className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{m?.name ?? "Member"}</div>
                    <div className="truncate text-xs text-muted-foreground">{m?.email}</div>
                  </div>
                  <div className="text-sm tabular-nums text-muted-foreground">
                    {format(new Date(a.assigned_date), "EEE, MMM d")}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-sm text-muted-foreground">No upcoming assignments yet.</p>
          )}
          <Separator />
          <p className="text-xs text-muted-foreground">
            Tip: use Rotations to assign dates, then send reminders when needed.
          </p>
        </CardContent>
      </Card>
    </AppShell>
  );
}

