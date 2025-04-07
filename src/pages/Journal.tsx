
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import JournalEntryForm from "@/components/journal/JournalEntryForm";
import JournalEntryList from "@/components/journal/JournalEntryList";

export type JournalEntry = {
  id: string;
  title: string;
  content: string;
  mood: string;
  date: Date;
  tags: string[];
};

const Journal = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: "1",
      title: "Finding peace in small moments",
      content: "Today I took a few minutes to just sit outside and listen to the birds. It's amazing how such a small thing can change your perspective on the whole day. I've been rushing so much lately that I forgot what it feels like to just be still.",
      mood: "😌 Calm",
      date: new Date(2025, 3, 5),
      tags: ["reflection", "nature", "calm"]
    },
    {
      id: "2",
      title: "Overwhelmed but trying",
      content: "Work has been so stressful this week. I feel like I'm constantly catching up and never ahead. Taking a moment to acknowledge that I'm doing my best with what I have. Tomorrow is a new day.",
      mood: "😓 Stressed",
      date: new Date(2025, 3, 3),
      tags: ["work", "stress", "self-care"]
    }
  ]);
  
  const [isCreating, setIsCreating] = useState(false);
  
  const handleSaveEntry = (entry: Omit<JournalEntry, "id" | "date">) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date()
    };
    
    setEntries([newEntry, ...entries]);
    setIsCreating(false);
  };
  
  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Your Journal</h1>
            <p className="text-muted-foreground">A private space for your thoughts and reflections.</p>
          </div>
          
          <Button 
            className="btn-primary" 
            onClick={() => setIsCreating(true)}
            disabled={isCreating}
          >
            + New Journal Entry
          </Button>
        </div>
        
        {isCreating ? (
          <div className="mb-10">
            <JournalEntryForm 
              onSave={handleSaveEntry}
              onCancel={() => setIsCreating(false)}
            />
          </div>
        ) : null}
        
        <JournalEntryList 
          entries={entries}
          onDelete={handleDeleteEntry}
        />
      </div>
    </MainLayout>
  );
};

export default Journal;
