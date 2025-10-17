import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const MembershipCheckout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const plan = location.state?.plan;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-dark">
        <div className="text-center">
          <h2 className="font-display text-3xl mb-4">No plan selected</h2>
          <Link to="/">
            <Button className="gradient-primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment Successful!",
      description: `You've successfully subscribed to the ${plan.name} plan.`,
    });
    setTimeout(() => navigate("/"), 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen gradient-dark py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-smooth">
          <ArrowLeft className="h-5 w-5" />
          Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Plan Details */}
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <h2 className="font-display text-3xl mb-2">{plan.name}</h2>
              <div className="flex items-baseline justify-center">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-muted-foreground ml-2">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="font-bold text-lg mb-4">Plan Includes:</h3>
              {plan.features.map((feature: string) => (
                <div key={feature} className="flex items-center gap-3">
                  <Check className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card className="bg-card border-border">
            <CardHeader>
              <h2 className="font-display text-2xl">Complete Your Purchase</h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="bg-secondary border-border"
                    required
                  />
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary">{plan.price}</span>
                  </div>
                  <Button
                    type="submit"
                    className="w-full gradient-primary glow-primary transition-smooth hover:scale-105"
                    size="lg"
                  >
                    Complete Payment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MembershipCheckout;
