import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AITrainerModal } from "@/components/AITrainerModal";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const [aiModalOpen, setAiModalOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar onOpenAI={() => setAiModalOpen(true)} />
      <div id="home">
        <Hero />
      </div>
      <div id="programs">
        <Programs />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
      <Testimonials />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
      <AITrainerModal open={aiModalOpen} onOpenChange={setAiModalOpen} />
    </div>
  );
};

export default Index;
