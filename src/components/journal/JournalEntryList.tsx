
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { JournalEntry } from "@/pages/Journal";
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface JournalEntryListProps {
  entries: JournalEntry[];
  onDelete: (id: string) => void;
}

const JournalEntryList = ({ entries, onDelete }: JournalEntryListProps) => {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const confirmDelete = (id: string) => {
    setEntryToDelete(id);
  };
  
  const handleDeleteConfirmed = () => {
    if (entryToDelete) {
      onDelete(entryToDelete);
      setEntryToDelete(null);
    }
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-medium mb-2">No journal entries yet</h3>
        <p className="text-muted-foreground mb-6">
          Start writing to track your thoughts and feelings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <Card key={entry.id} className="p-6 hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <span>{formatDate(entry.date)}</span>
                <span>•</span>
                <span>{entry.mood}</span>
              </div>
              
              <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
              
              <p className="text-muted-foreground line-clamp-3 mb-4">
                {entry.content}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="bg-lavender/20 hover:bg-lavender/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex md:flex-col gap-2 self-end md:self-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="text-muted-foreground"
                onClick={() => setSelectedEntry(entry)}
              >
                Read
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => confirmDelete(entry.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
      
      {/* View Entry Dialog */}
      <Dialog open={!!selectedEntry} onOpenChange={(open) => !open && setSelectedEntry(null)}>
        {selectedEntry && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">{selectedEntry.title}</DialogTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                <span>{formatDate(selectedEntry.date)}</span>
                <span>•</span>
                <span>{selectedEntry.mood}</span>
              </div>
            </DialogHeader>
            
            <div className="whitespace-pre-line py-4">
              {selectedEntry.content}
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {selectedEntry.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="bg-lavender/20">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <DialogFooter>
              <Button
                variant="outline" 
                onClick={() => setSelectedEntry(null)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!entryToDelete} onOpenChange={(open) => !open && setEntryToDelete(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          
          <p className="py-4">
            This will permanently delete this journal entry. This action cannot be undone.
          </p>
          
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setEntryToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirmed}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JournalEntryList;
