import { useState } from "react";
import {
  X,
  User,
  Briefcase,
  Code,
  FolderOpen,
  Mail,
  Loader2,
} from "lucide-react";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PersonalInfoEditor } from "./PersonalInfoEditor";
import { AboutEditor } from "./AboutEditor";
import { SkillsEditor } from "./SkillsEditor";
import { ProjectsEditor } from "./ProjectsEditor";
import { toast } from "sonner";
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

interface AdminPanelProps {
  data: PortfolioData | null; // Ab yeh null ho sakta hai
  setData: (data: PortfolioData) => void; // State update karne ke liye
  onClose: () => void;
}

const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  personal: {
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    github: "",
    linkedin: "",
    profileImage: "",
  backgroundImage: "",
  },
  about: { description: "", features: [] },
  skills: [],
};

export function AdminPanel({ data, setData, onClose }: AdminPanelProps) {
  const [editedData, setEditedData] = useState<PortfolioData>(
    data || DEFAULT_PORTFOLIO_DATA
  );
  const [isSaving, setIsSaving] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9090";

  const handleSave = async () => {
    setIsSaving(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Authentication Error. Please log in again.");
      setIsSaving(false);
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/v1/profile-data`,
        editedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
      toast.success("Changes saved successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to save data:", error);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2>Admin Panel</h2>
              <p className="text-muted-foreground">
                Edit your portfolio details
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* Save button ko Personal, About, Skills ke liye rakhein */}
              <Button onClick={handleSave} size="lg" disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                size="lg"
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {" "}
            {/* 4 cols */}
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="h-4 w-4" />{" "}
              <span className="hidden sm:inline">Personal</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />{" "}
              <span className="hidden sm:inline">About</span>
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Code className="h-4 w-4" />{" "}
              <span className="hidden sm:inline">Skills</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4" />{" "}
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />{" "}
              <span className="hidden sm:inline">Contact</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalInfoEditor
              data={editedData.personal}
              onChange={(personal) =>
                setEditedData({ ...editedData, personal })
              }
            />
          </TabsContent>

          <TabsContent value="about">
            <AboutEditor
              data={editedData.about}
              onChange={(about) => setEditedData({ ...editedData, about })}
            />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsEditor
              data={editedData.skills}
              onChange={(skills) => setEditedData({ ...editedData, skills })}
            />
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsEditor />
          </TabsContent>
          <TabsContent value="contact">
            <PersonalInfoEditor
              data={editedData.personal}
              onChange={(personal) =>
                setEditedData({ ...editedData, personal })
              }
              contactOnly 
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
