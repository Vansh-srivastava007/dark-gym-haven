import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";

const plans = [
  {
    name: "MONTHLY",
    price: "₹1,000",
    period: "/month",
    features: [
      "Access to gym floor",
      "Cardio equipment",
      "Basic weight training",
      "Locker room access",
      "Group classes",
    ],
    popular: false,
  },
  {
    name: "6 MONTHS",
    price: "₹5,000",
    period: "for 6 months",
    features: [
      "All Monthly features",
      "Personal training session",
      "Nutrition consultation",
      "Sauna & steam room",
      "Priority booking",
    ],
    popular: true,
  },
  {
    name: "YEARLY",
    price: "₹9,000",
    period: "/year",
    features: [
      "All 6 Months features",
      "Weekly personal training",
      "Custom meal plans",
      "Recovery services",
      "Guest passes",
      "Best value plan",
    ],
    popular: false,
  },
];

const Pricing = () => {
  return (
    <section className="py-24 px-4 gradient-dark">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl mb-4">
            MEMBERSHIP PLANS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to reach your fitness goals
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`bg-card border-border relative overflow-hidden transition-smooth hover:scale-105 animate-fade-in ${
                plan.popular ? "border-primary border-2 glow-primary" : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 gradient-primary text-white px-4 py-1 text-sm font-bold">
                  POPULAR
                </div>
              )}
              <CardHeader className="text-center pt-8">
                <h3 className="font-display text-3xl mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-5xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground ml-2">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 py-8">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </CardContent>
              <CardFooter className="pb-8">
                <Button
                  className={`w-full transition-smooth ${
                    plan.popular
                      ? "gradient-primary glow-primary"
                      : "bg-secondary hover:bg-secondary/80"
                  }`}
                  size="lg"
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
