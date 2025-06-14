
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    // This component should not be reached in normal flow
    // since App.tsx handles the routing
    console.log("Index page reached - this should not happen in normal flow");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">HealthAI</h1>
        <p className="text-xl text-muted-foreground">Loading your healthcare companion...</p>
      </div>
    </div>
  );
};

export default Index;
