
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JournalEntry } from "@/pages/Journal";

type MoodOption = {
  emoji: string;
  label: string;
  value: string;
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

interface JournalEntryFormProps {
  onSave: (entry: Omit<JournalEntry, "id" | "date">) => void;
  onCancel: () => void;
}

const JournalEntryForm = ({ onSave, onCancel }: JournalEntryFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState<string>("");
  const [tagsInput, setTagsInput] = useState("");
  
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
