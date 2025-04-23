
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Question, QuizOption } from "./types";

interface QuizQuestionProps {
  question: Question;
  onAnswer: (option: QuizOption) => void;
}

const QuizQuestion = ({ question, onAnswer }: QuizQuestionProps) => {
  return (
    <Card className="gradient-card border-none shadow-lg p-8 max-w-3xl mx-auto floating-card">
      <h2 className="text-2xl font-bold mb-8 text-center">{question.text}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {question.options.map((option, index) => (
          <Button
            key={index}
            className="bg-white hover:bg-teal/10 text-foreground border border-border/40 shadow-sm h-auto py-4 px-6 flex items-center gap-3 justify-start transition-all duration-300 hover:scale-105"
            onClick={() => onAnswer(option)}
          >
            <span className="text-3xl">{option.emoji}</span>
            <span>{option.text}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default QuizQuestion;
