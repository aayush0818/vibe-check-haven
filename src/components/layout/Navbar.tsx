
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="w-full py-4 border-b border-border/40 bg-background/95 backdrop-blur-sm fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-teal to-lavender bg-clip-text text-transparent">
            Vibe Check Haven
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/daily-check">Daily Check</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/journal">Journal</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/mood-tracker">Mood Tracker</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/resources">Resources</Link>
          </Button>
        </div>
        
        <div className="flex items-center gap-4">
          <Button className="btn-primary">Sign In</Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
