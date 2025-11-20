import { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Navigation } from "./components/Navigation";
import { AdminPanel } from "./components/admin/AdminPanel";
import { LoginForm } from "./components/admin/LoginForm";
import { Button } from "./components/ui/button";
import { Settings, LogOut, Loader2 } from "lucide-react";
import { Toaster } from "sonner";
import axios from "axios";

interface PersonalData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  github: string;
  linkedin: string;
  profileImage: string;
  backgroundImage: string;
}

interface AboutFeature {
  title: string;
  description: string;
}

interface AboutData {
  description: string;
  features: AboutFeature[];
}

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface PortfolioData {
  personal: PersonalData;
  about: AboutData;
  skills: SkillCategory[];
}

export default function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(
    null
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9090";

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }

    const fetchPortfolioData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/api/v1/profile-data`);
        setPortfolioData(response.data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch portfolio data:", err);
        setError("Failed to load portfolio. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, [API_URL]);

  const handleAdminToggle = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
    } else {
      if (isAuthenticated) {
        setIsAdminMode(true);
      } else {
        setShowLogin(true);
      }
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setIsAdminMode(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setIsAdminMode(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed bottom-6 right-6 z-50 flex gap-2">
        {isAuthenticated && !isAdminMode && (
          <Button
            onClick={handleLogout}
            size="lg"
            variant="outline"
            className="rounded-full h-14 px-6 shadow-lg"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        )}
        <Button
          onClick={handleAdminToggle}
          size="lg"
          className="rounded-full h-14 w-14 p-0 shadow-lg"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>
      {showLogin && (
        <LoginForm onLogin={handleLogin} onClose={() => setShowLogin(false)} />
      )}

      {isAdminMode ? (
        <AdminPanel
          data={portfolioData}
          setData={setPortfolioData}
          onClose={() => setIsAdminMode(false)}
        />
      ) : (
        <>
          <Navigation />

          {/* 4. FIX: Hum yahan check karenge ki data hai ya nahi */}
          {portfolioData ? (
            // Agar data hai, toh sections dikhayein
            <>
              <div id="home">
                <Hero data={portfolioData.personal} />
              </div>
              <div id="about">
                <About data={portfolioData.about} />
              </div>
              <div id="skills">
                <Skills data={portfolioData.skills} />
              </div>
              <div id="projects">
                <Projects />
              </div>
              <div id="contact">
                <Contact data={portfolioData.personal} />
              </div>
            </>
          ) : (
            // Agar data 'null' hai, toh message dikhayein
            <div className="container mx-auto text-center py-40 min-h-screen">
              <h2 className="text-2xl font-semibold text-muted-foreground">
                Portfolio data is not set up.
              </h2>
              <p className="text-muted-foreground mt-2">
                Please log in as admin to add your data.
              </p>
            </div>
          )}
        </>
      )}

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
}
