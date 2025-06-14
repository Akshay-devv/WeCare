import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ArrowLeft, 
  Stethoscope, 
  Brain, 
  Heart, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  MessageCircle,
  Users,
  Activity,
  Thermometer,
  Eye,
  Headphones,
  Zap,
  ChevronRight,
  Search,
  Filter,
  X
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmergencySOSButton from "@/components/EmergencySOSButton";

const SymptomChecker = () => {
  const navigate = useNavigate();
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("general");

  const symptomCategories = [
    { id: "general", name: "General", icon: Activity, color: "bg-blue-500" },
    { id: "head", name: "Head & Neck", icon: Brain, color: "bg-purple-500" },
    { id: "chest", name: "Chest & Heart", icon: Heart, color: "bg-red-500" },
    { id: "stomach", name: "Stomach", icon: Thermometer, color: "bg-orange-500" },
    { id: "eyes", name: "Eyes", icon: Eye, color: "bg-indigo-500" },
    { id: "ears", name: "Ears", icon: Headphones, color: "bg-pink-500" }
  ];

  const commonSymptoms = {
    general: ["Fever", "Fatigue", "Body aches", "Loss of appetite", "Night sweats"],
    head: ["Headache", "Dizziness", "Nausea", "Vision problems", "Neck pain"],
    chest: ["Chest pain", "Shortness of breath", "Cough", "Heart palpitations", "Back pain"],
    stomach: ["Abdominal pain", "Nausea", "Vomiting", "Diarrhea", "Bloating"],
    eyes: ["Eye pain", "Blurred vision", "Redness", "Itching", "Sensitivity to light"],
    ears: ["Ear pain", "Hearing loss", "Ringing", "Drainage", "Pressure"]
  };

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const severity = Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "low";
      const urgency = severity === "high" ? "immediate" : severity === "medium" ? "soon" : "routine";
      
      setAnalysisResult({
        severity,
        urgency,
        possibleConditions: [
          "Common cold",
          "Seasonal allergies", 
          "Stress-related symptoms"
        ],
        recommendations: [
          "Rest and stay hydrated",
          "Monitor symptoms for 24-48 hours",
          "Contact doctor if symptoms worsen"
        ],
        emergency: severity === "high"
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const addSymptom = (symptom: string) => {
    if (!symptoms.includes(symptom)) {
      setSymptoms(prev => prev ? `${prev}, ${symptom}` : symptom);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "text-red-600 bg-red-50 border-red-200";
      case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case "immediate": return <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "soon": return <Clock className="h-4 w-4 sm:h-5 sm:w-5" />;
      case "routine": return <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />;
      default: return <Clock className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center h-14 sm:h-16">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="p-2 sm:p-2 mr-2 sm:mr-3"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">AI Symptom Checker</h1>
                <p className="text-xs sm:text-sm text-gray-500">Get instant health insights</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Input Section */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span>Describe Your Symptoms</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Be as detailed as possible for better analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="symptoms" className="text-sm sm:text-base font-medium">
                    What symptoms are you experiencing?
                  </Label>
                  <Textarea
                    id="symptoms"
                    placeholder="e.g., headache, fever, fatigue, nausea..."
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-sm sm:text-base font-medium">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-sm sm:text-base font-medium">Gender</Label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <Button 
                  onClick={handleAnalyze}
                  disabled={!symptoms.trim() || isAnalyzing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-sm sm:text-base py-2 sm:py-3"
                >
                  {isAnalyzing ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Analyze Symptoms</span>
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Analysis Result */}
            {analysisResult && (
              <Card className={`border-2 ${getSeverityColor(analysisResult.severity)}`}>
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                      {getUrgencyIcon(analysisResult.urgency)}
                      <span>Analysis Results</span>
                    </CardTitle>
                    <Badge 
                      variant="outline" 
                      className={`text-xs sm:text-sm ${getSeverityColor(analysisResult.severity)}`}
                    >
                      {analysisResult.severity.toUpperCase()} SEVERITY
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  <div>
                    <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-3">Possible Conditions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysisResult.possibleConditions.map((condition: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs sm:text-sm">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm sm:text-base mb-2 sm:mb-3">Recommendations:</h4>
                    <ul className="space-y-2">
                      {analysisResult.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2 text-sm sm:text-base">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {analysisResult.emergency && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <AlertTriangle className="h-5 w-6 sm:h-6 sm:w-6 text-red-600" />
                        <h4 className="font-semibold text-red-800 text-sm sm:text-base">Emergency Warning</h4>
                      </div>
                      <p className="text-red-700 text-sm sm:text-base mb-3">
                        These symptoms may require immediate medical attention.
                      </p>
                      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="text-xs sm:text-sm"
                          onClick={() => navigate("/emergency")}
                        >
                          Emergency SOS
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-red-300 text-red-700 hover:bg-red-100 text-xs sm:text-sm"
                          onClick={() => navigate("/doctors")}
                        >
                          Find Doctor
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs sm:text-sm"
                  onClick={() => navigate("/doctors")}
                >
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Find a Doctor
                </Button>
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
                  onClick={() => navigate("/emergency")}
                >
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Emergency SOS
                </Button>
              </CardContent>
            </Card>

            {/* Common Symptoms */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                  <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span>Common Symptoms</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
                  {symptomCategories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm rounded-full transition-colors ${
                        selectedCategory === category.id
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                {/* Symptoms List */}
                <div className="space-y-2">
                  {commonSymptoms[selectedCategory as keyof typeof commonSymptoms]?.map((symptom, index) => (
                    <button
                      key={index}
                      onClick={() => addSymptom(symptom)}
                      className="w-full text-left p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors text-xs sm:text-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span>{symptom}</span>
                        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Health Tips */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base text-blue-800">💡 Health Tip</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs sm:text-sm text-blue-700">
                  Always consult with a healthcare professional for accurate diagnosis. 
                  This tool provides general guidance only.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Floating Emergency SOS Button */}
      <EmergencySOSButton />
    </div>
  );
};

export default SymptomChecker;
