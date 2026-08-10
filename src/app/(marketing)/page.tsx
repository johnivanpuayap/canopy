import type { Metadata } from "next";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { HeroSection } from "@/components/marketing/hero-section";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${APP_NAME} — ${APP_TAGLINE.replace(/\.$/, "")}`,
  description:
    "Canopy is a personal project tracker and idea board for developers. Track milestones and todos, store specs and design docs, and pin ideas to a mood board.",
};

export default function LandingPage(): React.ReactElement {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <FeatureGrid />
      </main>
      <SiteFooter />
    </>
  );
}
