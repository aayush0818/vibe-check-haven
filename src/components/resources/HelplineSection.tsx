
import { Button } from "@/components/ui/button";

export const HelplineSection = () => {
  return (
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
  );
};
