import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";

interface Project {
  id: number;
  title: string;
  description: string;
  technologiesUsed: string[];
  githubLink: string;
  liveDemoLink: string;
}

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9090";
        const response = await axios.get(`${API_URL}/api/v1/projects`);
        console.log(response);

        setProjects(response.data);

        setError(null);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
        setError("Failed to load projects. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 px-4 bg-accent/30">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="mb-4">Featured Projects</h2>
          <p className="max-w-2xl mx-auto text-muted-foreground">
            Some of my recent work showcasing my expertise in backend
            development
          </p>
        </motion.div>
        {isLoading && (
          <div className="text-center text-muted-foreground">
            Loading projects...
          </div>
        )}

        {error && <div className="text-center text-red-500">{error}</div>}

        {!isLoading && !error && projects.length === 0 && (
          <div className="text-center text-muted-foreground">
            No projects found.
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {!isLoading &&
            !error &&
            projects.map((project: Project, index: number) => (
              <motion.div
                key={project.id} // Key ke liye index ki jagah project.id ka istemaal karein
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="grow">
                    <div className="flex flex-wrap gap-2">
                      {project.technologiesUsed?.map(
                        (tech: string, techIndex: number) => (
                          <Badge key={techIndex} variant="secondary">
                            {tech}
                          </Badge>
                        )
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4 mr-2" />
                        Code
                      </a>
                    </Button>
                    <Button size="sm" asChild>
                      <a
                        href={project.liveDemoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
