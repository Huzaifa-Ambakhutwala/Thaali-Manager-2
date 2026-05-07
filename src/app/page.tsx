import Image from "next/image";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { SignInButton } from "@/components/sign-in-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <AppShell nav="coordinator" showNav={false}>
      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-2xl border bg-card px-4 py-3 shadow-sm">
            <Image
              src="/logo.png"
              alt="Thaali Rotation Manager"
              width={44}
              height={44}
              className="h-auto w-11 rounded-xl"
              priority
              style={{ height: "auto" }}
            />
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Thaali Rotation Manager</div>
              <div className="text-xs text-muted-foreground">Zone coordinator portal</div>
            </div>
          </div>

          <PageHeader
            title="Sign in"
            description={
              <>
                Sign in with Google to manage zone members, assign rotations, and send reminders with
                confidence.
              </>
            }
          />

          <div className="flex flex-col gap-2 sm:flex-row">
            <SignInButton />
          </div>

          <div className="text-xs text-muted-foreground">
            If your email isn’t allowlisted, you’ll be redirected to{" "}
            <span className="font-medium text-foreground">/auth/error</span>.
          </div>
        </div>

        <Card className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">What you can do</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="text-sm font-medium">Members</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Keep your zone roster up to date and track active/inactive status.
              </div>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="text-sm font-medium">Rotations</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Assign dates and quickly review what’s coming up next week.
              </div>
            </div>
            <div className="rounded-xl border bg-muted/30 p-4">
              <div className="text-sm font-medium">Notifications</div>
              <div className="mt-1 text-sm text-muted-foreground">
                Send reminders with a clear audit trail and fewer surprises.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
