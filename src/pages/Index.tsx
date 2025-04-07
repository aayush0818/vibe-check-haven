
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <section className="container mx-auto">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 py-12">
          <div className="md:w-1/2 space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Your safe space to <span className="bg-gradient-to-r from-teal to-lavender bg-clip-text text-transparent">check in</span> with yourself
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground font-light max-w-md">
              Hey there, glad you're here. This is your safe space to check in with yourself, track your feelings, vent, or just explore. No pressure, no judgment—just tools made for you.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button className="btn-primary glow-button" asChild>
                <Link to="/daily-check">Start Your Day Check-In</Link>
              </Button>
              <Button className="btn-secondary glow-button" asChild>
                <Link to="/journal">Jump into Journal</Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal/30 to-lavender/30 rounded-full animate-float blur-3xl opacity-70"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="gradient-card w-64 h-64 rounded-2xl shadow-xl p-6 flex flex-col justify-center items-center rotate-3 animate-float">
                  <span className="text-5xl mb-4">😌</span>
                  <p className="quote text-center text-lg">Breathe in calm, breathe out stress</p>
                </div>
                <div className="gradient-lavender absolute -bottom-6 -right-6 w-48 h-48 rounded-2xl shadow-xl p-4 flex flex-col justify-center items-center -rotate-6 animate-float" style={{ animationDelay: "0.5s" }}>
                  <span className="text-4xl mb-2">🌱</span>
                  <p className="quote text-center text-sm">Growth takes time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-20">
          <h2 className="text-3xl font-bold text-center mb-16">How We Support Your Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Daily Vibes Quiz</h3>
              <p className="text-muted-foreground">Check in with yourself through our thoughtful, engaging daily questions that help you understand your mental landscape.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-lavender/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">📓</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Personal Journal</h3>
              <p className="text-muted-foreground">Express yourself freely in your private, secure journal with helpful prompts based on your mood.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-beige/50 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">📊</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Mood Tracker</h3>
              <p className="text-muted-foreground">Visualize your emotional patterns over time with our beautiful, easy-to-understand charts and insights.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-teal/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">📚</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Resource Vault</h3>
              <p className="text-muted-foreground">Access carefully curated resources including articles, videos, and tools for various mental health topics.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-lavender/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">👥</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Community Wall</h3>
              <p className="text-muted-foreground">Connect with others, share experiences, and find solidarity in our supportive, moderated community space.</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-beige/50 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Privacy First</h3>
              <p className="text-muted-foreground">Your mental health journey is personal. We prioritize your privacy with secure, encrypted data storage.</p>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-gradient-to-r from-teal/20 to-lavender/20 rounded-3xl p-10 md:p-16 text-center my-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to check in with yourself?</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Take the first step toward mindful self-awareness with our Daily Vibes Quiz. It only takes a minute, but can change your whole day.
          </p>
          <Button className="btn-primary text-lg py-6 px-8 glow-button" asChild>
            <Link to="/daily-check">Start Your Day Check-In</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
