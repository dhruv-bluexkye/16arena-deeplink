"use client";

import { useEffect, useState } from "react";

const IOS_STORE_URL = "https://apps.apple.com/app/id6759313578";
const ANDROID_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.sixteenarena.app";

type StoreRedirectClientProps = {
  fallbackMessage: string;
};

export default function StoreRedirectClient({
  fallbackMessage,
}: StoreRedirectClientProps) {
  const [message, setMessage] = useState<string>("Redirecting...");

  useEffect(() => {
    const ua = navigator.userAgent || "";
    const isIOS = /iPad|iPhone|iPod/i.test(ua) && !(window as any).MSStream;
    const isAndroid = /Android/i.test(ua);

    if (isIOS) {
      window.location.href = IOS_STORE_URL;
      return;
    }

    if (isAndroid) {
      window.location.href = ANDROID_STORE_URL;
      return;
    }

    setMessage(fallbackMessage);
  }, [fallbackMessage]);

  return <p>{message}</p>;
}

