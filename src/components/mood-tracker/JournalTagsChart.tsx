
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";

const journalTags = [
  { name: "work", count: 8 },
  { name: "self-care", count: 5 },
  { name: "gratitude", count: 4 },
  { name: "stress", count: 3 },
  { name: "nature", count: 3 },
  { name: "relationships", count: 2 }
];

const JournalTagsChart = () => {
  return (
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
  );
};

export default JournalTagsChart;
