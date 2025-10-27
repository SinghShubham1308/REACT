import React, { useEffect, useState } from "react";

export const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/v1/projects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProjects(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-10 text-red-500">
        Error fetching projects: {error}
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
        My Projects
      </h1>

      <div className="space-y-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md p-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {project.title}
            </h2>

            <p className="text-sm font-medium text-indigo-600 mb-4">
              (
              {project.projectType === "PUBLIC_DEMO"
                ? "Public Demo"
                : "Professional Case Study"}
              )
            </p>

            <p className="text-gray-700 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <strong className="text-sm font-medium text-gray-900 self-center">
                Technologies:
              </strong>
              {project.technologiesUsed.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-200 text-gray-800 text-xs font-medium px-3 py-1 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Only show the GitHub link if it's a PUBLIC_DEMO */}
            {project.projectType === "PUBLIC_DEMO" && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
              >
                View on GitHub &rarr;
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
