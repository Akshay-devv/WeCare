import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Users, 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Phone, 
  MessageCircle, 
  Calendar,
  Clock,
  Award,
  CheckCircle,
  X,
  Heart,
  Shield,
  Zap,
  GraduationCap,
  Briefcase,
  Languages,
  DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  location: string;
  distance: string;
  available: boolean;
  nextAvailable: string;
  consultationFee: number;
  languages: string[];
  education: string;
  image?: string;
  verified: boolean;
}

const DoctorDirectory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const specialties = [
    "Cardiology",
    "Dermatology", 
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Gynecology",
    "Ophthalmology",
    "ENT",
    "General Medicine",
    "Dental",
    "Physiotherapy"
  ];

  const doctors: Doctor[] = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      rating: 4.8,
      experience: 15,
      location: "Apollo Hospital, Bangalore",
      distance: "2.3 km",
      available: true,
      nextAvailable: "Today, 3:00 PM",
      consultationFee: 1200,
      languages: ["English", "Hindi", "Kannada"],
      education: "MBBS, MD - Cardiology",
      verified: true
    },
    {
      id: "2",
      name: "Dr. Rajesh Kumar",
      specialty: "Neurology",
      rating: 4.6,
      experience: 12,
      location: "Fortis Hospital, Bangalore",
      distance: "3.1 km",
      available: false,
      nextAvailable: "Tomorrow, 10:00 AM",
      consultationFee: 1500,
      languages: ["English", "Hindi", "Tamil"],
      education: "MBBS, MD - Neurology",
      verified: true
    },
    {
      id: "3",
      name: "Dr. Priya Sharma",
      specialty: "Pediatrics",
      rating: 4.9,
      experience: 8,
      location: "Manipal Hospital, Bangalore",
      distance: "4.2 km",
      available: true,
      nextAvailable: "Today, 5:30 PM",
      consultationFee: 1000,
      languages: ["English", "Hindi"],
      education: "MBBS, MD - Pediatrics",
      verified: true
    },
    {
      id: "4",
      name: "Dr. Amit Patel",
      specialty: "Orthopedics",
      rating: 4.5,
      experience: 18,
      location: "City General Hospital, Bangalore",
      distance: "1.8 km",
      available: true,
      nextAvailable: "Today, 2:00 PM",
      consultationFee: 1300,
      languages: ["English", "Hindi", "Gujarati"],
      education: "MBBS, MS - Orthopedics",
      verified: true
    },
    {
      id: "5",
      name: "Dr. Kavita Reddy",
      specialty: "Dermatology",
      rating: 4.7,
      experience: 10,
      location: "Apollo Hospital, Bangalore",
      distance: "2.3 km",
      available: false,
      nextAvailable: "Tomorrow, 11:00 AM",
      consultationFee: 1100,
      languages: ["English", "Hindi", "Telugu"],
      education: "MBBS, MD - Dermatology",
      verified: true
    },
    {
      id: "6",
      name: "Dr. Suresh Menon",
      specialty: "Psychiatry",
      rating: 4.4,
      experience: 14,
      location: "NIMHANS, Bangalore",
      distance: "5.0 km",
      available: true,
      nextAvailable: "Today, 4:00 PM",
      consultationFee: 1400,
      languages: ["English", "Hindi", "Malayalam"],
      education: "MBBS, MD - Psychiatry",
      verified: true
    }
  ];

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    const matchesRating = !selectedRating || doctor.rating >= parseFloat(selectedRating);
    const matchesAvailability = !selectedAvailability || 
      (selectedAvailability === "available" && doctor.available) ||
      (selectedAvailability === "all");

    return matchesSearch && matchesSpecialty && matchesRating && matchesAvailability;
  });

  const clearFilters = () => {
    setSelectedSpecialty("");
    setSelectedRating("");
    setSelectedAvailability("");
    setSearchTerm("");
  };

  const handleBookAppointment = (doctor: Doctor) => {
    // Navigate to booking page or show booking modal
    alert(`Booking appointment with ${doctor.name}`);
  };

  const handleCallDoctor = (doctor: Doctor) => {
    // Simulate calling doctor
    alert(`Calling ${doctor.name}`);
  };

  const handleChatDoctor = (doctor: Doctor) => {
    // Navigate to chat
    navigate("/anonymous-chat");
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
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">Find Doctors</h1>
                  <p className="text-xs sm:text-sm text-gray-500">Verified healthcare professionals</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 sm:p-2"
              >
                <Filter className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-4 sm:pt-6">
                <div className="space-y-4 sm:space-y-6">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <Input
                      placeholder="Search doctors, specialties, or locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 text-sm sm:text-base"
                    />
                  </div>

                  {/* Quick Filters */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedAvailability === "available" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedAvailability(selectedAvailability === "available" ? "" : "available")}
                      className="text-xs sm:text-sm"
                    >
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Available Now
                    </Button>
                    <Button
                      variant={selectedRating === "4.5" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedRating(selectedRating === "4.5" ? "" : "4.5")}
                      className="text-xs sm:text-sm"
                    >
                      <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      4.5+ Rating
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs sm:text-sm"
                    >
                      <X className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      Clear
                    </Button>
                  </div>

                  {/* Advanced Filters */}
                  {showFilters && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-3 sm:pt-4 border-t">
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">Specialty</label>
                        <select
                          value={selectedSpecialty}
                          onChange={(e) => setSelectedSpecialty(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">All Specialties</option>
                          {specialties.map((specialty) => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">Min Rating</label>
                        <select
                          value={selectedRating}
                          onChange={(e) => setSelectedRating(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Any Rating</option>
                          <option value="4.0">4.0+</option>
                          <option value="4.5">4.5+</option>
                          <option value="4.8">4.8+</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-700 mb-1 block">Availability</label>
                        <select
                          value={selectedAvailability}
                          onChange={(e) => setSelectedAvailability(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="all">All Doctors</option>
                          <option value="available">Available Now</option>
                          <option value="today">Available Today</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {filteredDoctors.length} Doctors Found
                </h2>
                <p className="text-sm sm:text-base text-gray-500">
                  {searchTerm && `Results for "${searchTerm}"`}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="p-2"
                >
                  <div className="grid grid-cols-2 gap-1 w-4 h-4">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="p-2"
                >
                  <div className="space-y-1 w-4 h-4">
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                    <div className="bg-current rounded-sm h-1"></div>
                  </div>
                </Button>
              </div>
            </div>

            {/* Doctors List */}
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" 
              : "space-y-4 sm:space-y-6"
            }>
              {filteredDoctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-4 sm:pt-6">
                    <div className={viewMode === "list" ? "flex space-x-4" : "space-y-4"}>
                      {/* Doctor Info */}
                      <div className={viewMode === "list" ? "flex-1" : ""}>
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <Avatar className="h-12 w-12 sm:h-16 sm:w-16">
                            <AvatarImage src={doctor.image} />
                            <AvatarFallback className="bg-purple-100 text-purple-600 text-sm sm:text-lg">
                              {doctor.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">
                                {doctor.name}
                              </h3>
                              {doctor.verified && (
                                <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mb-1">{doctor.specialty}</p>
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center space-x-1">
                                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                                <span className="text-xs sm:text-sm font-medium">{doctor.rating}</span>
                              </div>
                              <span className="text-xs sm:text-sm text-gray-500">•</span>
                              <span className="text-xs sm:text-sm text-gray-500">{doctor.experience} years</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="truncate">{doctor.location}</span>
                              <span>•</span>
                              <span>{doctor.distance}</span>
                            </div>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="mt-3 sm:mt-4 space-y-2">
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="text-gray-500">Consultation Fee:</span>
                            <span className="font-medium">₹{doctor.consultationFee}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs sm:text-sm">
                            <span className="text-gray-500">Next Available:</span>
                            <span className={`font-medium ${doctor.available ? "text-green-600" : "text-orange-600"}`}>
                              {doctor.nextAvailable}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {doctor.languages.slice(0, 2).map((lang) => (
                              <Badge key={lang} variant="secondary" className="text-xs">
                                {lang}
                              </Badge>
                            ))}
                            {doctor.languages.length > 2 && (
                              <Badge variant="secondary" className="text-xs">
                                +{doctor.languages.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className={viewMode === "list" ? "flex flex-col space-y-2" : "space-y-2"}>
                        <Button
                          onClick={() => handleBookAppointment(doctor)}
                          className="w-full bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                        >
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          Book Appointment
                        </Button>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCallDoctor(doctor)}
                            className="flex-1 text-xs sm:text-sm"
                          >
                            <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleChatDoctor(doctor)}
                            className="flex-1 text-xs sm:text-sm"
                          >
                            <MessageCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredDoctors.length === 0 && (
              <Card>
                <CardContent className="pt-8 sm:pt-12 pb-8 sm:pb-12 text-center">
                  <Users className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">No doctors found</h3>
                  <p className="text-sm sm:text-base text-gray-500 mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                  <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 sm:p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm sm:text-base text-gray-600">Total Doctors</span>
                  <span className="text-lg sm:text-xl font-bold text-blue-600">{doctors.length}</span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-green-50 rounded-lg">
                  <span className="text-sm sm:text-base text-gray-600">Available Now</span>
                  <span className="text-lg sm:text-xl font-bold text-green-600">
                    {doctors.filter(d => d.available).length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 sm:p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm sm:text-base text-gray-600">Avg Rating</span>
                  <span className="text-lg sm:text-xl font-bold text-purple-600">
                    {(doctors.reduce((sum, d) => sum + d.rating, 0) / doctors.length).toFixed(1)}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Popular Specialties */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center space-x-2">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  <span>Popular Specialties</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {["Cardiology", "Dermatology", "Pediatrics", "Orthopedics"].map((specialty) => (
                    <button
                      key={specialty}
                      onClick={() => setSelectedSpecialty(specialty)}
                      className={`w-full text-left p-2 sm:p-3 rounded-lg transition-colors text-sm sm:text-base ${
                        selectedSpecialty === specialty
                          ? "bg-purple-100 text-purple-700"
                          : "hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      {specialty}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Tips */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base text-blue-800">💡 Booking Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs sm:text-sm text-blue-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                    <span>Book appointments during off-peak hours</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                    <span>Check doctor's availability before booking</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
                    <span>Read reviews and ratings</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm sm:text-base text-red-800 flex items-center space-x-2">
                  <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
                  <span>Need Emergency Care?</span>
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
                <p className="text-xs sm:text-sm text-red-600">
                  For immediate medical attention, contact emergency services.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDirectory;
