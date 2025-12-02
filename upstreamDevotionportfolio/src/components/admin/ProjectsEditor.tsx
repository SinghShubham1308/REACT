import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
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
  CardFooter,
} from "../ui/card";
import { Plus, Loader2, Trash2, X, Github, ExternalLink } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface Project {
  id: number;
  title: string;
  description: string;
  projectType: "Personal" | "Professional";
  technologiesUsed: string[];
  githubLink: string;
  liveDemoLink: string;
}

type NewProject = Omit<Project, "id">;

const INITIAL_PROJECT_STATE: NewProject = {
  title: "",
  description: "",
  projectType: "Personal",
  technologiesUsed: [],
  githubLink: "",
  liveDemoLink: "",
};

export function ProjectsEditor() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false); // Toggle form visibility

  const [newProject, setNewProject] = useState<NewProject>(INITIAL_PROJECT_STATE);
  const [techInput, setTechInput] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9090";
  const token = localStorage.getItem("authToken");

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

  const handleAddTechnology = () => {
    const trimmedTech = techInput.trim();
    if (!trimmedTech) return;

    if (newProject.technologiesUsed.includes(trimmedTech)) {
      toast.warning("Technology already added!");
      return;
    }

    setNewProject({
      ...newProject,
      technologiesUsed: [...newProject.technologiesUsed, trimmedTech],
    });
    setTechInput("");
  };

  const handleRemoveTechnology = (techToRemove: string) => {
    setNewProject({
      ...newProject,
      technologiesUsed: newProject.technologiesUsed.filter((t) => t !== techToRemove),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  const handleSaveNewProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      toast.error("Authentication Error.");
      return;
    }

    setIsSaving(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/v1/projects`,
        newProject,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setProjects([...projects, response.data]);
      setNewProject(INITIAL_PROJECT_STATE);
      setTechInput("");
      setShowAddForm(false); // Close form after save
      toast.success("Project added successfully!");
    } catch (error) {
      toast.error("Failed to add project.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    if (!token) {
      toast.error("Authentication Error.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/v1/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects(projects.filter((p) => p.id !== projectId));
      toast.success("Project deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete project.");
    }
  };

  if (isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin" />;
  }

  return (
    <div className="space-y-8">
      {/* Existing Projects List */}
      <div className="space-y-4">
        {projects.length === 0 && !showAddForm ? (
          <div className="text-center p-8 border rounded-lg bg-muted/20 text-muted-foreground">
            No projects added yet. Click below to add one.
          </div>
        ) : (
          projects.map((proj, index) => (
            <Card key={proj.id} className="relative">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      Project {index + 1}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    onClick={() => handleDeleteProject(proj.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Project Title
                  </Label>
                  <div className="p-2 bg-muted/30 rounded-md text-sm font-medium">
                    {proj.title}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Project Type
                  </Label>
                  <div>
                    <Badge variant="outline">{proj.projectType}</Badge>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Description
                  </Label>
                  <div className="p-2 bg-muted/30 rounded-md text-sm">
                    {proj.description}
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">
                    Technologies
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {proj.technologiesUsed?.map((tech, i) => (
                      <Badge key={i} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      GitHub URL
                    </Label>
                    <div className="p-2 bg-muted/30 rounded-md text-sm truncate">
                      {proj.githubLink || "-"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">
                      Demo URL
                    </Label>
                    <div className="p-2 bg-muted/30 rounded-md text-sm truncate">
                      {proj.liveDemoLink || "-"}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add New Project Form (Card) */}
      {showAddForm ? (
        <Card className="border-primary/50 shadow-md">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
            <CardDescription>
              Enter the details for your new project.
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
                  placeholder="Project Name"
                />
              </div>

              <div className="space-y-2">
                <Label>Project Type</Label>
                <Select
                  value={newProject.projectType}
                  onValueChange={(value: "Personal" | "Professional") =>
                    setNewProject({ ...newProject, projectType: value })
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
                    setNewProject({
                      ...newProject,
                      description: e.target.value,
                    })
                  }
                  required
                  placeholder="Project Description"
                  rows={3}
                />
              </div>

              <div className="space-y-3">
                <Label>Technologies</Label>
                <div className="flex gap-2">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="e.g. React (Press Enter)"
                  />
                  <Button
                    type="button"
                    onClick={handleAddTechnology}
                    size="icon"
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[30px] p-2 bg-muted/30 rounded-md">
                  {newProject.technologiesUsed.length === 0 && (
                    <span className="text-xs text-muted-foreground italic">
                      No technologies added yet.
                    </span>
                  )}
                  {newProject.technologiesUsed.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(tech)}
                        className="ml-1 hover:text-destructive focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input
                    value={newProject.githubLink}
                    onChange={(e) =>
                      setNewProject({ ...newProject, githubLink: e.target.value })
                    }
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Demo URL</Label>
                  <Input
                    value={newProject.liveDemoLink}
                    onChange={(e) =>
                      setNewProject({ ...newProject, liveDemoLink: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="submit" className="flex-1" disabled={isSaving}>
                  {isSaving ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Save Project"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  disabled={isSaving}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setShowAddForm(true)}
          variant="outline"
          className="w-full h-12 border-dashed border-2 hover:border-primary hover:bg-accent/50"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Project
        </Button>
      )}
    </div>
  );
}