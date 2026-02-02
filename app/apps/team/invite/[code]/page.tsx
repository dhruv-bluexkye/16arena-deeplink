"use client";

import { useEffect } from "react";

export default function InvitePage({
  params,
}: {
  params: { code: string };
}) {
  useEffect(() => {
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.sixteenarena.app";
  }, []);

  return <p>Redirecting to Play Store...</p>;
}
