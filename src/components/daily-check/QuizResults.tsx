import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { QuizAnswer } from "@/pages/DailyCheck";
import { useAuth } from "@/contexts/AuthContext";

interface QuizResultsProps {
  answers: QuizAnswer[];
  onStartOver: () => void;
}

const getMoodTitle = (score: number): { title: string; emoji: string; description: string } => {
  // Score ranges from 0-28 (7 questions with values 1-4)
  if (score >= 24) {
    return { 
      title: "Radiant Explorer", 
      emoji: "✨", 
      description: "You're in a great mental space today! Your energy and outlook are strong. A perfect time to tackle challenges or enjoy activities that bring you joy."
    };
  } else if (score >= 20) {
    return { 
      title: "Steady Sailor", 
      emoji: "⛵", 
      description: "You're feeling balanced and generally positive. You have good reserves of energy and resilience right now."
    };
  } else if (score >= 16) {
    return { 
      title: "Gentle Drifter", 
      emoji: "🍃", 
      description: "You're doing okay - not fantastic, but not bad either. A good day for self-care and manageable tasks."
    };
  } else if (score >= 12) {
    return { 
      title: "Tender Heart", 
      emoji: "💗", 
      description: "You might be feeling a bit vulnerable today. Be gentle with yourself and consider what small comforts might help."
    };
  } else if (score >= 8) {
    return { 
      title: "Soft Sad Potato", 
      emoji: "🥔", 
      description: "You're having a rough time right now, and that's okay. Focus on basic needs and don't pressure yourself today."
    };
  } else {
    return { 
      title: "Survival Mode Activated", 
      emoji: "🛡️", 
      description: "Things feel pretty tough right now. Remember that these intense feelings won't last forever. Consider reaching out for support."
    };
  }
};

const getJournalPrompt = (score: number): string => {
  if (score >= 20) {
    return "What's something that brought you joy today? How can you bring more of that into tomorrow?";
  } else if (score >= 16) {
    return "What's one small thing you can do today to maintain this balanced feeling?";
  } else if (score >= 12) {
    return "What's one thing that felt heavy today, and one thing that felt light?";
  } else {
    return "What's one tiny form of comfort you can give yourself right now?";
  }
};

const QuizResults = ({ answers, onStartOver }: QuizResultsProps) => {
  const { user } = useAuth();
  
  // Calculate total score (excluding the last question which doesn't have a numeric value)
  const scoreQuestions = answers.slice(0, 7);
  const totalScore = scoreQuestions.reduce((sum, answer) => sum + answer.value, 0);
  
  // Get the need question (last question) response
  const needAnswer = answers[7]?.answer || "Rest or sleep 🛌";
  
  const moodResult = getMoodTitle(totalScore);
  const journalPrompt = getJournalPrompt(totalScore);
  
  return (
    <div className="space-y-12 py-8 animate-fade-in">
      <div className="text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4">Your Mood Snapshot</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your answers, here's a reflection of how you're feeling today.
        </p>
        {user ? (
          <p className="text-sm text-teal mt-2 font-medium">
            ✓ Your mood data has been saved to your profile
          </p>
        ) : (
          <p className="text-sm text-lavender mt-2">
            <Link to="/sign-in" className="underline">Sign in</Link> to save your mood data and track your progress over time.
          </p>
        )}
      </div>
      
      <Card className="gradient-card border-none shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-24 h-24 rounded-full bg-lavender/30 flex items-center justify-center mx-auto mb-6">
            <span className="text-5xl">{moodResult.emoji}</span>
          </div>
          <h2 className="text-3xl font-bold mb-2">{moodResult.title}</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {moodResult.description}
          </p>
        </div>
        
        <div className="space-y-8">
          <div className="bg-white/80 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-2">You expressed that you need:</h3>
            <p className="text-lg font-semibold">{needAnswer}</p>
          </div>
          
          <div className="bg-beige/50 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-2">Journal Prompt for Today:</h3>
            <p className="text-lg font-semibold quote">{journalPrompt}</p>
          </div>
          
          <div className="bg-teal/20 rounded-xl p-6">
            <h3 className="text-lg font-medium mb-4">Suggested Next Steps:</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span>📓</span>
                </div>
                <div>
                  <p className="font-medium">Write in your journal</p>
                  <p className="text-sm text-muted-foreground">Reflect on today using the prompt above</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span>📊</span>
                </div>
                <div>
                  <p className="font-medium">Track your mood</p>
                  <p className="text-sm text-muted-foreground">See how your mood changes over time</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <span>📚</span>
                </div>
                <div>
                  <p className="font-medium">Browse resources</p>
                  <p className="text-sm text-muted-foreground">Find helpful tools based on your current needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="flex flex-col md:flex-row gap-4 justify-center max-w-3xl mx-auto">
        <Button onClick={onStartOver} variant="outline" className="btn-outline">
          Take the Quiz Again
        </Button>
        <Button className="btn-primary" asChild>
          <Link to="/journal">Go to Journal</Link>
        </Button>
        <Button className="btn-secondary" asChild>
          <Link to="/mood-tracker">View Mood Tracker</Link>
        </Button>
      </div>
    </div>
  );
};

export default QuizResults;
