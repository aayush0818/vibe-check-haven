
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import DailyQuiz from "@/components/daily-check/DailyQuiz";
import QuizResults from "@/components/daily-check/QuizResults";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export type QuizAnswer = {
  questionId: number;
  answer: string;
  value: number;
};

const DailyCheck = () => {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuizComplete = (results: QuizAnswer[]) => {
    setAnswers(results);
    setIsComplete(true);
    // In a real app, you would save these results to the user's profile
    console.log("Quiz completed with results:", results);
  };

  const handleStartOver = () => {
    setAnswers([]);
    setIsComplete(false);
  };

  const handleGoToMoodTracker = () => {
    navigate('/mood-tracker');
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 max-w-4xl">
        {!isComplete ? (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">Daily Vibes Quiz</h1>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Take a moment to check in with yourself. This quick quiz helps you reflect on how you're feeling today. No pressure—just honest reflection.
            </p>
            <DailyQuiz onComplete={handleQuizComplete} />
          </>
        ) : (
          <>
            <QuizResults answers={answers} onStartOver={handleStartOver} />
            <div className="mt-8 text-center">
              <Button onClick={handleGoToMoodTracker} className="bg-teal hover:bg-teal/80">
                View Your Mood Tracker
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Your daily check-in has been saved to your mood tracker. View your progress over time.
              </p>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default DailyCheck;
