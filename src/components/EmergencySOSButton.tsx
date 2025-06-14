import { useState } from "react";
import { AlertTriangle, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const EmergencySOSButton = () => {
  const navigate = useNavigate();
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = (): Promise<{ latitude: number; longitude: number; address?: string }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported by this browser"));
        return;
      }

      const success = async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Try to get address from coordinates using reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );
          
          if (response.ok) {
            const data = await response.json();
            const address = data.display_name || `${latitude}, ${longitude}`;
            resolve({ latitude, longitude, address });
          } else {
            resolve({ latitude, longitude, address: `${latitude}, ${longitude}` });
          }
        } catch (error) {
          // If reverse geocoding fails, just return coordinates
          resolve({ latitude, longitude, address: `${latitude}, ${longitude}` });
        }
      };

      const error = (error: GeolocationPositionError) => {
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
        
        reject(new Error(errorMessage));
      };

      const options = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      };

      navigator.geolocation.getCurrentPosition(success, error, options);
    });
  };

  const handleEmergencyClick = async () => {
    setIsGettingLocation(true);
    
    try {
      const location = await getCurrentLocation();
      
      // Store location in localStorage for the emergency page to access
      localStorage.setItem('emergencyLocation', JSON.stringify({
        latitude: location.latitude,
        longitude: location.longitude,
        address: location.address,
        timestamp: new Date().toISOString()
      }));
      
      // Navigate to emergency page with location data
      navigate("/emergency", { 
        state: { 
          autoDetectedLocation: location,
          timestamp: new Date().toISOString()
        } 
      });
    } catch (error) {
      console.error("Location detection failed:", error);
      
      // Show error message to user
      alert(`Location detection failed: ${error instanceof Error ? error.message : 'Unknown error'}\n\nYou can still proceed to the emergency page and enter your location manually.`);
      
      // Navigate to emergency page anyway
      navigate("/emergency");
    } finally {
      setIsGettingLocation(false);
    }
  };

  return (
    <Button
      onClick={handleEmergencyClick}
      disabled={isGettingLocation}
      className="fixed bottom-24 right-4 w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 shadow-lg z-50 p-0 transition-all duration-200 hover:scale-110"
      size="icon"
      title="Emergency SOS - Auto-detects your location"
    >
      {isGettingLocation ? (
        <Loader2 className="h-6 w-6 text-white animate-spin" />
      ) : (
        <div className="relative">
          <AlertTriangle className="h-6 w-6 text-white" />
          <MapPin className="h-3 w-3 text-white absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5" />
        </div>
      )}
    </Button>
  );
};

export default EmergencySOSButton;
