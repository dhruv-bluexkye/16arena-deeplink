"use client";

import { useEffect, useState } from "react";

export default function AppsFallbackPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const [message, setMessage] = useState<string>("Redirecting...");

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isIOS = /iPad|iPhone|iPod/i.test(ua) && !(window as any).MSStream;
    const isAndroid = /Android/i.test(ua);

    // Universal Links fallback: if the app isn't installed (or Universal Links
    // isn't associated correctly), Safari/Chrome loads this route. Redirect to
    // the correct store.
    if (isIOS) {
      window.location.href = "https://apps.apple.com/app/id6759313578";
      return;
    }

    if (isAndroid) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.sixteenarena.app";
      return;
    }

    setMessage(
      "Open this link on Android or iOS to install/open the app via stores."
    );
  }, []);

  // Keep page content for non-iOS/Android; redirects happen in `useEffect`.
  // The `slug` is not used because the fallback always goes to the store.
  void params.slug;

  return <p>{message}</p>;
}

