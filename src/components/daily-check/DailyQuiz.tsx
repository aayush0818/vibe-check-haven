import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { QuizAnswer } from "@/pages/DailyCheck";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, moodEntriesTable } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";

type Question = {
  id: number;
  text: string;
  options: {
    text: string;
    emoji: string;
    value: number;
  }[];
};

const questions: Question[] = [
  {
    id: 1,
    text: "How's your mental weather today?",
    options: [
      { text: "Clear skies (calm, content)", emoji: "🌤️", value: 4 },
      { text: "Partly cloudy (a little off but okay)", emoji: "☁️", value: 3 },
      { text: "Thunderstorm (anxious or down)", emoji: "⛈️", value: 1 },
      { text: "Total fog (numb/confused)", emoji: "🌫️", value: 0 },
    ],
  },
  {
    id: 2,
    text: "Which vibe ruled your day?",
    options: [
      { text: "Peace mode", emoji: "🧘‍♀️", value: 4 },
      { text: "Zen-ish", emoji: "😌", value: 3 },
      { text: "Bit of everything", emoji: "🎭", value: 2 },
      { text: "Chaos mode", emoji: "🌪️", value: 1 },
    ],
  },
  {
    id: 3,
    text: "Energy level check:",
    options: [
      { text: "Rocket fuel", emoji: "🚀", value: 4 },
      { text: "Somewhere in the middle", emoji: "⚡", value: 3 },
      { text: "Meh", emoji: "🐢", value: 2 },
      { text: "Drained AF", emoji: "🔋", value: 1 },
    ],
  },
  {
    id: 4,
    text: "Sleep recently?",
    options: [
      { text: "Slept like a log", emoji: "😴", value: 4 },
      { text: "Got enough", emoji: "😊", value: 3 },
      { text: "Kept tossing", emoji: "😕", value: 2 },
      { text: "What is sleep?", emoji: "👁️", value: 1 },
    ],
  },
  {
    id: 5,
    text: "Social battery status:",
    options: [
      { text: "Fully charged", emoji: "🔋", value: 4 },
      { text: "Slightly dying", emoji: "🪫", value: 3 },
      { text: "No interactions today", emoji: "🤐", value: 2 },
      { text: "Please leave me alone", emoji: "🙅‍♀️", value: 1 },
    ],
  },
  {
    id: 6,
    text: "Did anything today lift you up?",
    options: [
      { text: "Yes, big moment!", emoji: "🎉", value: 4 },
      { text: "Yes, something small", emoji: "🌱", value: 3 },
      { text: "Not really", emoji: "😐", value: 2 },
      { text: "Quite the opposite", emoji: "👎", value: 1 },
    ],
  },
  {
    id: 7,
    text: "How are you treating yourself lately?",
    options: [
      { text: "Like royalty", emoji: "👑", value: 4 },
      { text: "Doing my best", emoji: "💪", value: 3 },
      { text: "Could be better", emoji: "🤷‍♀️", value: 2 },
      { text: "Not great", emoji: "😔", value: 1 },
    ],
  },
  {
    id: 8,
    text: "Be real: what do you need most right now?",
    options: [
      { text: "Rest or sleep", emoji: "🛌", value: 0 },
      { text: "A good laugh", emoji: "😂", value: 0 },
      { text: "Motivation", emoji: "🔥", value: 0 },
      { text: "Someone to talk to", emoji: "🗣️", value: 0 },
    ],
  },
];

interface DailyQuizProps {
  onComplete: (results: QuizAnswer[]) => void;
}

const DailyQuiz = ({ onComplete }: DailyQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
  const { user } = useAuth();
  
  const handleAnswer = async (option: { text: string; emoji: string; value: number }) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = {
      questionId: questions[currentQuestion].id,
      answer: `${option.emoji} ${option.text}`,
      value: option.value
    };
    
    setUserAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // If this is the last question and user is logged in, save mood entry
      if (user && currentQuestion === questions.length - 1) {
        await saveMoodEntry(newAnswers);
      }
      onComplete(newAnswers);
    }
  };

  const saveMoodEntry = async (answers: QuizAnswer[]) => {
    try {
      if (!user) return; // Safety check

      // Extract mood, energy, and sleep from the first three questions
      const moodValue = answers.find(a => a.questionId === 1)?.value || 3;
      const energyValue = answers.find(a => a.questionId === 3)?.value || 3;
      const sleepValue = answers.find(a => a.questionId === 4)?.value || 3;
      
      // Create notes from all the answers
      const notes = answers
        .map(a => `Q${a.questionId}: ${a.answer}`)
        .join(' | ');
      
      const { error } = await moodEntriesTable()
        .insert({
          user_id: user.id,
          mood: moodValue,
          energy: energyValue,
          sleep: sleepValue,
          notes: notes.substring(0, 500), // Limit notes length
          date: format(new Date(), 'yyyy-MM-dd') // Use formatted date for consistency
        });

      if (error) {
        console.error('Error saving daily check:', error);
        toast.error('Could not save your mood data');
      } else {
        toast.success('Your mood data has been saved!');
      }
    } catch (error) {
      console.error('Error in saveMoodEntry:', error);
      toast.error('Something went wrong while saving your mood entry');
    }
  };

  const question = questions[currentQuestion];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <span className="bg-teal/20 text-midnight px-4 py-2 rounded-full text-sm font-medium">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>
      
      <Card className="gradient-card border-none shadow-lg p-8 max-w-3xl mx-auto floating-card">
        <h2 className="text-2xl font-bold mb-8 text-center">{question.text}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <Button
              key={index}
              className="bg-white hover:bg-teal/10 text-foreground border border-border/40 shadow-sm h-auto py-4 px-6 flex items-center gap-3 justify-start transition-all duration-300 hover:scale-105"
              onClick={() => handleAnswer(option)}
            >
              <span className="text-3xl">{option.emoji}</span>
              <span>{option.text}</span>
            </Button>
          ))}
        </div>
      </Card>
      
      <div className="flex justify-between items-center max-w-3xl mx-auto mt-8">
        <Button
          variant="outline"
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="opacity-70"
        >
          Previous
        </Button>
        
        <div className="flex gap-1">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentQuestion
                  ? "bg-teal"
                  : index < currentQuestion
                  ? "bg-teal/40"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
        
        <div className="w-[80px]"></div>
      </div>
    </div>
  );
};

export default DailyQuiz;
