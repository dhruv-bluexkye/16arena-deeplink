"use client";

import { useEffect } from "react";

export default function InvitePage({ params }) {
  const inviteCode = params.code;

  useEffect(() => {
    // redirect to Play Store
    window.location.href =
      "https://play.google.com/store/apps/details?id=com.sixteenarena.app";
  }, []);

  return <p>Opening app... If not installed, redirecting to Play Store.</p>;
}
