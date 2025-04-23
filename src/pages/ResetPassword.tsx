
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the URL contains a hash fragment (which indicates it's a valid reset link)
    if (!window.location.hash) {
      setInvalidLink(true);
      toast.error("Invalid or expired password reset link");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: password,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success("Password has been reset successfully");
      navigate("/sign-in");
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (invalidLink) {
    return (
      <MainLayout>
        <div className="container mx-auto max-w-md py-12">
          <Card className="p-6 shadow-lg border-lavender/20">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-red-500">Invalid Reset Link</h1>
              <p className="text-muted-foreground mt-2">
                This password reset link is invalid or has expired.
              </p>
            </div>
            
            <Button 
              className="w-full bg-lavender hover:bg-lavender/90 text-white" 
              onClick={() => navigate("/forgot-password")}
            >
              Request a new reset link
            </Button>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto max-w-md py-12">
        <Card className="p-6 shadow-lg border-lavender/20">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Reset Your Password</h1>
            <p className="text-muted-foreground mt-2">Enter your new password below</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
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
            
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
                  Resetting...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ResetPassword;
