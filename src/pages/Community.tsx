
import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { MessageSquare, ThumbsUp, Share2, Flag, Heart, Bookmark, Send } from "lucide-react";

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
  saved: boolean;
  commentsList: Comment[];
};

type Comment = {
  id: string;
  author: string;
  authorInitials: string;
  content: string;
  createdAt: Date;
  likes: number;
  userLiked: boolean;
};

const CommunityPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostMood, setNewPostMood] = useState("");
  const [newPostTags, setNewPostTags] = useState("");
  const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("Guest");
  
  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem("moodly_user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.isLoggedIn) {
        setIsLoggedIn(true);
        setUserName(userData.name || "User");
      }
    }
  }, []);
  
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
      userLiked: false,
      saved: false,
      commentsList: [
        {
          id: "c1",
          author: "Priya M.",
          authorInitials: "PM",
          content: "That's amazing! I'm still working up to 5 minutes without getting distracted.",
          createdAt: new Date(2025, 3, 5, 14, 30),
          likes: 5,
          userLiked: false
        },
        {
          id: "c2",
          author: "Raj K.",
          authorInitials: "RK",
          content: "Have you tried using any guided meditation apps? They've really helped me stay focused.",
          createdAt: new Date(2025, 3, 5, 16, 45),
          likes: 3,
          userLiked: false
        }
      ]
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
      userLiked: true,
      saved: true,
      commentsList: [
        {
          id: "c3",
          author: "Divya T.",
          authorInitials: "DT",
          content: "I use the 5-4-3-2-1 technique. Name 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. It helps bring me back to the present.",
          createdAt: new Date(2025, 3, 6, 10, 15),
          likes: 14,
          userLiked: true
        },
        {
          id: "c4",
          author: "Karan P.",
          authorInitials: "KP",
          content: "Deep breathing works wonders for me. Breathe in for 4 counts, hold for 7, exhale for 8. Repeat a few times.",
          createdAt: new Date(2025, 3, 6, 11, 20),
          likes: 8,
          userLiked: false
        }
      ]
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
      userLiked: false,
      saved: false,
      commentsList: [
        {
          id: "c5",
          author: "Neha S.",
          authorInitials: "NS",
          content: "What journal prompts have you found most helpful? I've been wanting to start but never know what to write.",
          createdAt: new Date(2025, 3, 7, 9, 10),
          likes: 6,
          userLiked: false
        },
        {
          id: "c6",
          author: "Aryan S.",
          authorInitials: "AS",
          content: "Journaling changed everything for me too! I used to overthink constantly before I started writing things down.",
          createdAt: new Date(2025, 3, 7, 13, 40),
          likes: 5,
          userLiked: false
        }
      ]
    }
  ]);
  
  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("Please sign in to post in the community");
      return;
    }
    
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
      author: userName,
      authorInitials: userName.split(" ").map(n => n[0]).join("").toUpperCase(),
      content: newPostContent,
      mood: newPostMood || "😐 Neutral",
      createdAt: new Date(),
      likes: 0,
      comments: 0,
      tags: tags,
      userLiked: false,
      saved: false,
      commentsList: []
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
  
  const toggleSave = (id: string) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return { ...post, saved: !post.saved };
      }
      return post;
    }));
    
    const post = posts.find(p => p.id === id);
    if (post) {
      toast.success(post.saved ? "Post removed from saved items" : "Post saved for later");
    }
  };
  
  const toggleCommentLike = (postId: string, commentId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.commentsList.map(comment => {
          if (comment.id === commentId) {
            const userLiked = !comment.userLiked;
            const likes = userLiked ? comment.likes + 1 : comment.likes - 1;
            return { ...comment, userLiked, likes };
          }
          return comment;
        });
        return { ...post, commentsList: updatedComments };
      }
      return post;
    }));
  };
  
  const handleAddComment = (postId: string) => {
    if (!isLoggedIn) {
      toast.error("Please sign in to comment");
      return;
    }
    
    if (!newComment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    
    const newCommentObj: Comment = {
      id: `c${Date.now()}`,
      author: userName,
      authorInitials: userName.split(" ").map(n => n[0]).join("").toUpperCase(),
      content: newComment,
      createdAt: new Date(),
      likes: 0,
      userLiked: false
    };
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedCommentsList = [...post.commentsList, newCommentObj];
        return { 
          ...post, 
          commentsList: updatedCommentsList,
          comments: updatedCommentsList.length
        };
      }
      return post;
    }));
    
    setNewComment("");
    toast.success("Comment added");
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4">
        <div className="mb-8 bg-gradient-to-r from-lavender/20 to-teal/20 p-6 rounded-lg">
          <h1 className="text-3xl md:text-4xl font-bold">Community Space</h1>
          <p className="text-muted-foreground">
            Share your journey, ask questions, and connect with others in a supportive environment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="p-6 mb-8 border-lavender/20 shadow-md">
              <form onSubmit={handlePostSubmit}>
                <h3 className="text-lg font-medium mb-4">Share with the community</h3>
                <div className="space-y-4">
                  <Textarea
                    placeholder={isLoggedIn ? "What's on your mind today?" : "Sign in to share your thoughts..."}
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="min-h-[100px] resize-none border-lavender/20 focus-visible:ring-lavender"
                    disabled={!isLoggedIn}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2">How are you feeling?</label>
                      <select
                        value={newPostMood}
                        onChange={(e) => setNewPostMood(e.target.value)}
                        className="w-full rounded-md border border-lavender/20 bg-background px-3 py-2 focus:ring-lavender focus:border-lavender"
                        disabled={!isLoggedIn}
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
                        className="border-lavender/20 focus-visible:ring-lavender"
                        disabled={!isLoggedIn}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-lavender hover:bg-lavender/90 text-white"
                      disabled={!isLoggedIn}
                    >
                      {isLoggedIn ? "Share Post" : "Sign in to Post"}
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
            
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="mb-6 flex flex-wrap h-auto gap-2 bg-lavender/10">
                <TabsTrigger value="all" className="data-[state=active]:bg-lavender data-[state=active]:text-white">All Posts</TabsTrigger>
                <TabsTrigger value="support" className="data-[state=active]:bg-lavender data-[state=active]:text-white">Support Needed</TabsTrigger>
                <TabsTrigger value="wins" className="data-[state=active]:bg-lavender data-[state=active]:text-white">Celebrations & Wins</TabsTrigger>
                <TabsTrigger value="tips" className="data-[state=active]:bg-lavender data-[state=active]:text-white">Tips & Advice</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-0 space-y-6">
                {posts.map((post) => (
                  <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow duration-300 border-lavender/20">
                    <div className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${post.authorInitials}&backgroundColor=8b5cf6`} />
                        <AvatarFallback className="bg-lavender text-white">{post.authorInitials}</AvatarFallback>
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
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={post.saved ? "text-lavender" : "text-muted-foreground"}
                            onClick={() => toggleSave(post.id)}
                          >
                            <Bookmark className="h-4 w-4 mr-1" />
                            {post.saved ? "Saved" : "Save"}
                          </Button>
                        </div>
                        
                        <div className="mt-3 mb-4">
                          <p className="whitespace-pre-line">{post.content}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-lavender/10 hover:bg-lavender/30 text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex gap-4 text-sm text-muted-foreground border-t border-b py-2 my-3">
                          <button 
                            className={`flex items-center gap-1 hover:text-lavender ${post.userLiked ? 'text-lavender font-medium' : ''}`}
                            onClick={() => toggleLike(post.id)}
                          >
                            {post.userLiked ? (
                              <Heart className="h-4 w-4 fill-lavender text-lavender" />
                            ) : (
                              <Heart className="h-4 w-4" />
                            )}
                            {post.likes}
                          </button>
                          
                          <button 
                            className="flex items-center gap-1 hover:text-lavender"
                            onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            {post.comments}
                          </button>
                          
                          <button className="flex items-center gap-1 hover:text-lavender ml-auto">
                            <Share2 className="h-4 w-4" />
                            Share
                          </button>
                          
                          <button className="flex items-center gap-1 hover:text-red-500">
                            <Flag className="h-4 w-4" />
                            Report
                          </button>
                        </div>
                        
                        {expandedPostId === post.id && (
                          <div className="mt-4 space-y-4 animate-fade-in">
                            {post.commentsList.map((comment) => (
                              <div key={comment.id} className="flex gap-3 p-3 bg-muted/30 rounded-md">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${comment.authorInitials}&backgroundColor=8b5cf6`} />
                                  <AvatarFallback className="text-xs bg-lavender text-white">{comment.authorInitials}</AvatarFallback>
                                </Avatar>
                                
                                <div className="flex-1">
                                  <div className="flex items-center gap-2">
                                    <span className="font-medium text-sm">{comment.author}</span>
                                    <span className="text-xs text-muted-foreground">
                                      {formatDate(comment.createdAt)} at {formatTime(comment.createdAt)}
                                    </span>
                                  </div>
                                  
                                  <p className="text-sm my-1">{comment.content}</p>
                                  
                                  <button 
                                    className={`text-xs flex items-center gap-1 mt-1 ${comment.userLiked ? 'text-lavender' : 'text-muted-foreground'}`}
                                    onClick={() => toggleCommentLike(post.id, comment.id)}
                                  >
                                    {comment.userLiked ? (
                                      <ThumbsUp className="h-3 w-3 fill-lavender text-lavender" />
                                    ) : (
                                      <ThumbsUp className="h-3 w-3" />
                                    )}
                                    {comment.likes}
                                  </button>
                                </div>
                              </div>
                            ))}
                            
                            <div className="flex gap-2 mt-3">
                              <Input
                                placeholder={isLoggedIn ? "Write a comment..." : "Sign in to comment..."}
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="border-lavender/20 focus-visible:ring-lavender"
                                disabled={!isLoggedIn}
                              />
                              <Button 
                                size="sm" 
                                onClick={() => handleAddComment(post.id)}
                                disabled={!isLoggedIn}
                                className="bg-lavender hover:bg-lavender/90 text-white"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="support" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <p>Filter applied: Support Needed posts</p>
                  <p className="text-sm text-muted-foreground mt-2">Posts asking for help or support will appear here.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="wins" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <p>Filter applied: Celebrations & Wins posts</p>
                  <p className="text-sm text-muted-foreground mt-2">Posts celebrating victories, big or small, will appear here.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="tips" className="mt-0">
                <div className="bg-muted/30 rounded-lg p-8 text-center">
                  <p>Filter applied: Tips & Advice posts</p>
                  <p className="text-sm text-muted-foreground mt-2">Posts sharing helpful advice and resources will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="space-y-6">
            <Card className="p-6 border-lavender/20 shadow-md">
              <h3 className="text-lg font-medium mb-4">Community Guidelines</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex gap-2 items-start">
                  <span className="text-lavender">•</span>
                  <span>Be kind and respectful to others</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-lavender">•</span>
                  <span>Keep content supportive and constructive</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-lavender">•</span>
                  <span>Respect privacy and confidentiality</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-lavender">•</span>
                  <span>Don't give or seek medical advice</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-lavender">•</span>
                  <span>In crisis? Contact emergency services</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t">
                <Button className="w-full border-lavender text-lavender hover:bg-lavender/10" variant="outline" asChild>
                  <a href="#">Read Full Guidelines</a>
                </Button>
              </div>
            </Card>
            
            <Card className="p-6 border-lavender/20 shadow-md">
              <h3 className="text-lg font-medium mb-4">Need Immediate Support?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                If you're in crisis or need immediate support, please contact:
              </p>
              <div className="space-y-3 text-sm">
                <div className="p-3 border border-lavender/20 rounded-lg hover:bg-lavender/5 transition-colors">
                  <div className="font-medium">NIMHANS Mental Health Helpline</div>
                  <div className="text-muted-foreground">080-46110007</div>
                </div>
                <div className="p-3 border border-lavender/20 rounded-lg hover:bg-lavender/5 transition-colors">
                  <div className="font-medium">iCall Helpline</div>
                  <div className="text-muted-foreground">022-25521111</div>
                </div>
                <div className="p-3 border border-lavender/20 rounded-lg hover:bg-lavender/5 transition-colors">
                  <div className="font-medium">Vandrevala Foundation</div>
                  <div className="text-muted-foreground">9999 666 555</div>
                </div>
                <div className="p-3 border border-lavender/20 rounded-lg hover:bg-lavender/5 transition-colors">
                  <div className="font-medium">Arpita Suicide Prevention</div>
                  <div className="text-muted-foreground">080-25251444</div>
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
