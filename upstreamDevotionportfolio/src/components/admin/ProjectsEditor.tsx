import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../ui/card";
import { Loader2, Trash2 } from "lucide-react"; // Trash2 add karein
import axios from "axios";
import { toast } from "sonner";

// Project interface
interface Project {
  id: number; // ID ab zaroori hai
  title: string;
  description: string;
  type: "Personal" | "Professional";
  technologies: string[];
  github: string;
  demo: string;
}

// Naya project banate waqt ID optional hai
type NewProject = Omit<Project, "id">;

export function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [newProject, setNewProject] = useState<
    Omit<Project, "id" | "technologies">
  >({
    title: "",
    description: "",
    type: "Personal",
    github: "",
    demo: "",
  });
  const [techInput, setTechInput] = useState(""); // Tech input ke liye alag se state

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9090";
  const token = localStorage.getItem("authToken");

  // 1. Projects ko fetch karein
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_URL}/api/v1/projects`);
        setProjects(response.data);
      } catch (error) {
        toast.error("Failed to load projects.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, [API_URL]);

  // 2. Naya project save karein
  const handleSaveNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Authentication Error.");
      return;
    }

    setIsSaving(true);

    const projectToSave: NewProject = {
      ...newProject,
      technologies: techInput
        .split(",")
        .map((tech) => tech.trim())
        .filter(Boolean),
    };

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/projects`,
        projectToSave,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects([...projects, response.data]); // List mein add karein
      // Form reset karein
      setNewProject({
        title: "",
        description: "",
        type: "Personal",
        github: "",
        demo: "",
      });
      setTechInput("");
      toast.success("Project added successfully!");
    } catch (error) {
      toast.error("Failed to add project.");
    } finally {
      setIsSaving(false);
    }
  };

  // 3. Project ko delete karein
  const handleDeleteProject = async (projectId: number) => {
    if (!token) {
      toast.error("Authentication Error.");
      return;
    }

    // Confirmation (optional par recommended)
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/api/v1/projects/${projectId}`, // Humein naya DELETE endpoint chahiye hoga
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects(projects.filter((p) => p.id !== projectId)); // List se hatayein
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project.");
    }
  };

  if (isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Naya Project Add karne ka Form */}
      <Card className="lg:col-span-1 h-fit sticky top-28">
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
          <CardDescription>
            Add a new project to your portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSaveNewProject} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Project Type</Label>
              <Select
                value={newProject.type}
                onValueChange={(value: string) =>
                  setNewProject({
                    ...newProject,
                    type: value as "Personal" | "Professional",
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Professional">Professional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Technologies (comma separated)</Label>
              <Input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Java, Spring Boot, PostgreSQL"
              />
            </div>
            <div className="space-y-2">
              <Label>GitHub URL</Label>
              <Input
                value={newProject.github}
                onChange={(e) =>
                  setNewProject({ ...newProject, github: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Demo URL</Label>
              <Input
                value={newProject.demo}
                onChange={(e) =>
                  setNewProject({ ...newProject, demo: e.target.value })
                }
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Add Project"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Maujooda Projects ki List */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-xl font-semibold">Existing Projects</h3>
        {projects.length === 0 ? (
          <p className="text-muted-foreground">No projects added yet.</p>
        ) : (
          projects.map((proj) => (
            <Card
              key={proj.id}
              className="flex justify-between items-center p-4"
            >
              <p className="font-medium">{proj.title}</p>
              <div>
                {/* TODO: Add Edit button */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteProject(proj.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
