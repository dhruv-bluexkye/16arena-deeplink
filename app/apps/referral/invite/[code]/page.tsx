import type { Metadata } from "next";
import Image from "next/image";
import StoreRedirectClient from "@/app/apps/_components/StoreRedirectClient";

export async function generateMetadata(): Promise<Metadata> {
  const title = "You've got a 16Arena referral invite";
  const description =
    "Join 16Arena and start earning rewards with your friends.";
  const image = "https://app.16arena.com/banner.jpg";
  const url = "https://app.16arena.com/apps/referral/invite";

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

export default function ReferralInvitePage() {
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
          alt="16Arena referral invite banner"
          width={1200}
          height={630}
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
          priority
        />
        <h1 style={{ marginTop: "16px", fontSize: "1.5rem", fontWeight: 700 }}>
          Join 16Arena with your referral code
        </h1>
        <p style={{ marginTop: "8px", opacity: 0.8 }}>
          Install the app and continue to claim your referral benefits.
        </p>
        <div style={{ marginTop: "12px" }}>
          <StoreRedirectClient fallbackMessage="Open this link on Android or iOS to install/open the app via stores." />
        </div>
      </div>
    </main>
  );
}

