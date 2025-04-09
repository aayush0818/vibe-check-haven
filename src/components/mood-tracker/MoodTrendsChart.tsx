
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

type ChartData = {
  date: string;
  mood: number;
  energy: number;
  sleep: number;
};

interface MoodTrendsChartProps {
  moodData: ChartData[];
  onNewEntry: () => void;
  onSaveEntry: () => void;
}

const MoodTrendsChart = ({ moodData, onNewEntry, onSaveEntry }: MoodTrendsChartProps) => {
  const { user } = useAuth();

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
          <Button onClick={onNewEntry} className="mr-2">Add New Entry</Button>
          <Button onClick={onSaveEntry} variant="outline">Save Entry</Button>
        </div>
      )}
    </Card>
  );
};

export default MoodTrendsChart;
