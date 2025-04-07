
import { ResourceCard, Resource } from "./ResourceCard";

interface ResourceListProps {
  resources: Resource[];
}

export const ResourceList = ({ resources }: ResourceListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} />
      ))}
    </div>
  );
};
