import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Shield, 
  Phone, 
  MapPin, 
  AlertTriangle, 
  Heart, 
  Users, 
  Clock,
  MessageCircle,
  Navigation,
  Ambulance,
  Hospital,
  User,
  Info,
  CheckCircle,
  X,
  Plus,
  Minus,
  Zap,
  Loader2
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface LocationData {
  latitude: number;
  longitude: number;
  address?: string;
  timestamp: string;
}

const Emergency = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [emergencyType, setEmergencyType] = useState("");
  const [locationInput, setLocationInput] = useState("");
  const [description, setDescription] = useState("");
  const [isCalling, setIsCalling] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [patientCount, setPatientCount] = useState(1);
  const [autoDetectedLocation, setAutoDetectedLocation] = useState<LocationData | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Check for auto-detected location from EmergencySOSButton
  useEffect(() => {
    // Check if location was passed via navigation state
    if (location.state?.autoDetectedLocation) {
      const detectedLocation = location.state.autoDetectedLocation;
      setAutoDetectedLocation({
        latitude: detectedLocation.latitude,
        longitude: detectedLocation.longitude,
        address: detectedLocation.address,
        timestamp: location.state.timestamp
      });
      setLocationInput(detectedLocation.address || `${detectedLocation.latitude}, ${detectedLocation.longitude}`);
    } else {
      // Check localStorage for emergency location
      const storedLocation = localStorage.getItem('emergencyLocation');
      if (storedLocation) {
        try {
          const parsedLocation = JSON.parse(storedLocation);
          setAutoDetectedLocation(parsedLocation);
          setLocationInput(parsedLocation.address || `${parsedLocation.latitude}, ${parsedLocation.longitude}`);
        } catch (error) {
          console.error("Error parsing stored location:", error);
        }
      }
    }
  }, [location.state]);

  const emergencyTypes = [
    {
      id: "cardiac",
      name: "Cardiac Emergency",
      icon: Heart,
      color: "bg-red-500",
      description: "Heart attack, chest pain, cardiac arrest"
    },
    {
      id: "trauma",
      name: "Trauma/Injury",
      icon: Shield,
      color: "bg-orange-500",
      description: "Accidents, falls, severe injuries"
    },
    {
      id: "breathing",
      name: "Breathing Difficulty",
      icon: Users,
      color: "bg-blue-500",
      description: "Shortness of breath, choking, asthma"
    },
    {
      id: "stroke",
      name: "Stroke",
      icon: AlertTriangle,
      color: "bg-purple-500",
      description: "Facial drooping, speech problems, weakness"
    },
    {
      id: "other",
      name: "Other Emergency",
      icon: Info,
      color: "bg-gray-500",
      description: "Other medical emergencies"
    }
  ];

  const emergencyContacts = [
    { name: "Emergency Services", number: "108", type: "Ambulance" },
    { name: "Police", number: "100", type: "Law Enforcement" },
    { name: "Fire Department", number: "101", type: "Fire & Rescue" },
    { name: "Women Helpline", number: "1091", type: "Support" }
  ];

  const nearbyHospitals = [
    { name: "City General Hospital", distance: "2.3 km", rating: 4.5, available: true },
    { name: "Apollo Hospital", distance: "3.1 km", rating: 4.8, available: true },
    { name: "Fortis Hospital", distance: "4.2 km", rating: 4.6, available: false },
    { name: "Manipal Hospital", distance: "5.0 km", distance: "5.0 km", rating: 4.7, available: true }
  ];

  const handleEmergencyCall = () => {
    setIsCalling(true);
    
    // Include location data in emergency call
    const emergencyData = {
      type: emergencyType,
      location: locationInput,
      description,
      patientCount,
      autoDetectedLocation,
      timestamp: new Date().toISOString()
    };
    
    console.log("Emergency call data:", emergencyData);
    
    // Simulate emergency call
    setTimeout(() => {
      setIsCalling(false);
      alert("Emergency services have been contacted with your location. Help is on the way!");
    }, 3000);
  };

  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          try {
            // Try to get address from coordinates
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
            );
            
            if (response.ok) {
              const data = await response.json();
              const address = data.display_name || `${latitude}, ${longitude}`;
              setLocationInput(address);
              setAutoDetectedLocation({
                latitude,
                longitude,
                address,
                timestamp: new Date().toISOString()
              });
            } else {
              setLocationInput(`${latitude}, ${longitude}`);
              setAutoDetectedLocation({
                latitude,
                longitude,
                address: `${latitude}, ${longitude}`,
                timestamp: new Date().toISOString()
              });
            }
          } catch (error) {
            setLocationInput(`${latitude}, ${longitude}`);
            setAutoDetectedLocation({
              latitude,
              longitude,
              address: `${latitude}, ${longitude}`,
              timestamp: new Date().toISOString()
            });
          }
          
          setShowLocationModal(false);
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting location:", error);
          let errorMessage = "Unable to get your location";
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = "Location access denied. Please enable location services.";
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = "Location information unavailable.";
              break;
            case error.TIMEOUT:
              errorMessage = "Location request timed out.";
              break;
          }
          
          alert(errorMessage);
          setIsLoadingLocation(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setIsLoadingLocation(false);
    }
  };

  const formatLocationTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
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
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Emergency SOS</h1>
                <p className="text-xs sm:text-sm text-gray-500">24/7 emergency assistance</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Auto-detected Location Alert */}
            {autoDetectedLocation && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="pt-4 sm:pt-6">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-6 sm:h-6 sm:w-6 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800 text-sm sm:text-base mb-1">
                        Location Auto-Detected
                      </h3>
                      <p className="text-green-700 text-sm sm:text-base mb-2">
                        {autoDetectedLocation.address}
                      </p>
                      <div className="flex items-center space-x-4 text-xs sm:text-sm text-green-600">
                        <span>Coordinates: {autoDetectedLocation.latitude.toFixed(6)}, {autoDetectedLocation.longitude.toFixed(6)}</span>
                        <span>•</span>
                        <span>Detected {formatLocationTime(autoDetectedLocation.timestamp)}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-300 text-green-700 text-xs">
                      Auto
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Emergency Type Selection */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                  <span>Type of Emergency</span>
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Select the type of emergency to get appropriate help
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {emergencyTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setEmergencyType(type.id)}
                      className={`p-3 sm:p-4 rounded-lg border-2 transition-all text-left ${
                        emergencyType === type.id
                          ? "border-red-500 bg-red-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 ${type.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <type.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-sm sm:text-base text-gray-900 mb-1">{type.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-500">{type.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Details */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                  <Info className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span>Emergency Details</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Location */}
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="location" className="text-sm sm:text-base font-medium">
                    Current Location
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      placeholder="Enter your location or use GPS"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      className="flex-1 text-sm sm:text-base"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowLocationModal(true)}
                      className="px-3 sm:px-4"
                      disabled={isLoadingLocation}
                    >
                      {isLoadingLocation ? (
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      ) : (
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Patient Count */}
                <div className="space-y-2 sm:space-y-3">
                  <Label className="text-sm sm:text-base font-medium">Number of Patients</Label>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPatientCount(Math.max(1, patientCount - 1))}
                      className="w-10 h-10 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg sm:text-xl font-semibold min-w-[2rem] text-center">{patientCount}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPatientCount(patientCount + 1)}
                      className="w-10 h-10 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 sm:space-y-3">
                  <Label htmlFor="description" className="text-sm sm:text-base font-medium">
                    Emergency Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what happened and current condition..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[100px] sm:min-h-[120px] text-sm sm:text-base resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Emergency Call Button */}
            <Card className="border-red-200 bg-red-50">
              <CardContent className="pt-4 sm:pt-6">
                <div className="text-center space-y-4 sm:space-y-6">
                  <div className="flex items-center justify-center space-x-2">
                    <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600" />
                    <h3 className="text-lg sm:text-xl font-bold text-red-800">Emergency Alert</h3>
                  </div>
                  <p className="text-sm sm:text-base text-red-700">
                    This will immediately contact emergency services in your area.
                    {autoDetectedLocation && (
                      <span className="block mt-1 font-medium">
                        Your location will be automatically shared with emergency responders.
                      </span>
                    )}
                  </p>
                  <Button
                    onClick={handleEmergencyCall}
                    disabled={isCalling}
                    className="w-full bg-red-600 hover:bg-red-700 text-white text-lg sm:text-xl font-bold py-4 sm:py-6 h-auto"
                  >
                    {isCalling ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-white"></div>
                        <span>Connecting to Emergency Services...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-6 w-6 sm:h-8 sm:w-8" />
                        <span>EMERGENCY SOS - CALL NOW</span>
                      </div>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Emergency Contacts */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                  <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyContacts.map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm sm:text-base text-gray-900">{contact.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{contact.type}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs sm:text-sm"
                      onClick={() => window.open(`tel:${contact.number}`)}
                    >
                      {contact.number}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Nearby Hospitals */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                  <Hospital className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <span>Nearby Hospitals</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyHospitals.map((hospital, index) => (
                  <div key={index} className="p-2 sm:p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm sm:text-base text-gray-900">{hospital.name}</h4>
                      <Badge 
                        variant={hospital.available ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {hospital.available ? "Available" : "Full"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <span>{hospital.distance}</span>
                      <span>⭐ {hospital.rating}</span>
                    </div>
                  </div>
                ))}
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
                  onClick={() => navigate("/doctors")}
                >
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Find Nearest Doctor
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs sm:text-sm"
                  onClick={() => navigate("/anonymous-chat")}
                >
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Mental Health Support
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-xs sm:text-sm"
                  onClick={() => navigate("/symptom-checker")}
                >
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  Symptom Checker
                </Button>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base text-yellow-800">🚨 Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs sm:text-sm text-yellow-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                    <span>Stay calm and assess the situation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                    <span>Do not move seriously injured people</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                    <span>Keep emergency contacts handy</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Location Modal */}
      {showLocationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg flex items-center space-x-2">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <span>Get Your Location</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm sm:text-base text-gray-600">
                Allow location access to automatically get your current position for emergency services.
              </p>
              <div className="flex space-x-2">
                <Button
                  onClick={getCurrentLocation}
                  className="flex-1"
                  disabled={isLoadingLocation}
                >
                  {isLoadingLocation ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                      <span>Getting Location...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Navigation className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span>Use GPS</span>
                    </div>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowLocationModal(false)}
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

export default Emergency;
