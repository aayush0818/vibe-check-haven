
import { Button } from "@/components/ui/button";
import { questions } from "./quizQuestions";

interface QuizProgressProps {
  currentQuestion: number;
  onPrevious: () => void;
}

const QuizProgress = ({ currentQuestion, onPrevious }: QuizProgressProps) => {
  return (
    <div className="flex justify-between items-center max-w-3xl mx-auto mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
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
  );
};

export default QuizProgress;
