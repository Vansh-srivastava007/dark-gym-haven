import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Heart, Zap, Users } from "lucide-react";

const programs = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    description: "Build muscle and increase power with our cutting-edge strength programs",
  },
  {
    icon: Heart,
    title: "Cardio Conditioning",
    description: "Boost endurance and burn calories with high-intensity cardio workouts",
  },
  {
    icon: Zap,
    title: "HIIT Classes",
    description: "Maximum results in minimum time with our explosive interval training",
  },
  {
    icon: Users,
    title: "Group Training",
    description: "Stay motivated with energetic group sessions led by expert trainers",
  },
];

const Programs = () => {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl mb-4">
            OUR PROGRAMS
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Expertly designed training programs to match your fitness goals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Card
              key={program.title}
              className="bg-card border-border hover:border-primary transition-smooth group hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <program.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-smooth" />
                <h3 className="font-display text-2xl mb-3">{program.title}</h3>
                <p className="text-muted-foreground">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
