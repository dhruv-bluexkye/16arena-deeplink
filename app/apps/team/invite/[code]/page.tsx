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

    if (isIOS) {
      // If universal links fail (common when the app isn't installed),
      // iOS will load this page in Safari. Send users to the App Store.
      window.location.href =
        "https://apps.apple.com/app/id6759313578";
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
