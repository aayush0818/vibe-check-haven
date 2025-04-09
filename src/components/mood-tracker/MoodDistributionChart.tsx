
import { useEffect, useState } from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from "recharts";
import { Card } from "@/components/ui/card";
import { moodEntriesTable } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface MoodDistribution {
  name: string;
  value: number;
  color: string;
}

// Default mock data
const defaultMoodDistribution = [
  { name: "Happy", value: 3, color: "#A8DADC" },
  { name: "Calm", value: 5, color: "#D9C7F5" },
  { name: "Neutral", value: 7, color: "#FAF3E0" },
  { name: "Stressed", value: 3, color: "#FF9E9E" },
  { name: "Sad", value: 2, color: "#9EC1FF" }
];

const getMoodCategory = (mood: number): string => {
  switch (mood) {
    case 4: return "Happy";
    case 3: return "Calm";
    case 2: return "Neutral";
    case 1: return "Stressed";
    default: return "Neutral";
  }
};

const getMoodColor = (category: string): string => {
  switch (category) {
    case "Happy": return "#A8DADC";
    case "Calm": return "#D9C7F5";
    case "Neutral": return "#FAF3E0";
    case "Stressed": return "#FF9E9E";
    case "Sad": return "#9EC1FF";
    default: return "#FAF3E0";
  }
};

const MoodDistributionChart = () => {
  const { user } = useAuth();
  const [moodDistribution, setMoodDistribution] = useState<MoodDistribution[]>(defaultMoodDistribution);

  useEffect(() => {
    if (user) {
      fetchMoodDistribution();
    }
  }, [user]);

  const fetchMoodDistribution = async () => {
    if (!user) return;

    try {
      const { data, error } = await moodEntriesTable()
        .select('mood')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching mood distribution:', error);
        return;
      }

      if (data && data.length > 0) {
        // Process data to get distribution
        const moodCounts: Record<string, number> = {};
        
        data.forEach((entry: any) => {
          const category = getMoodCategory(entry.mood);
          moodCounts[category] = (moodCounts[category] || 0) + 1;
        });

        // Convert to chart format
        const chartData = Object.entries(moodCounts).map(([name, value]) => ({
          name,
          value,
          color: getMoodColor(name)
        }));

        setMoodDistribution(chartData);
      }
    } catch (error) {
      console.error('Error in fetchMoodDistribution:', error);
    }
  };

  return (
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
  );
};

export default MoodDistributionChart;
