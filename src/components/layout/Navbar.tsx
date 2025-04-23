
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut, loading } = useAuth();
  const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || "User";

  return (
    <nav className="w-full py-4 border-b border-border/40 bg-background/95 backdrop-blur-sm fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-lavender to-teal bg-clip-text text-transparent">
            Moodly
          </span>
        </Link>

        <div className="hidden md:flex space-x-1">
          <Button variant="ghost" asChild className="hover:bg-lavender/10 hover:text-lavender">
            <Link to="/">Home</Link>
          </Button>
          {user && (
            <>
              <Button variant="ghost" asChild className="hover:bg-lavender/10 hover:text-lavender">
                <Link to="/daily-check">Daily Check</Link>
              </Button>
              <Button variant="ghost" asChild className="hover:bg-lavender/10 hover:text-lavender">
                <Link to="/journal">Journal</Link>
              </Button>
              <Button variant="ghost" asChild className="hover:bg-lavender/10 hover:text-lavender">
                <Link to="/mood-tracker">Mood Tracker</Link>
              </Button>
              <Button variant="ghost" asChild className="hover:bg-lavender/10 hover:text-lavender">
                <Link to="/resources">Resources</Link>
              </Button>
              <Button variant="ghost" asChild className="hover:bg-lavender/10 hover:text-lavender">
                <Link to="/community">Community</Link>
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                asChild 
                className="hover:bg-lavender/10 hover:text-lavender"
              >
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">{userName}</span>
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-lavender text-lavender hover:bg-lavender/10"
                onClick={() => signOut()}
                disabled={loading}
              >
                <LogOut className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Sign Out</span>
              </Button>
            </div>
          ) : (
            <>
              <Button asChild variant="outline" className="border-lavender text-lavender hover:bg-lavender/10">
                <Link to="/sign-in">Sign In</Link>
              </Button>
              <Button asChild className="bg-lavender hover:bg-lavender/90 text-white">
                <Link to="/sign-up">Sign Up</Link>
              </Button>
            </>
          )}

          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border/40 py-4 animate-fade-in">
          <div className="container mx-auto flex flex-col space-y-2">
            <Button variant="ghost" asChild className="justify-start hover:bg-lavender/10 hover:text-lavender">
              <Link to="/">Home</Link>
            </Button>
            {user && (
              <>
                <Button variant="ghost" asChild className="justify-start hover:bg-lavender/10 hover:text-lavender">
                  <Link to="/daily-check">Daily Check</Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start hover:bg-lavender/10 hover:text-lavender">
                  <Link to="/journal">Journal</Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start hover:bg-lavender/10 hover:text-lavender">
                  <Link to="/mood-tracker">Mood Tracker</Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start hover:bg-lavender/10 hover:text-lavender">
                  <Link to="/resources">Resources</Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start hover:bg-lavender/10 hover:text-lavender">
                  <Link to="/community">Community</Link>
                </Button>
                <Button variant="ghost" asChild className="justify-start hover:bg-lavender/10 hover:text-lavender">
                  <Link to="/profile">Profile</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
