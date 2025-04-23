
export type QuizOption = {
  text: string;
  emoji: string;
  value: number;
};

export type Question = {
  id: number;
  text: string;
  options: QuizOption[];
};

export type QuizAnswer = {
  questionId: number;
  answer: string;
  value: number;
};
