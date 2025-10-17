import { useState, useEffect } from "react";
import { Menu, X, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavLink {
  label: string;
  href: string;
}

interface NavbarProps {
  logo?: string;
  links?: NavLink[];
  onOpenAI?: () => void;
}

const defaultLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Membership", href: "#pricing" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact Us", href: "#contact" },
];

export const Navbar = ({ logo, links = defaultLinks, onOpenAI }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = links.map(link => link.href.replace('#', ''));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  const handleNavClick = (href: string, label: string) => {
    // Analytics event
    if (window.gtag) {
      window.gtag('event', 'nav_click', {
        link_text: label,
        link_url: href,
      });
    }
    
    const element = document.getElementById(href.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  const handleJoinClick = () => {
    // Analytics event
    if (window.gtag) {
      window.gtag('event', 'cta_join_click', {
        button_location: 'navbar',
      });
    }
    
    const element = document.getElementById('pricing');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleAIClick = () => {
    // Analytics event
    if (window.gtag) {
      window.gtag('event', 'ai_open', {
        trigger_location: 'navbar',
      });
    }
    
    onOpenAI?.();
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-elevated"
            : "bg-transparent"
        }`}
      >
        <nav
          className="container mx-auto px-4 py-4"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#home", "Logo")}
              className="flex flex-col items-start focus:outline-none focus:ring-2 focus:ring-primary rounded-lg transition-smooth hover:opacity-80"
              aria-label="Big House Gym - Go to home"
            >
              <div className="flex items-center gap-2">
                {logo && <img src={logo} alt="Big House Gym" className="h-10 w-auto" />}
                {!logo && <Dumbbell className="h-8 w-8 text-primary" aria-hidden="true" />}
                <span className="text-2xl font-display font-bold text-foreground">
                  Big House Gym
                </span>
              </div>
              <span className="text-xs text-muted-foreground mt-1 hidden md:block">
                Near Mahavir Mandir, Aurangabad, Bihar
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-6" role="menubar">
                {links.map((link) => {
                  const isActive = activeSection === link.href.replace('#', '');
                  return (
                    <li key={link.href} role="none">
                      <button
                        onClick={() => handleNavClick(link.href, link.label)}
                        className={`text-sm font-medium transition-smooth relative py-2 focus:outline-none focus:ring-2 focus:ring-primary rounded ${
                          isActive
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                        }`}
                        role="menuitem"
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                        {isActive && (
                          <span
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-3">
                <Button
                  onClick={handleAIClick}
                  variant="outline"
                  className="rounded-xl border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  aria-label="Talk to AI Trainer"
                >
                  AI Trainer
                </Button>
                <Button
                  onClick={handleJoinClick}
                  className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold"
                  aria-label="Join Big House Gym now"
                >
                  Join Now
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            <div className="flex items-center gap-3 lg:hidden">
              <Button
                onClick={handleAIClick}
                variant="outline"
                size="sm"
                className="rounded-xl border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                aria-label="Talk to AI Trainer"
              >
                AI Trainer
              </Button>
              
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground"
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                  >
                    {isOpen ? (
                      <X className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Menu className="h-6 w-6" aria-hidden="true" />
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] bg-card"
                  id="mobile-menu"
                >
                  <div className="flex flex-col gap-6 mt-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-display font-bold text-foreground">
                        Big House Gym
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Near Mahavir Mandir, Aurangabad, Bihar
                      </span>
                    </div>

                    <nav className="flex flex-col gap-2" role="menu">
                      {links.map((link) => {
                        const isActive = activeSection === link.href.replace('#', '');
                        return (
                          <button
                            key={link.href}
                            onClick={() => handleNavClick(link.href, link.label)}
                            className={`text-left px-4 py-3 rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-primary ${
                              isActive
                                ? "bg-primary text-primary-foreground font-semibold"
                                : "text-foreground hover:bg-muted"
                            }`}
                            role="menuitem"
                            aria-current={isActive ? "page" : undefined}
                          >
                            {link.label}
                          </button>
                        );
                      })}
                    </nav>

                    <div className="flex flex-col gap-3 pt-4 border-t border-border">
                      <Button
                        onClick={handleJoinClick}
                        className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold"
                        aria-label="Join Big House Gym now"
                      >
                        Join Now
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl"
                        asChild
                      >
                        <a href="tel:+919876543210" aria-label="Call Big House Gym">
                          Call Now
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl"
                        asChild
                      >
                        <a
                          href="https://wa.me/919876543210"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp Big House Gym"
                        >
                          WhatsApp
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full rounded-xl"
                        asChild
                      >
                        <a
                          href="https://maps.google.com/?q=Near+Mahavir+Mandir+Aurangabad+Bihar"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Get directions to Big House Gym"
                        >
                          Get Directions
                        </a>
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      {/* Floating AI Trainer Button */}
      <button
        onClick={handleAIClick}
        className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full p-4 shadow-lg glow-primary hover:scale-110 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
        aria-label="Open AI Trainer chat"
      >
        <Dumbbell className="h-6 w-6" aria-hidden="true" />
      </button>
    </>
  );
};

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
