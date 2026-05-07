import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function errorBody(error: string | undefined): { title: string; description: string } {
  switch (error) {
    case "AccessDenied":
      return {
        title: "Access denied",
        description:
          "Your Google email is not allowlisted yet. Ask an administrator to add you as a coordinator (with your zone), or confirm SUPER_ADMIN_EMAIL in the server environment matches your address.",
      };
    case "Configuration":
      return {
        title: "Authentication isn’t configured",
        description:
          "Check NEXTAUTH_URL, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET, and SUPABASE_* keys (for allowlist lookup). Restart the dev server after changing .env.",
      };
    case "OAuthSignin":
    case "OAuthCallback":
    case "OAuthAccountNotLinked":
      return {
        title: "Google sign-in didn’t finish",
        description:
          "Google rejected the OAuth flow or the callback URL mismatch. Verify the authorized redirect URI in Google Cloud includes http://localhost:3000/api/auth/callback/google (and NEXTAUTH_URL is http://localhost:3000 for local dev).",
      };
    default:
      return {
        title: "We can’t sign you in",
        description:
          "Something went wrong during sign-in. If this keeps happening, check server logs or ask your administrator.",
      };
  }
}

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AuthErrorPage(props: PageProps) {
  const { error } = await props.searchParams;
  const { title, description } = errorBody(error);

  return (
    <AppShell showNav={false}>
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <PageHeader
          title={title}
          description={description}
          actions={
            <Link href="/" className={cn(buttonVariants())}>
              Back to sign in
            </Link>
          }
        />

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-base">Troubleshooting</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>Try the following:</div>
            <ul className="list-disc space-y-1 pl-5">
              <li>Make sure you’re using the correct account in Google.</li>
              <li>
                If you’re signing in from a network URL, ensure <span className="font-medium text-foreground">NEXTAUTH_URL</span>{" "}
                matches your browser URL.
              </li>
              <li>
                If this is an allowlist issue, ask an admin to add your email (and zone) in the Admin panel.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
