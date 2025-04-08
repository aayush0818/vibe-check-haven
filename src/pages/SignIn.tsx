
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, user, loading } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
  };

  return (
    <MainLayout>
      <div className="container mx-auto max-w-md py-12">
        <Card className="p-6 shadow-lg border-lavender/20">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Welcome Back to Moodly</h1>
            <p className="text-muted-foreground mt-2">Sign in to continue your journey</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-lavender/20 focus-visible:ring-lavender"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-xs text-lavender hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-lavender/20 focus-visible:ring-lavender"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-lavender hover:bg-lavender/90 text-white" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            
            <div className="text-center text-sm mt-4">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/sign-up" className="text-lavender hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SignIn;
