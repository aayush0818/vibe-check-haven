
import { ExternalLink, FileText, Video, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export type Resource = {
  id: string;
  title: string;
  description: string;
  type: "article" | "video" | "pdf" | "tool";
  source: string;
  url: string;
  tags: string[];
};

export const ResourceCard = ({ resource }: { resource: Resource }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "article":
        return <ExternalLink className="h-5 w-5" />;
      case "tool":
        return <Wrench className="h-5 w-5" />;
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
