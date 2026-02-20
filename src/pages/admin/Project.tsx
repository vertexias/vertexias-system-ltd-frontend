import React, { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import ProjectForm from "@/components/admin/project/projectForm";
import ProjectCard from "@/components/admin/project/ProjectCardList";
import { getProjects, deleteProject } from "@/services/admin/project";
import { FolderKanban, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProjectResponse } from "@/types/project_type";

const Project = () => {
  const [projects, setProjects] = useState<ProjectResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectResponse | null>(null);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();

    if (Array.isArray(response)) {
      setProjects(response);
    } else {
      setProjects(response.data);
    }
    } catch (err) {
      toast.error("Failed to load projects");
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateClick = () => {
    setShowForm(!showForm);
    setEditingProject(null); // Clear editing project when creating new
  };

  const handleEdit = (project: ProjectResponse) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;

    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
      toast.success("Project deleted successfully");
    } catch (err) {
      toast.error("Failed to delete project");
      console.error("Error deleting project:", err);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
    fetchProjects(); // Refresh the list
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 p-10 space-y-10">
        {/* Header Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FolderKanban className="text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">
                Manage Projects
              </h1>
            </div>

            {/* Create Project Button */}
            <Button
              onClick={handleCreateClick}
              className="gap-2"
              variant={showForm ? "outline" : "default"}
            >
              <Plus size={18} />
              {showForm ? "Cancel" : "Create Project"}
            </Button>
          </div>

          <p className="text-muted-foreground">
            Create and manage your portfolio projects.
          </p>
        </div>

        {/* Project Form - Toggleable */}
        {showForm && (
          <div className="animate-in slide-in-from-top duration-300">
            <ProjectForm
              project={editingProject}
              onSuccess={handleFormSuccess}
              onCancel={handleFormCancel}
            />
          </div>
        )}

        {/* Projects Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-3 text-muted-foreground">Loading projects...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 border-2 border-dashed border-border rounded-xl">
            <FolderKanban className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No projects yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first project
            </p>
            <Button onClick={handleCreateClick} className="gap-2">
              <Plus size={18} />
              Create Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;