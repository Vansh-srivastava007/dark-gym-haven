import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-gym.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Modern gym interior with professional equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="font-display text-5xl md:text-7xl mb-6 animate-fade-in">
          UNLEASH YOUR
          <span className="block bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
            POTENTIAL
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Transform your body and mind at the most advanced fitness facility in the city
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Button
            size="lg"
            onClick={() => {
              const element = document.getElementById('pricing');
              if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="gradient-primary text-lg px-8 py-6 glow-primary hover:scale-105 transition-smooth"
          >
            Start Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              const element = document.getElementById('programs');
              if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="text-lg px-8 py-6 border-2 hover:bg-secondary transition-smooth"
          >
            View Programs
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
