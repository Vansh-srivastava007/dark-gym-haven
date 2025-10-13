import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FitnessChatbot } from "@/components/FitnessChatbot";
import Hero from "@/components/Hero";
import Programs from "@/components/Programs";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.jpeg";

const Index = () => {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Navbar logo={logo} onOpenAI={() => setChatbotOpen(true)} />
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
      <FitnessChatbot open={chatbotOpen} onOpenChange={setChatbotOpen} />
    </div>
  );
};

export default Index;
