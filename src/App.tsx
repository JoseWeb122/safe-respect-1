import { MotionConfig } from "framer-motion";
import Navbar from "./components/sections/Navbar";
import Hero from "./components/sections/Hero";
import { TrustCards, Services, HowItWorks } from "./components/sections/TrustServicesHow";
import ServiceArea from "./components/sections/ServiceArea";
import { WhyChooseUs, BrandPromise, About } from "./components/sections/WhyPromiseAbout";
import TransportationForm from "./components/sections/TransportationForm";
import { Hours, Testimonials, FAQ, Contact, Footer, FloatingUI } from "./components/sections/Rest";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <Navbar />
      <main id="main" className="overflow-x-clip">
        <Hero />
        <TrustCards />
        <Services />
        <HowItWorks />
        <ServiceArea />
        <WhyChooseUs />
        <BrandPromise />
        <About />
        <TransportationForm />
        <Hours />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingUI />
    </MotionConfig>
  );
}
