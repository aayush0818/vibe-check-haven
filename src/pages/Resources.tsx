
import MainLayout from "@/components/layout/MainLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, FileText, Video, Tool } from "lucide-react";

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
    title: "Anxiety Toolkit - Understanding and Managing Anxiety",
    description: "A comprehensive guide from Mind with practical exercises and strategies to manage anxiety in daily life.",
    type: "pdf",
    source: "Mind.org",
    url: "https://www.mind.org.uk/information-support/types-of-mental-health-problems/anxiety-and-panic-attacks/self-care/",
    tags: ["anxiety", "self-help", "exercises"]
  },
  {
    id: "2",
    title: "Depression Self-help Guide",
    description: "Evidence-based approaches to understand and manage symptoms of depression from the NHS.",
    type: "pdf",
    source: "NHS",
    url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/depression-anxiety-self-assessment-quiz/",
    tags: ["depression", "self-help", "healthcare"]
  },
  {
    id: "3",
    title: "How to Stop Overthinking - Practical Techniques",
    description: "Learn practical cognitive techniques to break the cycle of rumination and overthinking from a licensed therapist.",
    type: "video",
    source: "Therapy in a Nutshell",
    url: "https://www.youtube.com/watch?v=JOwNKAV9_Mg",
    tags: ["overthinking", "anxiety", "cognitive"]
  },
  {
    id: "4",
    title: "The Science of Happiness",
    description: "Explore the scientific research behind what actually makes humans happy and how to apply it to your life.",
    type: "video",
    source: "AsapSCIENCE",
    url: "https://www.youtube.com/watch?v=oHv6vTKD6lg",
    tags: ["happiness", "science", "positive psychology"]
  },
  {
    id: "5",
    title: "Tiny Buddha: Simple Wisdom for Life's Hard Questions",
    description: "Thoughtful insights on finding peace and meaning in everyday life challenges. Popular blog with practical advice.",
    type: "article",
    source: "Tiny Buddha",
    url: "https://tinybuddha.com/",
    tags: ["mindfulness", "wisdom", "life challenges"]
  },
  {
    id: "6",
    title: "Mastering Difficult Conversations - Communication Guide",
    description: "A guide to navigating challenging discussions with confidence and empathy, with real-world examples.",
    type: "article",
    source: "The Mighty",
    url: "https://themighty.com/topic/mental-health/",
    tags: ["communication", "relationships", "social skills"]
  },
  {
    id: "7",
    title: "Sleep Improvement Guide - Evidence-based Strategies",
    description: "Evidence-based strategies for better sleep quality and establishing healthy sleep routines from sleep experts.",
    type: "pdf",
    source: "Sleep Foundation",
    url: "https://www.sleepfoundation.org/sleep-hygiene",
    tags: ["sleep", "health", "habits"]
  },
  {
    id: "8",
    title: "Breathing Techniques for Instant Calm",
    description: "Learn simple breathing exercises that can help reduce anxiety and stress in minutes. Interactive guide with timers.",
    type: "tool",
    source: "Calm App",
    url: "https://www.calm.com/breathe",
    tags: ["anxiety", "stress", "breathing", "techniques"]
  },
  {
    id: "9",
    title: "NIMHANS Digital Academy Mental Health Resources",
    description: "Comprehensive mental health resources from India's premier mental health institution, including self-help guides.",
    type: "pdf",
    source: "NIMHANS",
    url: "https://nimhans.ac.in/pssmhs-nimhans/",
    tags: ["india", "resources", "mental health"]
  },
  {
    id: "10",
    title: "The Happiness Project India",
    description: "India-focused mental health resources and wellness strategies adapted for Indian cultural context.",
    type: "article",
    source: "The Happiness Project",
    url: "https://www.happinessindexindia.org/",
    tags: ["india", "happiness", "wellness"]
  },
  {
    id: "11",
    title: "Mindfulness Meditation for Beginners",
    description: "A gentle introduction to mindfulness practices with guided sessions suitable for those new to meditation.",
    type: "video",
    source: "Headspace",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM",
    tags: ["meditation", "mindfulness", "beginners"]
  },
  {
    id: "12",
    title: "YourDost - Online Counseling and Emotional Support",
    description: "India's leading online counseling and emotional wellness platform with expert psychologists and coaches.",
    type: "tool",
    source: "YourDost",
    url: "https://yourdost.com/",
    tags: ["india", "counseling", "online therapy"]
  },
  {
    id: "13",
    title: "The Body Keeps the Score: Brain, Mind, and Body in Healing Trauma",
    description: "Summary of key insights from the groundbreaking book on how trauma affects the body and mind.",
    type: "article",
    source: "Very Well Mind",
    url: "https://www.verywellmind.com/the-body-keeps-the-score-summary-5213220",
    tags: ["trauma", "healing", "body-mind connection"]
  },
  {
    id: "14",
    title: "Manas Foundation - Mental Health Resources",
    description: "Delhi-based mental health organization providing culturally sensitive resources for Indian contexts.",
    type: "pdf",
    source: "Manas Foundation",
    url: "https://manas.org.in/",
    tags: ["india", "mental health", "resources"]
  },
  {
    id: "15",
    title: "Self-Compassion Exercises by Dr. Kristin Neff",
    description: "Practical exercises to develop greater self-compassion from the pioneering researcher in the field.",
    type: "tool",
    source: "Self-Compassion.org",
    url: "https://self-compassion.org/category/exercises/",
    tags: ["self-compassion", "exercises", "self-care"]
  }
];

