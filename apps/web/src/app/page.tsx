import { Header } from "@/features/landing/components/header";
import { Hero } from "@/features/landing/components/hero";
import { Features, HowItWorks } from "@/features/landing/components/features";
import { Pricing } from "@/features/landing/components/pricing";
import { Testimonials, CTA } from "@/features/landing/components/testimonials";
import { Footer } from "@/features/landing/components/footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
