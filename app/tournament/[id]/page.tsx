import type { Metadata } from "next";
import Image from "next/image";
import StoreRedirectClient from "@/app/apps/_components/StoreRedirectClient";

type TournamentPageProps = {
  params: Promise<{ id?: string }> | { id?: string };
};

export async function generateMetadata({
  params,
}: TournamentPageProps): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const tournamentId = resolvedParams.id?.trim();
  const title = "Tournament on 16Arena";
  const description = tournamentId
    ? `You're invited to view tournament ${tournamentId} on 16Arena. Open in the app to join and compete.`
    : "You're invited to a tournament on 16Arena. Open in the app to join and compete.";
  const image = "https://app.16arena.com/banner.jpg";
  const url = tournamentId
    ? `https://app.16arena.com/tournament/${tournamentId}`
    : "https://app.16arena.com/tournament";

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

