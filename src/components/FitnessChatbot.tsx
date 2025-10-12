import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Dumbbell, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface UserData {
  goals: string | null;
  experienceLevel: string | null;
  workoutsCompleted: number;
  daysActive: number;
}

interface FitnessChatbotProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const FitnessChatbot = ({ open, onOpenChange }: FitnessChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    goals: null,
    experienceLevel: null,
    workoutsCompleted: 0,
    daysActive: 0,
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const gymData = {
    info: {
      name: "Big House Gym",
      hours: "Monday-Friday: 5:00 AM - 11:00 PM, Saturday-Sunday: 6:00 AM - 10:00 PM",
      location: "Near Mahavir Mandir, Aurangabad, Bihar",
      phone: "(555) 123-4567"
    },
    membershipTypes: [
      {
        name: "Basic",
        price: "₹999/month",
        features: ["Gym access", "Group classes", "Locker rooms"]
      },
      {
        name: "Premium",
        price: "₹1,499/month",
        features: ["All Basic features", "Personal training sessions", "Nutrition consultation"]
      },
      {
        name: "Elite",
        price: "₹2,499/month",
        features: ["All Premium features", "24/7 access", "Guest privileges"]
      }
    ],
    workoutTemplates: {
      beginner: [
        { name: "Bodyweight Squats", sets: 3, reps: "8-12", rest: "60 seconds" },
        { name: "Push-ups", sets: 3, reps: "5-10", rest: "60 seconds" },
        { name: "Plank", sets: 3, reps: "30 seconds", rest: "60 seconds" },
        { name: "Lunges", sets: 3, reps: "10 each leg", rest: "60 seconds" }
      ],
      intermediate: [
        { name: "Burpees", sets: 4, reps: "45 seconds on, 15 seconds rest", rest: "60 seconds" },
        { name: "Mountain Climbers", sets: 4, reps: "45 seconds on, 15 seconds rest", rest: "60 seconds" },
        { name: "Jump Squats", sets: 4, reps: "45 seconds on, 15 seconds rest", rest: "60 seconds" },
        { name: "High Knees", sets: 4, reps: "45 seconds on, 15 seconds rest", rest: "60 seconds" }
      ],
      advanced: [
        { name: "Barbell Squats", sets: 4, reps: "6-8", rest: "90 seconds" },
        { name: "Deadlifts", sets: 4, reps: "6-8", rest: "90 seconds" },
        { name: "Bench Press", sets: 4, reps: "8-10", rest: "90 seconds" },
        { name: "Pull-ups", sets: 3, reps: "Max reps", rest: "90 seconds" }
      ]
    },
    nutritionPlans: {
      weight_loss: {
        calories: "1500-1800",
        protein: "30%",
        carbs: "40%",
        fats: "30%",
        meals: [
          "Breakfast: Greek yogurt with berries",
          "Lunch: Grilled chicken salad",
          "Dinner: Baked salmon with vegetables"
        ]
      },
      muscle_gain: {
        calories: "2200-2800",
        protein: "35%",
        carbs: "45%",
        fats: "20%",
        meals: [
          "Breakfast: Protein smoothie with banana",
          "Lunch: Lean beef with rice",
          "Dinner: Chicken breast with quinoa"
        ]
      },
      general_health: {
        calories: "2000-2200",
        protein: "25%",
        carbs: "45%",
        fats: "30%",
        meals: [
          "Breakfast: Oatmeal with fruits and nuts",
          "Lunch: Quinoa bowl with vegetables",
          "Dinner: Grilled fish with sweet potato"
        ]
      }
    }
  };

  useEffect(() => {
    if (open && messages.length === 0) {
      displayWelcomeMessage();
    }
  }, [open]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (type: 'user' | 'bot', content: string) => {
    setMessages(prev => [...prev, { type, content, timestamp: new Date() }]);
  };

  const displayWelcomeMessage = () => {
    const welcomeContent = `
      <div class="space-y-4">
        <h3 class="text-xl font-bold text-primary">Welcome to Big House Gym! 💪</h3>
        <p>I'm your AI fitness assistant, ready to help you achieve your health and fitness goals!</p>
        <p class="font-semibold">What can I help you with today?</p>
        <ul class="space-y-2 text-sm">
          <li>🏃‍♂️ Personalized workout plans</li>
          <li>🥗 Nutrition guidance & meal plans</li>
          <li>📈 Progress tracking</li>
          <li>❓ Gym FAQ & policies</li>
          <li>💪 Exercise form & techniques</li>
        </ul>
      </div>
    `;
    addMessage('bot', welcomeContent);
  };

  const detectIntent = (message: string, keywords: string[]) => {
    return keywords.some(keyword => message.includes(keyword));
  };

  const processMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    let response = '';

    if (detectIntent(lowerMessage, ['workout', 'exercise', 'training', 'routine', 'plan'])) {
      response = handleWorkoutRequest();
    } else if (detectIntent(lowerMessage, ['nutrition', 'diet', 'meal', 'food', 'calories'])) {
      response = handleNutritionRequest();
    } else if (detectIntent(lowerMessage, ['progress', 'track', 'log', 'stats'])) {
      response = handleProgressRequest();
    } else if (detectIntent(lowerMessage, ['hours', 'location', 'membership', 'price', 'cost'])) {
      response = handleFAQRequest(lowerMessage);
    } else if (detectIntent(lowerMessage, ['form', 'technique', 'injury', 'supplement'])) {
      response = handleFitnessQA(lowerMessage);
    } else if (detectIntent(lowerMessage, ['goal', 'assess', 'level', 'beginner', 'start'])) {
      response = handleAssessment();
    } else {
      response = handleGeneralQuery();
    }

    setIsTyping(false);
    addMessage('bot', response);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    addMessage('user', inputValue);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      processMessage(inputValue);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'workout':
        message = 'I want a workout plan';
        break;
      case 'nutrition':
        message = 'I need nutrition guidance';
        break;
      case 'progress':
        message = 'Show my progress';
        break;
      case 'faq':
        message = 'Tell me about the gym';
        break;
      case 'qa':
        message = 'I have a fitness question';
        break;
    }

    addMessage('user', message);
    setIsTyping(true);
    setTimeout(() => {
      processMessage(message);
    }, 800);
  };

  const setUserGoal = (goal: string) => {
    setUserData(prev => ({ ...prev, goals: goal }));
    addMessage('user', `Set goal: ${goal.replace('_', ' ')}`);
    
    setTimeout(() => {
      const response = `
        <p>Great! I've set your goal to <strong>${goal.replace('_', ' ')}</strong>. Now, what's your current fitness experience level?</p>
      `;
      addMessage('bot', response);
    }, 500);
  };

  const setUserLevel = (level: string) => {
    setUserData(prev => ({ ...prev, experienceLevel: level }));
    addMessage('user', `Experience level: ${level}`);
    
    setTimeout(() => {
      const response = `
        <div class="space-y-3">
          <h4 class="text-lg font-bold text-primary">✅ Assessment Complete!</h4>
          <p><strong>Goal:</strong> ${userData.goals?.replace('_', ' ')}</p>
          <p><strong>Level:</strong> ${level}</p>
          <p>Perfect! I now have everything I need to create personalized recommendations for you.</p>
        </div>
      `;
      addMessage('bot', response);
    }, 500);
  };

  const handleWorkoutRequest = () => {
    if (!userData.goals || !userData.experienceLevel) {
      return handleAssessment();
    }

    const level = userData.experienceLevel as 'beginner' | 'intermediate' | 'advanced';
    const exercises = gymData.workoutTemplates[level] || gymData.workoutTemplates.beginner;

    return `
      <div class="space-y-4">
        <h4 class="text-lg font-bold text-primary">🏋️‍♂️ Your Personalized Workout Plan</h4>
        <p><strong>Goal:</strong> ${userData.goals?.replace('_', ' ')} | <strong>Level:</strong> ${userData.experienceLevel}</p>
        <ul class="space-y-3">
          ${exercises.map((ex, i) => `
            <li class="p-3 bg-muted rounded-lg">
              <div class="font-semibold">${ex.name}</div>
              <div class="text-sm text-muted-foreground">${ex.sets} sets × ${ex.reps} (Rest: ${ex.rest})</div>
            </li>
          `).join('')}
        </ul>
        <p class="text-sm text-muted-foreground">💡 Remember to warm up for 5-10 minutes before starting!</p>
      </div>
    `;
  };

  const handleNutritionRequest = () => {
    if (!userData.goals) {
      return `
        <div class="space-y-3">
          <p>I'd love to help you with nutrition guidance! First, let me understand your goals better.</p>
          <p class="font-semibold">What's your primary fitness goal?</p>
        </div>
      `;
    }

    const plan = gymData.nutritionPlans[userData.goals as keyof typeof gymData.nutritionPlans] || gymData.nutritionPlans.general_health;

    return `
      <div class="space-y-4">
        <h4 class="text-lg font-bold text-primary">🥗 Your Personalized Nutrition Plan</h4>
        <p><strong>Goal:</strong> ${userData.goals?.replace('_', ' ')}</p>
        
        <div class="grid grid-cols-2 gap-2">
          <div class="p-2 bg-muted rounded">
            <div class="text-xs text-muted-foreground">Calories</div>
            <div class="font-semibold">${plan.calories}</div>
          </div>
          <div class="p-2 bg-muted rounded">
            <div class="text-xs text-muted-foreground">Protein</div>
            <div class="font-semibold">${plan.protein}</div>
          </div>
          <div class="p-2 bg-muted rounded">
            <div class="text-xs text-muted-foreground">Carbs</div>
            <div class="font-semibold">${plan.carbs}</div>
          </div>
          <div class="p-2 bg-muted rounded">
            <div class="text-xs text-muted-foreground">Fats</div>
            <div class="font-semibold">${plan.fats}</div>
          </div>
        </div>

        <div>
          <h5 class="font-semibold mb-2">🍽️ Sample Meals:</h5>
          <ul class="space-y-1 text-sm">
            ${plan.meals.map(meal => `<li>• ${meal}</li>`).join('')}
          </ul>
        </div>

        <p class="text-sm"><strong>💡 Pro Tip:</strong> Stay hydrated - aim for 8-10 glasses of water daily!</p>
      </div>
    `;
  };

  const handleProgressRequest = () => {
    return `
      <div class="space-y-3">
        <h4 class="text-lg font-bold text-primary">📈 Your Progress Summary</h4>
        <div class="space-y-2">
          <p><strong>Workouts Completed:</strong> ${userData.workoutsCompleted}</p>
          <p><strong>Days Active:</strong> ${userData.daysActive}</p>
          <p><strong>Current Goal:</strong> ${userData.goals || 'Not set'}</p>
          <p><strong>Experience Level:</strong> ${userData.experienceLevel || 'Not assessed'}</p>
        </div>
        ${userData.workoutsCompleted > 0 ? 
          `<p class="text-primary">🎉 Great job staying consistent! You've completed ${userData.workoutsCompleted} workouts!</p>` : 
          `<p>💪 Ready to start your fitness journey? Let's get started!</p>`
        }
      </div>
    `;
  };

  const handleFAQRequest = (message: string) => {
    if (message.includes('hours') || message.includes('time') || message.includes('open')) {
      return `<p><strong>🕒 Gym Hours:</strong></p><p>${gymData.info.hours}</p>`;
    }

    if (message.includes('location') || message.includes('address') || message.includes('where')) {
      return `<p><strong>📍 Location:</strong></p><p>${gymData.info.location}</p>`;
    }

    if (message.includes('membership') || message.includes('price') || message.includes('cost')) {
      return `
        <div class="space-y-3">
          <p class="font-bold text-primary">💳 Membership Options:</p>
          ${gymData.membershipTypes.map(m => `
            <div class="p-3 bg-muted rounded-lg">
              <h4 class="font-bold text-primary">${m.name} - ${m.price}</h4>
              <ul class="text-sm space-y-1 mt-2">
                ${m.features.map(f => `<li>• ${f}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      `;
    }

    return `
      <div class="space-y-2">
        <p class="font-bold text-primary">ℹ️ Big House Gym Information:</p>
        <p><strong>Hours:</strong> ${gymData.info.hours}</p>
        <p><strong>Location:</strong> ${gymData.info.location}</p>
        <p><strong>Phone:</strong> ${gymData.info.phone}</p>
      </div>
    `;
  };

  const handleFitnessQA = (message: string) => {
    if (message.includes('form') || message.includes('technique')) {
      return `
        <div class="space-y-3">
          <p class="font-bold text-primary">💪 Exercise Form Tips:</p>
          <ul class="space-y-2 text-sm">
            <li><strong>Squats:</strong> Keep your chest up, knees behind toes</li>
            <li><strong>Push-ups:</strong> Keep body straight, hands shoulder-width apart</li>
            <li><strong>Deadlifts:</strong> Keep bar close to body, chest up</li>
            <li><strong>Planks:</strong> Maintain straight line from head to heels</li>
          </ul>
          <p class="text-sm">💡 Always warm up and focus on controlled movements!</p>
        </div>
      `;
    }

    if (message.includes('injury') || message.includes('pain')) {
      return `
        <div class="space-y-3">
          <p class="font-bold text-primary">⚠️ Injury Prevention:</p>
          <ul class="space-y-2 text-sm">
            <li><strong>Warm-up:</strong> 5-10 minutes before intense exercise</li>
            <li><strong>Rest days:</strong> 24-48 hours between intense sessions</li>
            <li><strong>Listen to your body:</strong> Stop if you feel sharp pain</li>
          </ul>
          <p class="text-sm">🩺 For persistent pain, consult a healthcare professional.</p>
        </div>
      `;
    }

    return `
      <div class="space-y-2">
        <p>I'm here to help with fitness questions! I can provide guidance on:</p>
        <ul class="text-sm space-y-1">
          <li>🏋️‍♂️ Exercise form and techniques</li>
          <li>🔄 Workout routines</li>
          <li>💊 Basic supplement information</li>
          <li>🩹 Injury prevention tips</li>
        </ul>
      </div>
    `;
  };

  const handleAssessment = () => {
    return `
      <div class="space-y-3">
        <h4 class="text-lg font-bold text-primary">🎯 Fitness Assessment</h4>
        <p>Let's create a personalized plan for you! First, what's your primary fitness goal?</p>
      </div>
    `;
  };

  const handleGeneralQuery = () => {
    return `
      <div class="space-y-2">
        <p>I'm here to help with all your fitness needs! You can ask me about:</p>
        <ul class="text-sm space-y-1">
          <li>🏃‍♂️ Workouts and training plans</li>
          <li>🥗 Nutrition and meal guidance</li>
          <li>📈 Progress tracking</li>
          <li>❓ Gym policies and information</li>
          <li>💪 Fitness techniques and tips</li>
        </ul>
      </div>
    `;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] h-[80vh] p-0 gap-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-display font-bold">AI Fitness Trainer</h2>
              <p className="text-xs text-muted-foreground">Big House Gym</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onOpenChange(false)}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 p-3 border-b border-border bg-muted/50 overflow-x-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction('workout')}
            className="whitespace-nowrap"
          >
            🏃‍♂️ Workouts
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction('nutrition')}
            className="whitespace-nowrap"
          >
            🥗 Nutrition
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction('progress')}
            className="whitespace-nowrap"
          >
            📈 Progress
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAction('faq')}
            className="whitespace-nowrap"
          >
            ❓ FAQ
          </Button>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <div
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: msg.content }}
                  />
                  {msg.type === 'bot' && (
                    <div className="mt-3 space-y-2">
                      {!userData.goals && msg.content.includes('primary fitness goal') && (
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setUserGoal('weight_loss')}
                            className="text-xs"
                          >
                            Weight Loss
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setUserGoal('muscle_gain')}
                            className="text-xs"
                          >
                            Muscle Gain
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setUserGoal('endurance')}
                            className="text-xs"
                          >
                            Endurance
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setUserGoal('general_health')}
                            className="text-xs"
                          >
                            General Health
                          </Button>
                        </div>
                      )}
                      {userData.goals && !userData.experienceLevel && msg.content.includes('experience level') && (
                        <div className="flex flex-wrap gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setUserLevel('beginner')}
                            className="text-xs"
                          >
                            Beginner
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setUserLevel('intermediate')}
                            className="text-xs"
                          >
                            Intermediate
                          </Button>
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setUserLevel('advanced')}
                            className="text-xs"
                          >
                            Advanced
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                  <span className="text-xs text-muted-foreground">AI is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your fitness question..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-primary hover:bg-primary/90"
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
