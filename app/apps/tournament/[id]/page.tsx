import type { Metadata } from "next";
import Image from "next/image";
import StoreRedirectClient from "@/app/apps/_components/StoreRedirectClient";

type TournamentPageProps = {
  params: Promise<{ id?: string }> | { id?: string };
};

type TournamentApiResponse = {
  success?: boolean;
  data?: {
    tournamentName?: string;
    gameName?: string;
    description?: string;
    coverImage?: string;
    image?: string;
  };
};

async function fetchTournamentBySlug(slug: string) {
  const endpoint = `https://api.16arena.com/api/v1/Tournament/by-slug/${encodeURIComponent(
    slug
  )}`;

  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) return null;
    const payload = (await res.json()) as TournamentApiResponse;
    if (!payload?.success || !payload.data) return null;
    return payload.data;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: TournamentPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const tournamentSlug = resolvedParams.id?.trim();
  const tournament = tournamentSlug
    ? await fetchTournamentBySlug(tournamentSlug)
    : null;

  const tournamentName = tournament?.tournamentName?.trim();
  const gameName = tournament?.gameName?.trim();
  const title = tournamentName
    ? gameName
      ? `${tournamentName} • ${gameName} | 16Arena`
      : `${tournamentName} | 16Arena`
    : "Tournament on 16Arena";

  const description = tournament?.description?.trim()
    ? tournament.description.trim()
    : tournamentName && gameName
    ? `${tournamentName} is live on ${gameName}. Open in 16Arena to view details and join the competition.`
    : tournamentSlug
    ? `You're invited to view tournament ${tournamentSlug} on 16Arena. Open in the app to join and compete.`
    : "You're invited to a tournament on 16Arena. Open in the app to join and compete.";

  const image =
    tournament?.coverImage?.trim() ||
    tournament?.image?.trim() ||
    "https://app.16arena.com/banner.jpg";

  const url = tournamentSlug
    ? `https://app.16arena.com/apps/tournament/${tournamentSlug}`
    : "https://app.16arena.com/apps/tournament";

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

export default function TournamentPage() {
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
          alt="16Arena tournament banner"
          width={1200}
          height={630}
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
          priority
        />
        <h1 style={{ marginTop: "16px", fontSize: "1.5rem", fontWeight: 700 }}>
          Tournament invite on 16Arena
        </h1>
        <p style={{ marginTop: "8px", opacity: 0.8 }}>
          Open this tournament link in the app to view details and compete.
        </p>
        <div style={{ marginTop: "12px" }}>
          <StoreRedirectClient fallbackMessage="Open this link on Android or iOS to install/open the app via stores." />
        </div>
      </div>
    </main>
  );
}

