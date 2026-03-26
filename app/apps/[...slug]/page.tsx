import StoreRedirectClient from "@/app/apps/_components/StoreRedirectClient";

export default function AppsFallbackPage({
  params,
}: {
  params: { slug: string[] };
}) {
  // Keep page content for non-iOS/Android; redirects happen in `useEffect`.
  // The `slug` is not used because the fallback always goes to the store.
  void params.slug;

  return (
    <StoreRedirectClient fallbackMessage="Open this link on Android or iOS to install/open the app via stores." />
  );
}

