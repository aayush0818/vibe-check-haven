
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface MoodEntryFormProps {
  onSave: (entry: {
    mood: number;
    energy: number;
    sleep: number;
    notes: string;
  }) => Promise<void>;
  initialValues?: {
    mood: number;
    energy: number;
    sleep: number;
    notes: string;
  };
}

const MoodEntryForm = ({
  onSave,
  initialValues = {
    mood: 3,
    energy: 3,
    sleep: 3,
    notes: "Feeling good today!"
  }
}: MoodEntryFormProps) => {
  const [entry, setEntry] = useState(initialValues);

  const updateEntry = (key: string, value: number | string) => {
    setEntry(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(entry);
  };

  return (
    <Card className="shadow-md p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Track Your Mood</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Mood</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={entry.mood}
              onChange={(e) => updateEntry('mood', parseInt(e.target.value))}
            >
              <option value={4}>Great</option>
              <option value={3}>Good</option>
              <option value={2}>Okay</option>
              <option value={1}>Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Energy</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={entry.energy}
              onChange={(e) => updateEntry('energy', parseInt(e.target.value))}
            >
              <option value={4}>High</option>
              <option value={3}>Good</option>
              <option value={2}>Moderate</option>
              <option value={1}>Low</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Sleep Quality</label>
            <select 
              className="w-full p-2 border rounded-md"
              value={entry.sleep}
              onChange={(e) => updateEntry('sleep', parseInt(e.target.value))}
            >
              <option value={4}>Excellent</option>
              <option value={3}>Good</option>
              <option value={2}>Fair</option>
              <option value={1}>Poor</option>
            </select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Notes (optional)</label>
          <textarea 
            className="w-full p-2 border rounded-md"
            rows={3}
            value={entry.notes}
            onChange={(e) => updateEntry('notes', e.target.value)}
            placeholder="How are you feeling today?"
          ></textarea>
        </div>
        
        <Button type="submit" className="w-full">
          Save Entry
        </Button>
      </form>
    </Card>
  );
};

export default MoodEntryForm;
