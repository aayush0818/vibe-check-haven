
import { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";

// Mock data - used for non-authenticated users
const mockMoodData = [
  { date: "Apr 1", mood: 2, energy: 3, sleep: 2 },
  { date: "Apr 2", mood: 1, energy: 1, sleep: 1 },
  { date: "Apr 3", mood: 3, energy: 2, sleep: 2 },
  { date: "Apr 4", mood: 2, energy: 2, sleep: 3 },
  { date: "Apr 5", mood: 4, energy: 3, sleep: 3 },
  { date: "Apr 6", mood: 3, energy: 4, sleep: 4 },
  { date: "Apr 7", mood: 2, energy: 3, sleep: 2 }
];

const moodDistribution = [
  { name: "Happy", value: 3, color: "#A8DADC" },
  { name: "Calm", value: 5, color: "#D9C7F5" },
  { name: "Neutral", value: 7, color: "#FAF3E0" },
  { name: "Stressed", value: 3, color: "#FF9E9E" },
  { name: "Sad", value: 2, color: "#9EC1FF" }
];

const journalTags = [
  { name: "work", count: 8 },
  { name: "self-care", count: 5 },
  { name: "gratitude", count: 4 },
  { name: "stress", count: 3 },
  { name: "nature", count: 3 },
  { name: "relationships", count: 2 }
];

// Type for mood entry from database
type MoodEntry = {
  id: string;
  user_id: string;
  mood: number;
  energy: number;
  sleep: number;
  date: string;
  notes?: string;
};

// Type for chart data
type ChartData = {
  date: string;
  mood: number;
  energy: number;
  sleep: number;
};

const MoodTracker = () => {
  const { user } = useAuth();
  const [moodData, setMoodData] = useState<ChartData[]>(mockMoodData);
  const [isLoading, setIsLoading] = useState(false);
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

  // Fetch user mood entries from Supabase
  useEffect(() => {
    if (user) {
      fetchUserMoodEntries();
    } else {
      // Use mock data for non-authenticated users
      setMoodData(mockMoodData);
    }
  }, [user]);

  const fetchUserMoodEntries = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('mood_entries')
        .select('*')
        .order('date', { ascending: true });

      if (error) {
        console.error('Error fetching mood entries:', error);
        toast.error('Failed to load your mood data');
        return;
      }

      if (data && data.length > 0) {
        // Transform data for the chart
        const chartData = data.map((entry: MoodEntry) => ({
          date: format(new Date(entry.date), 'MMM d'),
          mood: entry.mood,
          energy: entry.energy,
          sleep: entry.sleep
        }));
        setMoodData(chartData);
      } else if (user) {
        // If user is authenticated but has no data yet
        setMoodData([]);
        toast.info('No mood entries yet. Start tracking your mood daily!');
      }
    } catch (error) {
      console.error('Error in fetchUserMoodEntries:', error);
      toast.error('Something went wrong while loading your data');
    } finally {
      setIsLoading(false);
    }
  };

  // Save a mood entry
  const saveMoodEntry = async () => {
    if (!user) {
      toast.error('Please sign in to save your mood data');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('mood_entries')
        .insert([
          {
            mood: sampleEntry.mood,
            energy: sampleEntry.energy,
            sleep: sampleEntry.sleep,
            notes: sampleEntry.notes,
          }
        ]);

      if (error) {
        console.error('Error saving mood entry:', error);
        toast.error('Failed to save your mood data');
        return;
      }

      toast.success('Mood entry saved successfully!');
      fetchUserMoodEntries(); // Refresh the data
    } catch (error) {
      console.error('Error in saveMoodEntry:', error);
      toast.error('Something went wrong');
    }
  };

  // Helper function to update sample entry state
  const updateSampleEntry = (key: string, value: number | string) => {
    setSampleEntry(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getMoodLabel = (value: number) => {
    switch(value) {
      case 4: return "Great";
      case 3: return "Good";
      case 2: return "Okay";
      case 1: return "Low";
      default: return "";
    }
  };
  
  const getTooltipContent = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-md rounded-md border border-border">
          <p className="font-medium">{payload[0].payload.date}</p>
          <p className="text-sm">
            <span className="font-medium">Mood:</span> {getMoodLabel(payload[0].value)}
          </p>
          <p className="text-sm">
            <span className="font-medium">Energy:</span> {getMoodLabel(payload[1].value)}
          </p>
          <p className="text-sm">
            <span className="font-medium">Sleep Quality:</span> {getMoodLabel(payload[2].value)}
          </p>
        </div>
      );
    }
    return null;
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
        
        {user && moodData.length === 0 ? (
          <Card className="shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Start Tracking Your Mood</h2>
            <p className="mb-6">You don't have any mood entries yet. Start by adding your first entry!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Mood</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={sampleEntry.mood}
                  onChange={(e) => updateSampleEntry('mood', parseInt(e.target.value))}
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
                  value={sampleEntry.energy}
                  onChange={(e) => updateSampleEntry('energy', parseInt(e.target.value))}
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
                  value={sampleEntry.sleep}
                  onChange={(e) => updateSampleEntry('sleep', parseInt(e.target.value))}
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
                value={sampleEntry.notes}
                onChange={(e) => updateSampleEntry('notes', e.target.value)}
                placeholder="How are you feeling today?"
              ></textarea>
            </div>
            
            <Button onClick={saveMoodEntry} className="w-full">
              Save Entry
            </Button>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <Card className="shadow-md p-6 col-span-1 lg:col-span-2">
                <h2 className="text-xl font-bold mb-6">Mood & Energy Trends</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={moodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="date" />
                      <YAxis
                        tickFormatter={getMoodLabel}
                        domain={[1, 4]}
                        ticks={[1, 2, 3, 4]}
                      />
                      <Tooltip content={getTooltipContent} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="mood"
                        stroke="#A8DADC"
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2, fill: "white" }}
                        activeDot={{ r: 8 }}
                        name="Mood"
                      />
                      <Line
                        type="monotone"
                        dataKey="energy"
                        stroke="#D9C7F5"
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2, fill: "white" }}
                        activeDot={{ r: 8 }}
                        name="Energy"
                      />
                      <Line
                        type="monotone"
                        dataKey="sleep"
                        stroke="#1D3557"
                        strokeWidth={3}
                        dot={{ r: 6, strokeWidth: 2, fill: "white" }}
                        activeDot={{ r: 8 }}
                        name="Sleep Quality"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                {user && (
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => setSampleEntry({
                      mood: 3,
                      energy: 3,
                      sleep: 3,
                      notes: "Feeling good today!"
                    })} className="mr-2">Add New Entry</Button>
                    <Button onClick={saveMoodEntry} variant="outline">Save Entry</Button>
                  </div>
                )}
              </Card>
              
              <Card className="shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Mood Distribution</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={moodDistribution}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={50}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {moodDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} entries`, "Count"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <Card className="shadow-md p-6 col-span-1 lg:col-span-2">
                <h2 className="text-xl font-bold mb-6">Weekly Insights</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-teal/10 rounded-lg">
                    <h3 className="font-medium mb-2">Mood Patterns</h3>
                    <p className="text-sm">
                      {user ? 
                        "Based on your entries, we can analyze your mood patterns over time." :
                        "You had more calm than chaos this week. Your mood has been gradually improving since Wednesday. The weekend showed a positive trend!"
                      }
                    </p>
                  </div>
                  
                  <div className="p-4 bg-lavender/10 rounded-lg">
                    <h3 className="font-medium mb-2">Sleep Connection</h3>
                    <p className="text-sm">
                      {user ?
                        "We can show you correlations between your sleep quality and mood as you add more entries." :
                        "We've noticed that your mood tends to be higher on days when you reported better sleep quality. Consider prioritizing your sleep routine."
                      }
                    </p>
                  </div>
                  
                  <div className="p-4 bg-beige/30 rounded-lg">
                    <h3 className="font-medium mb-2">Reflection Question</h3>
                    <p className="text-sm quote">
                      What activities or people were present on your best days this week? How might you incorporate more of those elements?
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Journal Tag Frequency</h2>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={journalTags}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" />
                      <Tooltip />
                      <Bar dataKey="count" fill="#A8DADC" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            
            <Card className="shadow-md p-6 mb-8">
              <h2 className="text-xl font-bold mb-4">Progress & Streaks</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-teal/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Daily Check-ins</p>
                  <p className="text-4xl font-bold">{user ? moodData.length : 7}</p>
                  <p className="text-sm font-medium text-teal">{user ? `${moodData.length > 0 ? moodData.length : 'No'} entries recorded` : '7-day streak! 🔥'}</p>
                </div>
                
                <div className="bg-lavender/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Journal Entries</p>
                  <p className="text-4xl font-bold">{user ? 0 : 5}</p>
                  <p className="text-sm font-medium text-lavender">This week</p>
                </div>
                
                <div className="bg-beige/30 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Average Mood</p>
                  <p className="text-4xl font-bold">
                    {user && moodData.length > 0 
                      ? (moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length).toFixed(1) 
                      : '3.2'}
                  </p>
                  <p className="text-sm font-medium text-amber-600">{user ? 'Your average' : '+0.5 vs last week'}</p>
                </div>
                
                <div className="bg-midnight/10 rounded-lg p-4 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Best Day</p>
                  <p className="text-4xl font-bold">
                    {user && moodData.length > 0
                      ? moodData.reduce((best, entry) => entry.mood > moodData[best].mood ? moodData.indexOf(entry) : best, 0)
                      : 'Tue'}
                  </p>
                  <p className="text-sm font-medium text-midnight">{user ? 'Based on mood score' : 'April 2'}</p>
                </div>
              </div>
            </Card>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default MoodTracker;
