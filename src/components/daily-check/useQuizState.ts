
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase, moodEntriesTable } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { QuizAnswer } from "./types";
import { questions } from "./quizQuestions";

export const useQuizState = (onComplete: (results: QuizAnswer[]) => void) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<QuizAnswer[]>([]);
  const { user } = useAuth();

  const saveMoodEntry = async (answers: QuizAnswer[]) => {
    try {
      if (!user) {
        toast.error('Please sign in to save your mood data');
        return;
      }

      const moodValue = answers.find(a => a.questionId === 1)?.value || 3;
      const energyValue = answers.find(a => a.questionId === 3)?.value || 3;
      const sleepValue = answers.find(a => a.questionId === 4)?.value || 3;
      
      const notes = answers
        .map(a => `Q${a.questionId}: ${a.answer}`)
        .join(' | ');

      const todayDate = format(new Date(), 'yyyy-MM-dd');
      
      const { data: existingEntry } = await moodEntriesTable()
        .select('id')
        .eq('user_id', user.id)
        .eq('date', todayDate)
        .maybeSingle();

      if (existingEntry) {
        const { error: updateError } = await moodEntriesTable()
          .update({
            mood: moodValue,
            energy: energyValue,
            sleep: sleepValue,
            notes: notes.substring(0, 500)
          })
          .eq('id', existingEntry.id);

        if (updateError) {
          console.error('Error updating mood entry:', updateError);
          toast.error('Could not update your mood data');
          return;
        }
        toast.success('Your mood data has been updated!');
      } else {
        const { error: insertError } = await moodEntriesTable()
          .insert({
            user_id: user.id,
            mood: moodValue,
            energy: energyValue,
            sleep: sleepValue,
            notes: notes.substring(0, 500),
            date: todayDate
          });

        if (insertError) {
          console.error('Error saving mood entry:', insertError);
          toast.error('Could not save your mood data');
          return;
        }
        toast.success('Your mood data has been saved!');
      }
    } catch (error) {
      console.error('Error in saveMoodEntry:', error);
      toast.error('Something went wrong while saving your mood entry');
    }
  };

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
      if (user && currentQuestion === questions.length - 1) {
        await saveMoodEntry(newAnswers);
      }
      onComplete(newAnswers);
    }
  };

  return {
    currentQuestion,
    userAnswers,
    handleAnswer
  };
};
