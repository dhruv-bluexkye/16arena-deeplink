"use client";

import { useEffect, useState } from "react";

export default function InvitePage({
  params,
}: {
  params: { code: string };
}) {
  const [message, setMessage] = useState<string>("Redirecting...");

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isIOS =
      /iPad|iPhone|iPod/i.test(ua) && !(window as any).MSStream;
    const isAndroid = /Android/i.test(ua);

    // If universal links fail on iOS, users will fall back to this page in Safari.
    // We avoid sending iOS straight to the Play Store to make debugging possible.
    if (isIOS) {
      setMessage(
        "If you have the app installed, the universal link should open it. Please ensure Associated Domains is set for this app, then try again."
      );
      return;
    }

    if (isAndroid) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.sixteenarena.app";
      return;
    }

    setMessage(
      "Open this link on Android to install/open the app, or on iOS to open the app via Universal Links."
    );
  }, []);

  return <p>{message}</p>;
}
