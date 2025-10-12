import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Dumbbell, Sparkles } from "lucide-react";

interface AITrainerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AITrainerModal = ({ open, onOpenChange }: AITrainerModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-display">AI Trainer</DialogTitle>
          </div>
          <DialogDescription className="text-base">
            Get personalized workout recommendations and fitness guidance powered by AI.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="bg-muted p-4 rounded-lg space-y-3">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Personalized Workout Plans</h4>
                <p className="text-sm text-muted-foreground">
                  Get custom exercise routines based on your fitness level and goals.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">Nutrition Guidance</h4>
                <p className="text-sm text-muted-foreground">
                  Receive diet recommendations tailored to your fitness objectives.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm mb-1">24/7 Availability</h4>
                <p className="text-sm text-muted-foreground">
                  Ask questions anytime and get instant expert advice.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              This feature is coming soon! Join our gym to get early access.
            </p>
            <Button
              onClick={() => {
                onOpenChange(false);
                const element = document.getElementById('pricing');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 glow-primary font-semibold"
            >
              Book Free Trial
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
