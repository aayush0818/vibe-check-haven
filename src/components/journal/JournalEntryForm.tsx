
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JournalEntry } from "@/pages/Journal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MoodOption = {
  emoji: string;
  label: string;
  value: string;
};

type JournalPrompt = {
  text: string;
  forMood?: string;
  category: string;
};

const moodOptions: MoodOption[] = [
  { emoji: "😌", label: "Calm", value: "😌 Calm" },
  { emoji: "😊", label: "Happy", value: "😊 Happy" },
  { emoji: "😐", label: "Neutral", value: "😐 Neutral" },
  { emoji: "😓", label: "Stressed", value: "😓 Stressed" },
  { emoji: "😔", label: "Sad", value: "😔 Sad" },
  { emoji: "😠", label: "Angry", value: "😠 Angry" },
  { emoji: "😴", label: "Tired", value: "😴 Tired" },
  { emoji: "🤔", label: "Reflective", value: "🤔 Reflective" }
];

const journalPrompts: JournalPrompt[] = [
  // Gratitude Prompts
  { text: "What made you smile today, no matter how small?", forMood: "😊 Happy", category: "gratitude" },
  { text: "Write about three things you're grateful for today and why.", category: "gratitude" },
  { text: "What's one thing someone did for you recently that you appreciate?", category: "gratitude" },
  { text: "What's a quality about yourself that you're thankful for?", category: "gratitude" },
  { text: "What's a simple pleasure that you enjoyed today?", category: "gratitude" },
  
  // Challenges & Growth Prompts
  { text: "What's one thing that challenged you today, and how did you handle it?", category: "challenges" },
  { text: "What's a mistake you made recently, and what did you learn from it?", category: "challenges" },
  { text: "What's something difficult you're avoiding right now? Why?", category: "challenges" },
  { text: "What would you do if you weren't afraid to fail?", category: "challenges" },
  
  // Reflection Prompts
  { text: "If your emotions today were weather, how would you describe them?", category: "reflection" },
  { text: "What's something you're looking forward to, and why?", category: "reflection" },
  { text: "How are you different today than you were a year ago?", category: "reflection" },
  { text: "What advice would you give to your younger self?", category: "reflection" },
  { text: "What patterns have you noticed in your thoughts or behavior lately?", category: "reflection" },
  
  // Achievement Prompts
  { text: "What's something you accomplished today that you're proud of?", category: "achievements" },
  { text: "What's a small victory you had recently that others might not notice?", category: "achievements" },
  { text: "What's something you're getting better at with practice?", category: "achievements" },
  
  // Self-Care Prompts
  { text: "What's one thing you can do tomorrow to take care of yourself?", category: "self-care" },
  { text: "How have you been nourishing your body, mind, and spirit lately?", category: "self-care" },
  { text: "What activities make you lose track of time in a good way?", category: "self-care" },
  { text: "What boundaries do you need to set or maintain for your wellbeing?", category: "self-care" },
  
  // Connection Prompts
  { text: "Write about a recent interaction that made you feel good.", category: "connection" },
  { text: "Who in your life makes you feel truly seen and accepted?", category: "connection" },
  { text: "What's a relationship in your life that you'd like to nurture?", category: "connection" },
  
  // Emotional Prompts
  { text: "What emotions are you carrying that need to be expressed?", forMood: "😔 Sad", category: "emotions" },
  { text: "When did you last feel truly at peace? What were the circumstances?", category: "emotions" },
  { text: "What makes you feel alive and energized?", category: "emotions" },
  
  // Stress Management Prompts
  { text: "What's causing you stress right now, and what's one small step to manage it?", forMood: "😓 Stressed", category: "stress" },
  { text: "What situations trigger anxiety for you, and how do you cope?", forMood: "😓 Stressed", category: "stress" },
  { text: "What helps you calm down when you're feeling overwhelmed?", category: "stress" },
  
  // Growth & Healing Prompts
  { text: "What do you need to forgive yourself for?", category: "forgiveness" },
  { text: "What challenging experience has helped you grow the most?", category: "forgiveness" },
  { text: "What parts of yourself are you trying to accept or make peace with?", category: "forgiveness" },
  
  // Future-Focused Prompts
  { text: "What are you looking forward to in the coming days?", category: "hope" },
  { text: "What's one small goal you'd like to achieve this week?", category: "hope" },
  { text: "What small change could make a big difference in your life right now?", category: "hope" },
  
  // Indian Cultural Context Prompts
  { text: "How do your cultural values or traditions provide you strength or comfort?", category: "cultural" },
  { text: "What wisdom from your family or culture helps you navigate difficult times?", category: "cultural" },
  { text: "How do your spiritual or religious practices support your mental wellbeing?", category: "cultural" }
];

