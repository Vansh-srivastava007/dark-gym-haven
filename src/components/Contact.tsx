import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="py-24 px-4 gradient-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl mb-4">
            GET IN TOUCH
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to start your transformation? Contact us today
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4 animate-fade-in">
              <MapPin className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Location</h3>
                <p className="text-muted-foreground">123 Fitness Boulevard<br />Downtown, CA 90210</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Phone className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Phone</h3>
                <p className="text-muted-foreground">(555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Email</h3>
                <p className="text-muted-foreground">info@bighousegym.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Clock className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-1">Hours</h3>
                <p className="text-muted-foreground">
                  Mon-Fri: 5:00 AM - 11:00 PM<br />
                  Sat-Sun: 6:00 AM - 9:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div>
              <Input
                placeholder="Your Name"
                className="bg-secondary border-border"
                required
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                className="bg-secondary border-border"
                required
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone Number"
                className="bg-secondary border-border"
              />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                className="bg-secondary border-border min-h-[150px]"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full gradient-primary glow-primary transition-smooth hover:scale-105"
            >
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
