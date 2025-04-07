
import MainLayout from "@/components/layout/MainLayout";
import { CategoryTabs } from "@/components/resources/CategoryTabs";
import { HelplineSection } from "@/components/resources/HelplineSection";
import { resourcesData } from "@/components/resources/resourcesData";

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
        
        <CategoryTabs resourcesData={resourcesData} />
        <HelplineSection />
      </div>
    </MainLayout>
  );
};

export default Resources;
