// src/services/admin/project.ts
import axios from "axios";
import { apiClient } from "../base/api";
import { ProjectResponse } from "@/types/project_type";

/**
 * Get all projects
 */
export async function getProjects() {
  try {
    const res = await apiClient.get<{ success: boolean; data: ProjectResponse[] }>("/project");
    // Handle different response formats
    return res.data.data || res.data || [];
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ||
        "Failed to fetch projects";
      const status = err.response?.status ?? 0;
      throw { status, message: msg };
    }
    throw { status: 0, message: "Failed to fetch projects" };
  }
}

/**
 * Get single project by ID
 */
export async function getProject(projectId: string) {
  try {
    const res = await apiClient.get<ProjectResponse>(`/project/${projectId}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ||
        "Failed to fetch project";
      const status = err.response?.status ?? 0;
      throw { status, message: msg };
    }
    throw { status: 0, message: "Failed to fetch project" };
  }
}

/**
 * Create a new project with file upload
 * @param payload - FormData containing project data and images
 */
export async function postProject(payload: FormData) {
  try {
    const res = await apiClient.post<ProjectResponse>("/project", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ||
        "Failed to create project";
      const status = err.response?.status ?? 0;
      throw { status, message: msg };
    }
    throw { status: 0, message: "Failed to create project" };
  }
}

/**
 * Update a project by ID with file upload
 * @param projectId - Project ID
 * @param payload - FormData containing updated project data and images
 */
export async function updateProject(projectId: string, payload: FormData) {
  try {
    const res = await apiClient.patch<ProjectResponse>(`/project/${projectId}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ||
        "Failed to update project";
      const status = err.response?.status ?? 0;
      throw { status, message: msg };
    }
    throw { status: 0, message: "Failed to update project" };
  }
}

/**
 * Delete a project by ID
 */
export async function deleteProject(projectId: string) {
  try {
    const res = await apiClient.delete(`/project/${projectId}`);
    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ||
        "Failed to delete project";
      const status = err.response?.status ?? 0;
      throw { status, message: msg };
    }
    throw { status: 0, message: "Failed to delete project" };
  }
}