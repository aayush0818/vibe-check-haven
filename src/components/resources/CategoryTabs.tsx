
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceList } from "./ResourceList";
import { Resource } from "./ResourceCard";

export const categories = [
  { id: "all", label: "All Resources" },
  { id: "anxiety", label: "Anxiety & Stress" },
  { id: "depression", label: "Low Mood" },
  { id: "sleep", label: "Sleep Help" },
  { id: "relationships", label: "Relationships" },
  { id: "selfcare", label: "Self-Care" },
  { id: "india", label: "Indian Resources" }
];

interface CategoryTabsProps {
  resourcesData: Resource[];
}

export const CategoryTabs = ({ resourcesData }: CategoryTabsProps) => {
  return (
    <Tabs defaultValue="all" className="mb-8">
      <TabsList className="mb-8 flex flex-wrap h-auto gap-2 bg-lavender/10">
        {categories.map((category) => (
          <TabsTrigger 
            key={category.id} 
            value={category.id}
            className="data-[state=active]:bg-lavender data-[state=active]:text-white"
          >
            {category.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <ResourceList resources={resourcesData} />
      </TabsContent>
      
      <TabsContent value="anxiety" className="mt-0">
        <ResourceList 
          resources={resourcesData.filter((resource) => 
            resource.tags.some(tag => 
              ["anxiety", "stress", "overthinking"].includes(tag)
            )
          )} 
        />
      </TabsContent>
      
      <TabsContent value="depression" className="mt-0">
        <ResourceList 
          resources={resourcesData.filter((resource) => 
            resource.tags.some(tag => 
              ["depression", "low mood", "sadness"].includes(tag)
            )
          )} 
        />
      </TabsContent>
      
      <TabsContent value="sleep" className="mt-0">
        <ResourceList 
          resources={resourcesData.filter((resource) => 
            resource.tags.some(tag => 
              ["sleep", "rest", "fatigue"].includes(tag)
            )
          )} 
        />
      </TabsContent>
      
      <TabsContent value="relationships" className="mt-0">
        <ResourceList 
          resources={resourcesData.filter((resource) => 
            resource.tags.some(tag => 
              ["relationships", "communication", "social"].includes(tag)
            )
          )} 
        />
      </TabsContent>
      
      <TabsContent value="selfcare" className="mt-0">
        <ResourceList 
          resources={resourcesData.filter((resource) => 
            resource.tags.some(tag => 
              ["self-care", "self-help", "habits", "health", "self-compassion"].includes(tag)
            )
          )} 
        />
      </TabsContent>
      
      <TabsContent value="india" className="mt-0">
        <ResourceList 
          resources={resourcesData.filter((resource) => 
            resource.tags.some(tag => 
              ["india"].includes(tag)
            )
          )} 
        />
      </TabsContent>
    </Tabs>
  );
};
