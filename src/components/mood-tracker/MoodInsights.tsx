
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

interface MoodInsightsProps {
  moodData: Array<{
    date: string;
    mood: number;
    energy: number;
    sleep: number;
  }>;
}

const MoodInsights = ({ moodData }: MoodInsightsProps) => {
  const { user } = useAuth();

  return (
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
  );
};

export default MoodInsights;