const categories = [
  { id: "all", label: "All Resources" },
  { id: "anxiety", label: "Anxiety & Stress" },
  { id: "depression", label: "Low Mood" },
  { id: "sleep", label: "Sleep Help" },
  { id: "relationships", label: "Relationships" },
  { id: "selfcare", label: "Self-Care" },
  { id: "india", label: "Indian Resources" }
];

const ResourceCard = ({ resource }: { resource: Resource }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "article":
        return <ExternalLink className="h-5 w-5" />;
      case "tool":
        return <Tool className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-lavender/20">
      <div className="p-6 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <Badge variant="outline" className="bg-lavender/20 hover:bg-lavender/30 text-lavender">
            {resource.type}
          </Badge>
          <span className="text-lavender">{getTypeIcon(resource.type)}</span>
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
          
          <Button className="w-full border-lavender text-lavender hover:bg-lavender/10" variant="outline" asChild>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
              View Resource
              <ExternalLink className="h-4 w-4" />
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
        <div className="mb-8 bg-gradient-to-r from-lavender/20 to-teal/20 p-6 rounded-xl">
          <h1 className="text-3xl md:text-4xl font-bold">Resource Vault</h1>
          <p className="text-muted-foreground">
            Explore our collection of hand-picked resources to support your mental wellbeing.
          </p>
        </div>
        
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
                    ["self-care", "self-help", "habits", "health", "self-compassion"].includes(tag)
                  )
                )
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="india" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resourcesData
                .filter((resource) => 
                  resource.tags.some(tag => 
                    ["india"].includes(tag)
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
          
          <div className="space-y-6 max-w-2xl mx-auto text-left bg-white/80 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold">Indian Mental Health Helplines</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-lavender/30 rounded-lg p-4 hover:bg-lavender/5 transition-colors">
                <h4 className="font-medium text-lavender">NIMHANS Helpline</h4>
                <p className="text-sm text-muted-foreground">24x7 Toll-Free Mental Health Rehabilitation</p>
                <a href="tel:08046110007" className="text-lavender font-bold block mt-2">080-4611 0007</a>
              </div>
              
              <div className="border border-lavender/30 rounded-lg p-4 hover:bg-lavender/5 transition-colors">
                <h4 className="font-medium text-lavender">Vandrevala Foundation</h4>
                <p className="text-sm text-muted-foreground">24x7 Helpline for Mental Health Counselling</p>
                <a href="tel:9999666555" className="text-lavender font-bold block mt-2">9999 666 555</a>
              </div>
              
              <div className="border border-lavender/30 rounded-lg p-4 hover:bg-lavender/5 transition-colors">
                <h4 className="font-medium text-lavender">iCall Helpline (Tata Institute)</h4>
                <p className="text-sm text-muted-foreground">Psychosocial Counselling</p>
                <a href="tel:02225521111" className="text-lavender font-bold block mt-2">022-2552 1111</a>
              </div>
              
              <div className="border border-lavender/30 rounded-lg p-4 hover:bg-lavender/5 transition-colors">
                <h4 className="font-medium text-lavender">Arpita Suicide Prevention Helpline</h4>
                <p className="text-sm text-muted-foreground">Suicide Prevention & Crisis Support</p>
                <a href="tel:08025251444" className="text-lavender font-bold block mt-2">080-2525 1444</a>
              </div>
              
              <div className="border border-lavender/30 rounded-lg p-4 hover:bg-lavender/5 transition-colors">
                <h4 className="font-medium text-lavender">AASRA</h4>
                <p className="text-sm text-muted-foreground">24x7 Crisis Intervention & Suicide Prevention</p>
                <a href="tel:9820466726" className="text-lavender font-bold block mt-2">+91 9820466726</a>
              </div>
              
              <div className="border border-lavender/30 rounded-lg p-4 hover:bg-lavender/5 transition-colors">
                <h4 className="font-medium text-lavender">Mann Saathi Helpline</h4>
                <p className="text-sm text-muted-foreground">Maharashtra Mental Health Support</p>
                <a href="tel:08046110007" className="text-lavender font-bold block mt-2">1800-120-820050</a>
              </div>
            </div>
          </div>
          
          <Button className="bg-lavender hover:bg-lavender/90 text-white mt-6" asChild>
            <a href="https://www.practo.com/counselling-psychology" target="_blank" rel="noopener noreferrer">
              Find Professional Support
            </a>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default Resources;