interface JournalEntryFormProps {
  onSave: (entry: Omit<JournalEntry, "id" | "date">) => void;
  onCancel: () => void;
}

const JournalEntryForm = ({ onSave, onCancel }: JournalEntryFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string>("");
  const [tagsInput, setTagsInput] = useState("");
  const [promptCategory, setPromptCategory] = useState("all");
  
  const getFilteredPrompts = () => {
    if (promptCategory === "all") {
      return journalPrompts;
    }
    
    if (promptCategory === "mood-based" && mood) {
      return journalPrompts.filter(prompt => 
        prompt.forMood === mood || !prompt.forMood);
    }
    
    return journalPrompts.filter(prompt => 
      prompt.category === promptCategory);
  };
  
  const usePrompt = (promptText: string) => {
    if (!title) {
      // Generate a title from the prompt
      const shortenedTitle = promptText.split(" ").slice(0, 5).join(" ") + "...";
      setTitle(shortenedTitle);
    }
    
    setContent(currentContent => {
      const promptPrefix = `${promptText}\n\nMy thoughts:\n`;
      if (currentContent) {
        return `${promptPrefix}\n${currentContent}`;
      }
      return promptPrefix;
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create tags array from comma-separated tags input
    const tags = tagsInput
      .split(",")
      .map(tag => tag.trim())
      .filter(tag => tag !== "");
    
    onSave({
      title,
      content,
      mood,
      tags
    });
  };

  return (
    <Card className="p-6 border-lavender/20 shadow-lg bg-gradient-to-br from-lavender/10 to-teal/10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <Input
            id="title"
            placeholder="Give your entry a title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border-lavender/20 focus-visible:ring-lavender bg-white/80"
          />
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium">
              Journal Prompts
            </label>
            <Tabs 
              defaultValue="all" 
              value={promptCategory} 
              onValueChange={setPromptCategory} 
              className="w-full max-w-xs"
            >
              <TabsList className="grid grid-cols-4 bg-lavender/10">
                <TabsTrigger value="all" className="text-xs data-[state=active]:bg-lavender data-[state=active]:text-white">All</TabsTrigger>
                <TabsTrigger value="mood-based" className="text-xs data-[state=active]:bg-lavender data-[state=active]:text-white">For My Mood</TabsTrigger>
                <TabsTrigger value="gratitude" className="text-xs data-[state=active]:bg-lavender data-[state=active]:text-white">Gratitude</TabsTrigger>
                <TabsTrigger value="reflection" className="text-xs data-[state=active]:bg-lavender data-[state=active]:text-white">Reflection</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="max-h-32 overflow-y-auto bg-white/80 rounded-md p-2 space-y-2 scrollbar-thumb-lavender scrollbar-thin">
            {getFilteredPrompts().map((prompt, index) => (
              <div 
                key={index}
                className="text-sm p-2 border border-lavender/20 rounded hover:bg-lavender/10 cursor-pointer transition-colors"
                onClick={() => usePrompt(prompt.text)}
              >
                {prompt.text}
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1">
            What's on your mind?
          </label>
          <Textarea
            id="content"
            placeholder="Write your thoughts here..."
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="border-lavender/20 focus-visible:ring-lavender bg-white/80 resize-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-3">
            How are you feeling?
          </label>
          <div className="flex flex-wrap gap-2">
            {moodOptions.map((option) => (
              <Button
                key={option.value}
                type="button"
                variant={mood === option.value ? "default" : "outline"}
                className={`flex items-center gap-2 ${
                  mood === option.value
                    ? "bg-lavender text-white hover:bg-lavender/90"
                    : "bg-white/80 hover:bg-lavender/10 border-lavender/20"
                }`}
                onClick={() => setMood(option.value)}
              >
                <span>{option.emoji}</span>
                <span>{option.label}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            Tags (comma separated)
          </label>
          <Input
            id="tags"
            placeholder="e.g., work, reflection, gratitude"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="border-lavender/20 focus-visible:ring-lavender bg-white/80"
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel} className="border-lavender/30 text-lavender hover:bg-lavender/5">
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="bg-lavender hover:bg-lavender/90 text-white"
            disabled={!title || !content || !mood}
          >
            Save Entry
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default JournalEntryForm;
