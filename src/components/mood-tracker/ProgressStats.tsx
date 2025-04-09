
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

interface ProgressStatsProps {
  moodData: Array<{
    date: string;
    mood: number;
    energy: number;
    sleep: number;
  }>;
}

const ProgressStats = ({ moodData }: ProgressStatsProps) => {
  const { user } = useAuth();

  const getAverageMood = () => {
    if (moodData.length === 0) return user ? "0.0" : "3.2";
    return (moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length).toFixed(1);
  };

  const getBestDay = () => {
    if (moodData.length === 0) return user ? "-" : "Tue";
    const bestDayIndex = moodData.reduce(
      (best, entry, index, arr) => 
        entry.mood > arr[best].mood ? index : best, 
      0
    );
    return moodData[bestDayIndex].date;
  };

  return (
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
          <p className="text-4xl font-bold">{getAverageMood()}</p>
          <p className="text-sm font-medium text-amber-600">{user ? 'Your average' : '+0.5 vs last week'}</p>
        </div>
        
        <div className="bg-midnight/10 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground mb-1">Best Day</p>
          <p className="text-4xl font-bold">{getBestDay()}</p>
          <p className="text-sm font-medium text-midnight">{user ? 'Based on mood score' : 'April 2'}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProgressStats;
