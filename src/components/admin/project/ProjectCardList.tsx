import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, ExternalLink, Github } from "lucide-react";
import { ProjectResponse, ProjectStatus } from "@/types/project_type";

interface ProjectCardProps {
  project: ProjectResponse;
  onEdit: (project: ProjectResponse) => void;
  onDelete: (_id: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.PUBLISHED:
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case ProjectStatus.ONGOING:
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Thumbnail */}
      {project.thumbnail && (
        <div className="relative h-48 w-full overflow-hidden bg-muted">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="h-full w-full object-cover transition-transform hover:scale-105 duration-300"
          />
          <div className="absolute top-2 right-2">
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          </div>
        </div>
      )}

      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="line-clamp-1">{project.title}</CardTitle>
            <CardDescription className="line-clamp-2 mt-2">
              {project.shortDescription}
            </CardDescription>
          </div>
          {!project.thumbnail && (
            <Badge className={getStatusColor(project.status)}>
              {project.status}
            </Badge>
          )}
        </div>

        {/* Client Info */}
        {project.client && (
          <div className="text-sm text-muted-foreground mt-2">
            Client: <span className="font-medium">{project.client}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Technologies */}
        {project.technologies.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Technologies:</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {project.technologies.length > 5 && (
                <Badge variant="outline" className="text-xs">
                  +{project.technologies.length - 5} more
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Description Preview */}
        <p className="text-sm text-muted-foreground line-clamp-3">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-gray-700 dark:text-gray-400"
            >
              <Github size={14} />
              Source Code
            </a>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 border-t bg-muted/20 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(project)}
          className="flex-1 gap-2"
        >
          <Edit size={14} />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(project._id)}
          className="flex-1 gap-2"
        >
          <Trash2 size={14} />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;