
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
  { text: "What made you smile today, no matter how small?", forMood: "😊 Happy", category: "gratitude" },
  { text: "Write about three things you're grateful for today and why.", category: "gratitude" },
  { text: "What's one thing that challenged you today, and how did you handle it?", category: "challenges" },
  { text: "If your emotions today were weather, how would you describe them?", category: "reflection" },
  { text: "What's something you accomplished today that you're proud of?", category: "achievements" },
  { text: "What's one thing you can do tomorrow to take care of yourself?", category: "self-care" },
  { text: "Write about a recent interaction that made you feel good.", category: "connection" },
  { text: "What boundaries do you need to set or maintain for your wellbeing?", category: "boundaries" },
  { text: "What emotions are you carrying that need to be expressed?", forMood: "😔 Sad", category: "emotions" },
  { text: "What's causing you stress right now, and what's one small step to manage it?", forMood: "😓 Stressed", category: "stress" },
  { text: "What do you need to forgive yourself for?", category: "forgiveness" },
  { text: "What are you looking forward to in the coming days?", category: "hope" }
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
    <Card className="gradient-teal border-none shadow-lg p-6">
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
            className="bg-white/80"
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
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="mood-based">For My Mood</TabsTrigger>
                <TabsTrigger value="gratitude">Gratitude</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="max-h-32 overflow-y-auto bg-white/80 rounded-md p-2 space-y-2">
            {getFilteredPrompts().map((prompt, index) => (
              <div 
                key={index}
                className="text-sm p-2 border border-teal/20 rounded hover:bg-teal/10 cursor-pointer"
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
            className="bg-white/80 resize-none"
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
                    ? "bg-teal text-midnight hover:bg-teal/90"
                    : "bg-white/80 hover:bg-teal/10"
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
            className="bg-white/80"
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button 
            type="submit" 
            className="btn-primary"
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
