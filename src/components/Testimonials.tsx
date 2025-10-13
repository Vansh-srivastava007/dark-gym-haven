import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Member since 2023",
    content: "Big House Gym transformed my life. Lost 30lbs and gained incredible strength. The trainers are world-class!",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Member since 2022",
    content: "Best gym I've ever been to. Equipment is top-notch and the community is incredibly supportive.",
    rating: 5,
  },
  {
    name: "Emily Chen",
    role: "Member since 2023",
    content: "The HIIT classes are intense but amazing. I've seen results faster than I ever imagined possible.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl mb-4">
            SUCCESS STORIES
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real transformations from real members
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="bg-card border-border hover:border-primary transition-smooth hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6 text-lg italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
