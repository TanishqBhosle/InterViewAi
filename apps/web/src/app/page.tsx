import { Header } from "@/features/landing/components/header"
import { Hero } from "@/features/landing/components/hero"
import { SocialProof, Features, HowItWorks } from "@/features/landing/components/features"
import { ProductDemo } from "@/features/landing/components/product-demo"
import { AITechnology } from "@/features/landing/components/ai-technology"
import { Testimonials, CTA } from "@/features/landing/components/testimonials"
import { FAQ } from "@/features/landing/components/faq"
import { Footer } from "@/features/landing/components/footer"

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SocialProof />
        <Features />
        <HowItWorks />
        <ProductDemo />
        <AITechnology />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
