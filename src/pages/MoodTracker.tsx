
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { moodEntriesTable } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";

// Refactored components
import MoodEntryForm from "@/components/mood-tracker/MoodEntryForm";
import MoodTrendsChart from "@/components/mood-tracker/MoodTrendsChart";
import MoodDistributionChart from "@/components/mood-tracker/MoodDistributionChart";
import MoodInsights from "@/components/mood-tracker/MoodInsights";
import JournalTagsChart from "@/components/mood-tracker/JournalTagsChart";
import ProgressStats from "@/components/mood-tracker/ProgressStats";

// Mock data for non-authenticated users
const mockMoodData = [
  { date: "Apr 1", mood: 2, energy: 3, sleep: 2 },
  { date: "Apr 2", mood: 1, energy: 1, sleep: 1 },
  { date: "Apr 3", mood: 3, energy: 2, sleep: 2 },
  { date: "Apr 4", mood: 2, energy: 2, sleep: 3 },
  { date: "Apr 5", mood: 4, energy: 3, sleep: 3 },
  { date: "Apr 6", mood: 3, energy: 4, sleep: 4 },
  { date: "Apr 7", mood: 2, energy: 3, sleep: 2 }
];

type ChartData = {
  date: string;
  mood: number;
  energy: number;
  sleep: number;
};

const MoodTracker = () => {
  const { user } = useAuth();
  const [moodData, setMoodData] = useState<ChartData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sampleEntry, setSampleEntry] = useState<{
    mood: number;
    energy: number;
    sleep: number;
    notes: string;
  }>({
    mood: 3,
    energy: 3,
    sleep: 3,
    notes: "Feeling good today!"
  });

  useEffect(() => {
    if (user) {
      fetchUserMoodEntries();
    } else {
      setMoodData(mockMoodData);
    }
  }, [user]);

  const fetchUserMoodEntries = async () => {
    try {
      setIsLoading(true);

      if (!user) {
        setMoodData(mockMoodData);
        return;
      }

      const { data, error } = await moodEntriesTable()
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching mood entries:', error);
        toast.error('Failed to load your mood data');
        return;
      }

      if (data && data.length > 0) {
        const chartData = data.map((entry: any) => ({
          date: format(new Date(entry.date), 'MMM d'),
          mood: entry.mood,
          energy: entry.energy,
          sleep: entry.sleep
        }));
        setMoodData(chartData);
        console.log('User mood data loaded:', chartData);
      } else if (user) {
        setMoodData([]);
        toast.info('No mood entries yet. Start tracking your mood daily!');
        setShowForm(true);
      }
    } catch (error) {
      console.error('Error in fetchUserMoodEntries:', error);
      toast.error('Something went wrong while loading your data');
    } finally {
      setIsLoading(false);
    }
  };

  const saveMoodEntry = async (entry: {
    mood: number;
    energy: number;
    sleep: number;
    notes: string;
  }) => {
    if (!user) {
      toast.error('Please sign in to save your mood data');
      return;
    }

    try {
      const { error } = await moodEntriesTable()
        .insert({
          user_id: user.id,
          mood: entry.mood,
          energy: entry.energy,
          sleep: entry.sleep,
          notes: entry.notes,
          date: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving mood entry:', error);
        toast.error('Failed to save your mood data');
        return;
      }

      toast.success('Mood entry saved successfully!');
      fetchUserMoodEntries();
      setShowForm(false);
    } catch (error) {
      console.error('Error in saveMoodEntry:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Mood Tracker</h1>
          <p className="text-muted-foreground">
            Visualize your emotional patterns and insights over time.
          </p>
          {!user && (
            <div className="mt-4 p-4 bg-lavender/10 rounded-lg">
              <p className="text-sm">
                <span className="font-medium">Note:</span> You're seeing sample data. 
                <a href="/sign-in" className="text-lavender ml-1 hover:underline">Sign in</a> to track your own mood.
              </p>
            </div>
          )}
        </div>
        
        {user && (moodData.length === 0 || showForm) ? (
          <MoodEntryForm 
            onSave={saveMoodEntry} 
            initialValues={sampleEntry}
          />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <MoodTrendsChart 
                moodData={moodData} 
                onNewEntry={() => setShowForm(true)}
                onSaveEntry={() => saveMoodEntry(sampleEntry)} 
              />
              <MoodDistributionChart />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <MoodInsights moodData={moodData} />
              <JournalTagsChart />
            </div>
            
            <ProgressStats moodData={moodData} />
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default MoodTracker;
