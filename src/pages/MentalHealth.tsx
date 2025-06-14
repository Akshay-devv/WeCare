import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Brain, 
  Heart, 
  BookOpen, 
  Video, 
  Headphones, 
  Users, 
  Calendar,
  Clock,
  Award,
  CheckCircle,
  X,
  Plus,
  Minus,
  Zap,
  Smile,
  Activity,
  Target,
  TrendingUp,
  Shield,
  AlertTriangle,
  Phone,
  MessageCircle,
  Play,
  Download,
  Share2,
  Bookmark,
  Star
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Resource {
  id: string;
  title: string;
  type: "article" | "video" | "audio" | "exercise";
  duration: string;
  description: string;
  rating: number;
  tags: string[];
  image?: string;
  url: string;
}

interface MoodTracker {
  date: string;
  mood: "happy" | "sad" | "anxious" | "angry" | "neutral";
  energy: number;
  sleep: number;
  notes: string;
}

const MentalHealth = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentMood, setCurrentMood] = useState("");
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [energyLevel, setEnergyLevel] = useState(5);
  const [sleepHours, setSleepHours] = useState(7);
  const [moodNotes, setMoodNotes] = useState("");

  const categories = [
    { id: "all", name: "All", icon: Brain, color: "bg-purple-500" },
    { id: "anxiety", name: "Anxiety", icon: Activity, color: "bg-yellow-500" },
    { id: "depression", name: "Depression", icon: Heart, color: "bg-blue-500" },
    { id: "stress", name: "Stress", icon: Target, color: "bg-orange-500" },
    { id: "sleep", name: "Sleep", icon: Clock, color: "bg-indigo-500" },
    { id: "mindfulness", name: "Mindfulness", icon: Smile, color: "bg-green-500" }
  ];

  const moodOptions = [
    { value: "happy", label: "Happy", icon: "😊", color: "bg-green-100 text-green-800" },
    { value: "sad", label: "Sad", icon: "😢", color: "bg-blue-100 text-blue-800" },
    { value: "anxious", label: "Anxious", icon: "😰", color: "bg-yellow-100 text-yellow-800" },
    { value: "angry", label: "Angry", icon: "😠", color: "bg-red-100 text-red-800" },
    { value: "neutral", label: "Neutral", icon: "😐", color: "bg-gray-100 text-gray-800" }
  ];

  const resources: Resource[] = [
    {
      id: "1",
      title: "Understanding Anxiety: A Complete Guide",
      type: "article",
      duration: "10 min read",
      description: "Learn about the causes, symptoms, and coping strategies for anxiety disorders.",
      rating: 4.8,
      tags: ["anxiety", "education", "coping"],
      url: "#"
    },
    {
      id: "2",
      title: "Mindfulness Meditation for Beginners",
      type: "video",
      duration: "15 min",
      description: "A guided meditation session to help you start your mindfulness journey.",
      rating: 4.9,
      tags: ["mindfulness", "meditation", "beginner"],
      url: "#"
    },
    {
      id: "3",
      title: "Deep Breathing Exercise",
      type: "audio",
      duration: "5 min",
      description: "Simple breathing techniques to reduce stress and anxiety.",
      rating: 4.7,
      tags: ["breathing", "stress", "relaxation"],
      url: "#"
    },
    {
      id: "4",
      title: "Progressive Muscle Relaxation",
      type: "exercise",
      duration: "12 min",
      description: "Step-by-step guide to release tension from your body.",
      rating: 4.6,
      tags: ["relaxation", "exercise", "tension"],
      url: "#"
    },
    {
      id: "5",
      title: "Sleep Hygiene: Better Sleep Habits",
      type: "article",
      duration: "8 min read",
      description: "Practical tips to improve your sleep quality and establish healthy sleep patterns.",
      rating: 4.8,
      tags: ["sleep", "hygiene", "habits"],
      url: "#"
    },
    {
      id: "6",
      title: "Cognitive Behavioral Therapy Basics",
      type: "video",
      duration: "20 min",
      description: "Introduction to CBT techniques for managing negative thoughts.",
      rating: 4.9,
      tags: ["CBT", "therapy", "thoughts"],
      url: "#"
    }
  ];

  const moodHistory: MoodTracker[] = [
    { date: "2024-01-15", mood: "happy", energy: 8, sleep: 7, notes: "Had a great day at work" },
    { date: "2024-01-14", mood: "neutral", energy: 6, sleep: 6, notes: "Regular day" },
    { date: "2024-01-13", mood: "anxious", energy: 4, sleep: 5, notes: "Feeling stressed about presentation" },
    { date: "2024-01-12", mood: "sad", energy: 3, sleep: 8, notes: "Missing family" },
    { date: "2024-01-11", mood: "happy", energy: 7, sleep: 7, notes: "Good workout session" }
  ];

  const filteredResources = selectedCategory === "all" 
    ? resources 
    : resources.filter(resource => resource.tags.includes(selectedCategory));

  const handleMoodSubmit = () => {
    if (!currentMood) return;
    
    const newMoodEntry: MoodTracker = {
      date: new Date().toISOString().split('T')[0],
      mood: currentMood as any,
      energy: energyLevel,
      sleep: sleepHours,
      notes: moodNotes
    };
    
    // In a real app, this would save to the database
    console.log("Mood entry saved:", newMoodEntry);
    setShowMoodTracker(false);
    setCurrentMood("");
    setMoodNotes("");
  };

  const getMoodIcon = (mood: string) => {
    const moodOption = moodOptions.find(m => m.value === mood);
    return moodOption?.icon || "😐";
  };

  const getMoodColor = (mood: string) => {
    const moodOption = moodOptions.find(m => m.value === mood);
    return moodOption?.color || "bg-gray-100 text-gray-800";
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article": return <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "video": return <Video className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "audio": return <Headphones className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "exercise": return <Activity className="h-4 w-4 sm:h-5 sm:w-5" />;
      default: return <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate(-1)}
                className="p-2 sm:p-2"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-lg flex items-center justify-center">
                  <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Mental Health</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Resources and support for your wellbeing</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMoodTracker(true)}
                className="text-xs sm:text-sm"
              >
                <Smile className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                Track Mood
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-center sm:text-left">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Your Mental Health Matters</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">
                    Access resources, track your mood, and find support for your mental wellbeing.
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                      onClick={() => navigate("/anonymous-chat")}
                    >
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                      Chat with Support
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-green-300 text-green-700 hover:bg-green-100 text-xs sm:text-sm"
                      onClick={() => setShowMoodTracker(true)}
                    >
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                      Track Your Mood
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Category Filter */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">Mental Health Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-colors text-xs sm:text-sm ${
                        selectedCategory === category.id
                          ? "bg-purple-100 text-purple-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <category.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>{category.name}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {filteredResources.map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className="space-y-3 sm:space-y-4">
                      {/* Resource Header */}
                      <div className="flex items-start justify-between">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 ${getMoodColor(resource.type)} rounded-lg flex items-center justify-center`}>
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                          <span className="text-xs sm:text-sm font-medium">{resource.rating}</span>
                        </div>
                      </div>

                      {/* Resource Content */}
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-1 line-clamp-2">
                          {resource.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mb-2 line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mb-3">
                          <span>{resource.duration}</span>
                          <span>•</span>
                          <span className="capitalize">{resource.type}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {resource.tags.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{resource.tags.length - 2}
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                        >
                          <Play className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Start
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs sm:text-sm"
                        >
                          <Bookmark className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredResources.length === 0 && (
              <Card>
                <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12 text-center">
                  <Brain className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No resources found</h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-4">
                    Try selecting a different category or check back later for new content.
                  </p>
                  <Button onClick={() => setSelectedCategory("all")} variant="outline">
                    View All Resources
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Mood Tracker Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span>Mood Tracker</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Current Week Mood */}
                <div>
                  <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">This Week</h4>
                  <div className="flex space-x-1">
                    {moodHistory.slice(0, 5).map((entry, index) => (
                      <div key={index} className="flex-1 text-center">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 ${getMoodColor(entry.mood)} rounded-lg flex items-center justify-center mx-auto mb-1`}>
                          <span className="text-sm sm:text-base">{getMoodIcon(entry.mood)}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <span className="text-xs sm:text-sm text-gray-600">Avg Energy</span>
                    <span className="text-sm sm:text-base font-bold text-blue-600">
                      {(moodHistory.reduce((sum, entry) => sum + entry.energy, 0) / moodHistory.length).toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg">
                    <span className="text-xs sm:text-sm text-gray-600">Avg Sleep</span>
                    <span className="text-sm sm:text-base font-bold text-green-600">
                      {(moodHistory.reduce((sum, entry) => sum + entry.sleep, 0) / moodHistory.length).toFixed(1)}h
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => setShowMoodTracker(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                >
                  <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  Add Today's Mood
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs sm:text-sm"
                  onClick={() => navigate("/anonymous-chat")}
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Chat with Support
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs sm:text-sm"
                  onClick={() => navigate("/doctors")}
                >
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Find Therapist
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs sm:text-sm"
                  onClick={() => navigate("/symptom-checker")}
                >
                  <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Mental Health Check
                </Button>
              </CardContent>
            </Card>

            {/* Crisis Resources */}
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base text-red-800 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Crisis Support</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs sm:text-sm border-red-300 text-red-700 hover:bg-red-100"
                  onClick={() => navigate("/emergency")}
                >
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Emergency SOS
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs sm:text-sm border-red-300 text-red-700 hover:bg-red-100"
                  onClick={() => window.open("tel:108")}
                >
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Emergency: 108
                </Button>
                <p className="text-xs sm:text-sm text-red-600">
                  If you're in crisis, please reach out for immediate help.
                </p>
              </CardContent>
            </Card>

            {/* Wellness Tips */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600" />
                  <span>Wellness Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-pink-500" />
                    <span>Practice gratitude daily</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-pink-500" />
                    <span>Stay connected with loved ones</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-pink-500" />
                    <span>Get regular exercise</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-pink-500" />
                    <span>Maintain a sleep schedule</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mood Tracker Modal */}
      {showMoodTracker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                <Smile className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <span>Track Your Mood</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Mood Selection */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-sm sm:text-base font-medium">How are you feeling today?</label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setCurrentMood(mood.value)}
                      className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-center ${
                        currentMood === mood.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="text-lg sm:text-xl mb-1">{mood.icon}</div>
                      <div className="text-xs sm:text-sm font-medium">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Energy Level */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-sm sm:text-base font-medium">Energy Level (1-10)</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEnergyLevel(Math.max(1, energyLevel - 1))}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-lg sm:text-xl font-semibold min-w-[2rem] text-center">{energyLevel}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEnergyLevel(Math.min(10, energyLevel + 1))}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <Progress value={energyLevel * 10} className="w-full" />
              </div>

              {/* Sleep Hours */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-sm sm:text-base font-medium">Hours of Sleep Last Night</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSleepHours(Math.max(0, sleepHours - 1))}
                    className="w-8 h-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-lg sm:text-xl font-semibold min-w-[2rem] text-center">{sleepHours}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSleepHours(Math.min(12, sleepHours + 1))}
                    className="w-8 h-8 p-0"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2 sm:space-y-3">
                <label className="text-sm sm:text-base font-medium">Notes (optional)</label>
                <textarea
                  value={moodNotes}
                  onChange={(e) => setMoodNotes(e.target.value)}
                  placeholder="How was your day? Any specific feelings or events?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={handleMoodSubmit}
                  disabled={!currentMood}
                  className="flex-1"
                >
                  Save Entry
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowMoodTracker(false)}
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MentalHealth;
