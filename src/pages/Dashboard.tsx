import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Heart, 
  Shield, 
  Brain, 
  Stethoscope, 
  MessageCircle, 
  Users, 
  Clock,
  LogOut,
  Menu,
  Bell,
  Activity,
  Home,
  User,
  Calendar,
  TrendingUp,
  Award,
  Phone
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import EmergencySOSButton from "@/components/EmergencySOSButton";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard = ({ onLogout }: DashboardProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  const quickActions = [
    {
      title: "AI Symptom Checker",
      description: "Describe your symptoms for AI analysis",
      icon: Stethoscope,
      color: "bg-blue-500",
      path: "/symptom-checker"
    },
    {
      title: "Emergency SOS",
      description: "Connect to nearest ambulance",
      icon: Shield,
      color: "bg-red-500",
      path: "/emergency"
    },
    {
      title: "Anonymous Chat",
      description: "24/7 mental health support",
      icon: MessageCircle,
      color: "bg-green-500",
      path: "/anonymous-chat"
    },
    {
      title: "Find Doctors",
      description: "Verified healthcare professionals",
      icon: Users,
      color: "bg-purple-500",
      path: "/doctors"
    }
  ];

  const recentActivity = [
    { type: "symptom", text: "Checked symptoms for headache", time: "2 hours ago" },
    { type: "chat", text: "Anonymous chat session", time: "1 day ago" },
    { type: "doctor", text: "Consultation with Dr. Smith", time: "3 days ago" }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "physical":
        return (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Physical Health</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Card className="cursor-pointer hover:shadow-md transition-shadow p-3 sm:p-4">
                <CardContent className="pt-2 sm:pt-4 pb-2 sm:pb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                    <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h3 className="font-medium text-sm sm:text-base text-gray-900 mb-1">Symptom Checker</h3>
                  <p className="text-xs sm:text-sm text-gray-500">AI-powered analysis</p>
                </CardContent>
              </Card>
              <Card className="cursor-pointer hover:shadow-md transition-shadow p-3 sm:p-4">
                <CardContent className="pt-2 sm:pt-4 pb-2 sm:pb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-2 sm:mb-3">
                    <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                  </div>
                  <h3 className="font-medium text-sm sm:text-base text-gray-900 mb-1">Find Doctors</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Verified professionals</p>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      case "mental":
        return (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Mental Health</h2>
            <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <CardTitle className="text-sm sm:text-base text-green-800">Wellbeing Support</CardTitle>
                </div>
                <CardDescription className="text-xs sm:text-sm text-green-700">
                  Your mental health matters. Connect with support anytime.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-green-300 text-green-700 hover:bg-green-100 text-xs sm:text-sm"
                    onClick={() => navigate("/mental-health")}
                  >
                    Resources
                  </Button>
                  <Button 
                    size="sm" 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-xs sm:text-sm"
                    onClick={() => navigate("/anonymous-chat")}
                  >
                    Chat Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case "profile":
        return (
          <div className="space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Profile</h2>
            
            {/* User Info Card */}
            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
                  <Avatar className="h-12 w-12 sm:h-16 sm:w-16 mx-auto sm:mx-0">
                    <AvatarFallback className="bg-red-500 text-white text-sm sm:text-lg">AK</AvatarFallback>
                  </Avatar>
                  <div className="text-center sm:text-left">
                    <h3 className="font-semibold text-base sm:text-lg">Akshay</h3>
                    <p className="text-sm sm:text-base text-gray-500">akshay@example.com</p>
                    <p className="text-sm sm:text-base text-gray-500">Age: 18</p>
                    <Badge variant="outline" className="mt-1 text-xs sm:text-sm">Blood Type: A+</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Health Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span>Health Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div className="text-center p-2 sm:p-3 bg-blue-50 rounded-lg">
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">12</p>
                    <p className="text-xs sm:text-sm text-gray-600">Health Checks</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-green-50 rounded-lg">
                    <p className="text-xl sm:text-2xl font-bold text-green-600">5</p>
                    <p className="text-xs sm:text-sm text-gray-600">Chat Sessions</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-purple-50 rounded-lg">
                    <p className="text-xl sm:text-2xl font-bold text-purple-600">3</p>
                    <p className="text-xs sm:text-sm text-gray-600">Consultations</p>
                  </div>
                  <div className="text-center p-2 sm:p-3 bg-orange-50 rounded-lg">
                    <p className="text-xl sm:text-2xl font-bold text-orange-600">0</p>
                    <p className="text-xs sm:text-sm text-gray-600">Emergencies</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
                  <span>Achievements</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-yellow-50 rounded-lg">
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base text-gray-900">First Health Check</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Completed your first symptom check</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 bg-green-50 rounded-lg">
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base text-gray-900">Chat Champion</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Completed 5 chat sessions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-4 sm:space-y-6">
            {/* Welcome Section */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-center">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Welcome back, Akshay!</h2>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">How can we help you today?</p>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                      onClick={() => navigate("/symptom-checker")}
                    >
                      Check Symptoms
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-blue-300 text-blue-700 hover:bg-blue-100 text-xs sm:text-sm"
                      onClick={() => navigate("/doctors")}
                    >
                      Find Doctor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {quickActions.map((action, index) => (
                  <Card 
                    key={index} 
                    className="cursor-pointer hover:shadow-md transition-shadow p-3 sm:p-4"
                    onClick={() => navigate(action.path)}
                  >
                    <CardContent className="pt-2 sm:pt-4 pb-2 sm:pb-4">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 ${action.color} rounded-lg flex items-center justify-center mb-2 sm:mb-3`}>
                        <action.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <h4 className="font-medium text-sm sm:text-base text-gray-900 mb-1">{action.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-500">{action.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Activity</h3>
              <Card>
                <CardContent className="pt-4 sm:pt-6">
                  <div className="space-y-3 sm:space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                          {activity.type === "symptom" && <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />}
                          {activity.type === "chat" && <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />}
                          {activity.type === "doctor" && <Users className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm sm:text-base text-gray-900">{activity.text}</p>
                          <p className="text-xs sm:text-sm text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">We Care</h1>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
              <Button variant="ghost" size="sm" className="p-2 sm:p-2">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={onLogout} className="p-2 sm:p-2">
                <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="pt-4 sm:pt-6">
                <nav className="space-y-1 sm:space-y-2">
                  {[
                    { id: "home", label: "Home", icon: Home },
                    { id: "physical", label: "Physical Health", icon: Activity },
                    { id: "mental", label: "Mental Health", icon: Brain },
                    { id: "profile", label: "Profile", icon: User }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <tab.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-sm sm:text-base font-medium">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>

      {/* Floating Emergency SOS Button */}
      <EmergencySOSButton />
    </div>
  );
};

export default Dashboard;
