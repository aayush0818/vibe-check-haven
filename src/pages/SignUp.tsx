
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    setIsLoading(true);
    
    // Simulating registration for now
    setTimeout(() => {
      toast.success("Account created successfully!");
      setIsLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="container mx-auto max-w-md py-8">
        <Card className="p-6 shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Join Moodly</h1>
            <p className="text-muted-foreground mt-2">Create your account to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                placeholder="Your Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                required
              />
              <label 
                htmlFor="terms" 
                className="text-sm text-muted-foreground"
              >
                I accept the{" "}
                <Link to="/terms" className="text-teal hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-teal hover:underline">Privacy Policy</Link>
              </label>
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || !acceptTerms}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </Button>
            
            <div className="text-center text-sm mt-4">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link to="/sign-in" className="text-teal hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SignUp;
