
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

type Post = {
  id: string;
  author: string;
  authorInitials: string;
  content: string;
  mood: string;
  createdAt: Date;
  likes: number;
  comments: number;
  tags: string[];
  userLiked: boolean;
};

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostMood, setNewPostMood] = useState("");
  const [newPostTags, setNewPostTags] = useState("");
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: "Aryan S.",
      authorInitials: "AS",
      content: "Finally managed to meditate for 10 minutes today without my mind wandering off completely. Small wins!",
      mood: "😊 Accomplished",
      createdAt: new Date(2025, 3, 5),
      likes: 24,
      comments: 7,
      tags: ["meditation", "mindfulness", "progress"],
      userLiked: false
    },
    {
      id: "2",
      author: "Priya M.",
      authorInitials: "PM",
      content: "Having one of those days where everything feels overwhelming. Anyone have simple grounding techniques they use when anxiety spikes?",
      mood: "😓 Anxious",
      createdAt: new Date(2025, 3, 6),
      likes: 18,
      comments: 12,
      tags: ["anxiety", "help", "coping"],
      userLiked: true
    },
    {
      id: "3",
      author: "Raj K.",
      authorInitials: "RK",
      content: "I started journaling last week and it's already helping me process emotions better. If you're on the fence about it, just try for 5 minutes a day!",
      mood: "🤔 Reflective",
      createdAt: new Date(2025, 3, 7),
      likes: 32,
      comments: 9,
      tags: ["journaling", "habits", "selfcare"],
      userLiked: false
    }
  ]);
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPostContent.trim()) {
      toast.error("Please write something before posting");
      return;
    }
    
    const tags = newPostTags
      .split(",")
      .map(tag => tag.trim().toLowerCase())
      .filter(tag => tag !== "");
    
    const newPost: Post = {
      id: Date.now().toString(),
      author: "You",
      authorInitials: "YO",
      content: newPostContent,
      mood: newPostMood || "😐 Neutral",
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      tags: tags,
      userLiked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostMood("");
    setNewPostTags("");
    toast.success("Post shared with the community!");
  };
  
  const toggleLike = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        const userLiked = !post.userLiked;
        const likes = userLiked ? post.likes + 1 : post.likes - 1;
        return { ...post, userLiked, likes };
      }
      return post;
    }));
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Community Space</h1>
          <p className="text-muted-foreground">
            Share your journey, ask questions, and connect with others in a supportive environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 mb-8">
              <form onSubmit={handlePostSubmit}>
                <h3 className="text-lg font-medium mb-4">Share with the community</h3>
                <div className="space-y-4">
                  <Textarea
                    placeholder="What's on your mind today?"
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[100px] resize-none"
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">How are you feeling?</label>
                      <select
                        value={newPostMood}
                        onChange={(e) => setNewPostMood(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                      >
                        <option value="">Select mood (optional)</option>
                        <option value="😊 Happy">😊 Happy</option>
                        <option value="😌 Calm">😌 Calm</option>
                        <option value="😓 Anxious">😓 Anxious</option>
                        <option value="😔 Sad">😔 Sad</option>
                        <option value="😠 Angry">😠 Angry</option>
                        <option value="🤔 Reflective">🤔 Reflective</option>
                        <option value="😴 Tired">😴 Tired</option>
                        <option value="😐 Neutral">😐 Neutral</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm mb-2">Tags (comma separated)</label>
                      <Input
                        placeholder="e.g., anxiety, self-care, question"
                        value={newPostTags}
                        onChange={(e) => setNewPostTags(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="btn-primary">
                      Share Post
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="mb-6 flex flex-wrap h-auto gap-2">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="support">Support Needed</TabsTrigger>
                <TabsTrigger value="wins">Celebrations & Wins</TabsTrigger>
                <TabsTrigger value="tips">Tips & Advice</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0 space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="p-6 hover:shadow-md transition-shadow duration-300">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.authorInitials}`} />
                        <AvatarFallback>{post.authorInitials}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{post.author}</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-2">
                              <span>{formatDate(post.createdAt)}</span>
                              <span>•</span>
                              <span>{post.mood}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-3 mb-4">
                          <p className="whitespace-pre-line">{post.content}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-lavender/20 hover:bg-lavender/30 text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-4 text-sm text-muted-foreground">
                          <button 
                            className={`flex items-center gap-1 hover:text-teal ${post.userLiked ? 'text-teal font-medium' : ''}`}
                            onClick={() => toggleLike(post.id)}
                          >
                            {post.userLiked ? '❤️' : '🤍'} {post.likes}
                          </button>
                          <button className="flex items-center gap-1 hover:text-teal">
                            💬 {post.comments}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="support" className="mt-0">
                <div className="text-center py-8">
                  <p>Filter applied: Support Needed posts</p>
                </div>
              </TabsContent>
              
              <TabsContent value="wins" className="mt-0">
                <div className="text-center py-8">
                  <p>Filter applied: Celebrations & Wins posts</p>
                </div>
              </TabsContent>
              
              <TabsContent value="tips" className="mt-0">
                <div className="text-center py-8">
                  <p>Filter applied: Tips & Advice posts</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-sm">
                <li>Be kind and respectful to others</li>
                <li>Keep content supportive and constructive</li>
                <li>Respect privacy and confidentiality</li>
                <li>Don't give or seek medical advice</li>
                <li>In crisis? Contact emergency services</li>
              </ul>
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full btn-outline" asChild>
                  <a href="#">Read Full Guidelines</a>
                </Button>
              </div>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Need Immediate Support?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you're in crisis or need immediate support, please contact:
              </p>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-medium">NIMHANS Mental Health Helpline</div>
                  <div className="text-muted-foreground">080-46110007</div>
                </div>
                <div>
                  <div className="font-medium">iCall Helpline</div>
                  <div className="text-muted-foreground">022-25521111</div>
                </div>
                <div>
                  <div className="font-medium">Vandrevala Foundation</div>
                  <div className="text-muted-foreground">9999 666 555</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CommunityPage;
