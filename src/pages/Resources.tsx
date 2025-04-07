
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Resource = {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "pdf" | "tool";
  source: string;
  url: string;
  tags: string[];
};

const resourcesData: Resource[] = [
  {
    id: "1",
    title: "Anxiety Toolkit",
    description: "A comprehensive guide with practical exercises and strategies to manage anxiety in daily life.",
    type: "pdf",
    source: "Mind.org",
    url: "#",
    tags: ["anxiety", "self-help", "exercises"]
  },
  {
    id: "2",
    title: "Depression Self-help Guide",
    description: "Evidence-based approaches to understand and manage symptoms of depression.",
    type: "pdf",
    source: "NHS",
    url: "#",
    tags: ["depression", "self-help", "healthcare"]
  },
  {
    id: "3",
    title: "How to Stop Overthinking",
    description: "Learn practical cognitive techniques to break the cycle of rumination and overthinking.",
    type: "video",
    source: "Therapy in a Nutshell",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["overthinking", "anxiety", "cognitive"]
  },
  {
    id: "4",
    title: "The Science of Happiness",
    description: "Explore the research behind what actually makes humans happy and how to apply it to your life.",
    type: "video",
    source: "AsapSCIENCE",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    tags: ["happiness", "science", "positive psychology"]
  },
  {
    id: "5",
    title: "Tiny Buddha: Simple Wisdom for Life's Hard Questions",
    description: "Thoughtful insights on finding peace and meaning in everyday life challenges.",
    type: "article",
    source: "Tiny Buddha",
    url: "#",
    tags: ["mindfulness", "wisdom", "life challenges"]
  },
  {
    id: "6",
    title: "Mastering Difficult Conversations",
    description: "A guide to navigating challenging discussions with confidence and empathy.",
    type: "article",
    source: "The Mighty",
    url: "#",
    tags: ["communication", "relationships", "social skills"]
  },
  {
    id: "7",
    title: "Sleep Improvement Guide",
    description: "Evidence-based strategies for better sleep quality and establishing healthy sleep routines.",
    type: "pdf",
    source: "Sleep Foundation",
    url: "#",
    tags: ["sleep", "health", "habits"]
  },
  {
    id: "8",
    title: "Breathing Techniques for Instant Calm",
    description: "Learn simple breathing exercises that can help reduce anxiety and stress in minutes.",
    type: "tool",
    source: "Calm App",
    url: "#",
    tags: ["anxiety", "stress", "breathing", "techniques"]
  }
];

const categories = [
  { id: "all", label: "All Resources" },
  { id: "anxiety", label: "Anxiety & Stress" },
  { id: "depression", label: "Low Mood" },
  { id: "sleep", label: "Sleep Help" },
  { id: "relationships", label: "Relationships" },
  { id: "selfcare", label: "Self-Care" }
];

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return "📄";
      case "video":
        return "🎬";
      case "article":
        return "📝";
      case "tool":
        return "🛠️";
      default:
        return "📚";
    }
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-300">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className="bg-lavender/20 hover:bg-lavender/30">
            {resource.type}
          </Badge>
          <span className="text-2xl">{getTypeIcon(resource.type)}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2">{resource.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 flex-grow">{resource.description}</p>
        
        <div className="mt-auto">
          <div className="text-sm text-muted-foreground mb-4">Source: {resource.source}</div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-teal/10 hover:bg-teal/20 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <Button className="w-full btn-outline" asChild>
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              View Resource
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

const Resources = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Resource Vault</h1>
          <p className="text-muted-foreground">
            Explore our collection of hand-picked resources to support your mental wellbeing.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="mb-8 flex flex-wrap h-auto gap-2">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="data-[state=active]:bg-teal data-[state=active]:text-midnight"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesData.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="anxiety" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesData
                .filter((resource) => 
                  resource.tags.some(tag => 
                    ["anxiety", "stress", "overthinking"].includes(tag)
                  )
                )
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="depression" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesData
                .filter((resource) => 
                  resource.tags.some(tag => 
                    ["depression", "low mood", "sadness"].includes(tag)
                  )
                )
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="sleep" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesData
                .filter((resource) => 
                  resource.tags.some(tag => 
                    ["sleep", "rest", "fatigue"].includes(tag)
                  )
                )
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="relationships" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesData
                .filter((resource) => 
                  resource.tags.some(tag => 
                    ["relationships", "communication", "social"].includes(tag)
                  )
                )
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="selfcare" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesData
                .filter((resource) => 
                  resource.tags.some(tag => 
                    ["self-care", "self-help", "habits", "health"].includes(tag)
                  )
                )
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="bg-gradient-to-r from-lavender/20 to-teal/20 rounded-3xl p-10 text-center my-12">
          <h2 className="text-2xl font-bold mb-4">Need more personalized support?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            While these resources can be helpful, they're not a replacement for professional help. If you're struggling, consider reaching out to a mental health professional.
          </p>
          <Button className="btn-primary" asChild>
            <a href="https://findatherapist.com" target="_blank" rel="noopener noreferrer">
              Find Professional Support
            </a>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Resources;
