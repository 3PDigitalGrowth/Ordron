import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Hero } from "@/components/home/hero";
import { CostOfInaction } from "@/components/home/cost-of-inaction";
import { IcpMirror } from "@/components/home/icp-mirror";
import { FrictionSignals } from "@/components/home/friction-signals";
import { Methodology } from "@/components/home/methodology";
import { Proof } from "@/components/home/proof";
import { Platforms } from "@/components/home/platforms";
import { HealthCheck } from "@/components/home/health-check";
import { Faq } from "@/components/home/faq";
import { ClosingCta } from "@/components/home/closing-cta";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <CostOfInaction />
        <IcpMirror />
        <FrictionSignals />
        <Methodology />
        <Proof />
        <Platforms />
        <HealthCheck />
        <Faq />
        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
