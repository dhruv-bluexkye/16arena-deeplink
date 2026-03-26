import type { Metadata } from "next";
import { headers } from "next/headers";
import Image from "next/image";
import StoreRedirectClient from "@/app/apps/_components/StoreRedirectClient";

type InvitePageProps = {
  params: Promise<{ code?: string }> | { code?: string };
};

async function resolveInviteCode(
  params: InvitePageProps["params"]
): Promise<string | undefined> {
  const resolvedParams = await Promise.resolve(params);
  const fromParams = resolvedParams.code?.trim();
  if (fromParams) return fromParams;

  // Some social crawlers can lose dynamic params; fallback to path parsing.
  const h = await headers();
  const possiblePaths = [
    h.get("next-url"),
    h.get("x-invoke-path"),
    h.get("x-matched-path"),
    h.get("x-original-url"),
  ];

  for (const path of possiblePaths) {
    if (!path) continue;
    const match = path.match(/\/apps\/team\/invite\/([^/?#]+)/i);
    if (match?.[1]) return decodeURIComponent(match[1]);
  }

  return undefined;
}

export async function generateMetadata({
  params,
}: InvitePageProps): Promise<Metadata> {
  const code = await resolveInviteCode(params);
  const title = "Join your squad on 16Arena";
  const description = code
    ? `You're invited to join a team on 16Arena. Open this invite and enter with code ${code}.`
    : "You're invited to join a team on 16Arena. Open this invite in the app to get started.";
  const image = "https://app.16arena.com/banner.jpg";
  const url = code
    ? `https://app.16arena.com/apps/team/invite/${code}`
    : "https://app.16arena.com/apps/team/invite";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "16Arena",
      type: "website",
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function InvitePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div style={{ maxWidth: "560px", textAlign: "center" }}>
        <Image
          src="/banner.jpg"
          alt="16Arena invite banner"
          width={1200}
          height={630}
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
          priority
        />
        <h1 style={{ marginTop: "16px", fontSize: "1.5rem", fontWeight: 700 }}>
          Join your squad on 16Arena
        </h1>
        <p style={{ marginTop: "8px", opacity: 0.8 }}>
          Open this invite in the app to start playing with your team.
        </p>
        <div style={{ marginTop: "12px" }}>
          <StoreRedirectClient fallbackMessage="Open this link on Android or iOS to install/open the app via stores." />
        </div>
      </div>
    </main>
  );
}
