
import { questions } from "./quizQuestions";
import { QuizAnswer } from "./types";
import { useQuizState } from "./useQuizState";
import QuizProgress from "./QuizProgress";
import QuizQuestion from "./QuizQuestion";

interface DailyQuizProps {
  onComplete: (results: QuizAnswer[]) => void;
}

const DailyQuiz = ({ onComplete }: DailyQuizProps) => {
  const { currentQuestion, handleAnswer } = useQuizState(onComplete);
  
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <span className="bg-teal/20 text-midnight px-4 py-2 rounded-full text-sm font-medium">
          Question {currentQuestion + 1} of {questions.length}
        </span>
      </div>
      
      <QuizQuestion
        question={questions[currentQuestion]}
        onAnswer={handleAnswer}
      />
      
      <QuizProgress
        currentQuestion={currentQuestion}
        onPrevious={() => currentQuestion > 0 && handleAnswer(questions[currentQuestion - 1].options[0])}
      />
    </div>
  );
};

export default DailyQuiz;
