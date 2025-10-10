import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-display text-3xl mb-4 text-primary">APEX</h3>
            <p className="text-muted-foreground">
              Transform your body and mind at the most advanced fitness facility.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#programs" className="text-muted-foreground hover:text-primary transition-smooth">Programs</a></li>
              <li><a href="#pricing" className="text-muted-foreground hover:text-primary transition-smooth">Pricing</a></li>
              <li><a href="#testimonials" className="text-muted-foreground hover:text-primary transition-smooth">Testimonials</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-smooth">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">Personal Training</li>
              <li className="text-muted-foreground">Group Classes</li>
              <li className="text-muted-foreground">Nutrition Coaching</li>
              <li className="text-muted-foreground">Recovery Services</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-smooth">
                <Youtube className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 APEX Fitness. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
