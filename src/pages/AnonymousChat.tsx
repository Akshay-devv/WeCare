import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  MessageCircle, 
  Send, 
  User, 
  Bot, 
  Shield, 
  Heart, 
  Clock,
  Phone,
  Users,
  AlertTriangle,
  CheckCircle,
  X,
  Plus,
  Minus,
  Zap,
  Smile,
  Paperclip,
  Mic,
  Video,
  Settings,
  Volume2,
  VolumeX
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmergencySOSButton from "@/components/EmergencySOSButton";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  type: "text" | "image" | "file";
}

const AnonymousChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const [userMood, setUserMood] = useState("");
  const [chatTopic, setChatTopic] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const moodOptions = [
    { value: "anxious", label: "Anxious", icon: "😰", color: "bg-yellow-100 text-yellow-800" },
    { value: "sad", label: "Sad", icon: "😢", color: "bg-blue-100 text-blue-800" },
    { value: "angry", label: "Angry", icon: "😠", color: "bg-red-100 text-red-800" },
    { value: "stressed", label: "Stressed", icon: "😰", color: "bg-orange-100 text-orange-800" },
    { value: "lonely", label: "Lonely", icon: "😔", color: "bg-purple-100 text-purple-800" },
    { value: "confused", label: "Confused", icon: "😕", color: "bg-gray-100 text-gray-800" }
  ];

  const chatTopics = [
    "General Support",
    "Anxiety & Stress",
    "Depression",
    "Relationships",
    "Work Issues",
    "Family Problems",
    "Academic Pressure",
    "Self-esteem",
    "Grief & Loss",
    "Other"
  ];

  const quickResponses = [
    "I'm feeling overwhelmed",
    "I need someone to talk to",
    "I'm having a bad day",
    "I feel lonely",
    "I'm worried about something",
    "I need advice"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
      type: "text"
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "I understand how you're feeling. Can you tell me more about what's on your mind?",
        "That sounds really challenging. You're not alone in feeling this way.",
        "Thank you for sharing that with me. How long have you been feeling this way?",
        "I hear you, and your feelings are valid. What would be most helpful for you right now?",
        "That's a lot to deal with. Have you considered talking to someone in person about this?",
        "I'm here to listen. What's the most difficult part of what you're going through?"
      ];

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
        type: "text"
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const startChat = () => {
    if (!userMood || !chatTopic) return;
    
    setChatStarted(true);
    const welcomeMessage: Message = {
      id: "welcome",
      text: `Hello! I'm here to listen and support you. I see you're feeling ${userMood} and want to talk about ${chatTopic}. How can I help you today?`,
      sender: "bot",
      timestamp: new Date(),
      type: "text"
    };
    setMessages([welcomeMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Anonymous Chat</h1>
                  <p className="text-xs sm:text-sm text-gray-500">24/7 mental health support</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 sm:p-2"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <Volume2 className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 sm:p-2"
              >
                <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Chat Interface */}
            <Card className="h-[500px] sm:h-[600px] lg:h-[700px] flex flex-col">
              <CardHeader className="pb-3 sm:pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                    </div>
                    <div>
                      <CardTitle className="text-sm sm:text-base">Mental Health Support</CardTitle>
                      <CardDescription className="text-xs sm:text-sm">
                        {chatStarted ? "Online - Ready to help" : "Click start to begin chatting"}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    Anonymous
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 p-0 overflow-hidden">
                {!chatStarted ? (
                  <div className="h-full flex items-center justify-center p-4 sm:p-6">
                    <div className="text-center space-y-4 sm:space-y-6">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <MessageCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Start Anonymous Chat</h3>
                        <p className="text-sm sm:text-base text-gray-600">
                          Connect with a supportive listener. Your privacy is protected.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div
                            className={`max-w-[80%] sm:max-w-[70%] lg:max-w-[60%] p-3 sm:p-4 rounded-lg ${
                              message.sender === "user"
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-900"
                            }`}
                          >
                            <p className="text-sm sm:text-base">{message.text}</p>
                            <p className={`text-xs mt-1 ${
                              message.sender === "user" ? "text-blue-100" : "text-gray-500"
                            }`}>
                              {formatTime(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="border-t p-3 sm:p-4">
                      <div className="flex space-x-2">
                        <div className="flex-1 relative">
                          <Textarea
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your message..."
                            className="min-h-[40px] max-h-[120px] resize-none text-sm sm:text-base pr-12"
                          />
                          <div className="absolute right-2 top-2 flex space-x-1">
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Smile className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                              <Paperclip className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        <Button
                          onClick={sendMessage}
                          disabled={!inputMessage.trim()}
                          size="sm"
                          className="px-3 sm:px-4"
                        >
                          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Responses */}
            {chatStarted && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm sm:text-base">Quick Responses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {quickResponses.map((response, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setInputMessage(response)}
                        className="text-xs sm:text-sm"
                      >
                        {response}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Chat Setup */}
            {!chatStarted && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                    <Settings className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                    <span>Chat Setup</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6">
                  {/* Mood Selection */}
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-sm sm:text-base font-medium">How are you feeling?</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {moodOptions.map((mood) => (
                        <button
                          key={mood.value}
                          onClick={() => setUserMood(mood.value)}
                          className={`p-2 sm:p-3 rounded-lg border-2 transition-all text-center ${
                            userMood === mood.value
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

                  {/* Topic Selection */}
                  <div className="space-y-2 sm:space-y-3">
                    <Label className="text-sm sm:text-base font-medium">What would you like to talk about?</Label>
                    <select
                      value={chatTopic}
                      onChange={(e) => setChatTopic(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a topic</option>
                      {chatTopics.map((topic) => (
                        <option key={topic} value={topic}>{topic}</option>
                      ))}
                    </select>
                  </div>

                  <Button
                    onClick={startChat}
                    disabled={!userMood || !chatTopic}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Privacy & Safety */}
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base text-green-800 flex items-center space-x-2">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Privacy & Safety</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs sm:text-sm text-green-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                    <span>100% anonymous - no personal info required</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                    <span>End-to-end encrypted conversations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                    <span>No chat history saved</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Crisis Resources */}
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base text-red-800 flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Crisis Resources</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs sm:text-sm border-red-300 text-red-700 hover:bg-red-100"
                  onClick={() => navigate("/emergency")}
                >
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
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
                  If you're in immediate danger, please contact emergency services.
                </p>
              </CardContent>
            </Card>

            {/* Mental Health Tips */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600" />
                  <span>Mental Health Tips</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start space-x-2">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-pink-500" />
                    <span>Practice deep breathing exercises</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-pink-500" />
                    <span>Take regular breaks from screens</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Heart className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0 text-pink-500" />
                    <span>Connect with friends and family</span>
                  </div>
                </div>
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

export default AnonymousChat;
