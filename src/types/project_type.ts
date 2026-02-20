// src/types/project_types.ts
export enum ProjectStatus {
  ONGOING = "ONGOING",
  PUBLISHED = "PUBLISHED",
}

// Payload for creating or updating a project
export interface ProjectPayload {
  title: string;
  client?: string;
  contact?: string;
  contactMethod?: string;

  shortDescription: string;
  description: string;

  technologies: string[];   

  thumbnail?: string;
  gallery?: string[];

  liveUrl?: string;
  githubUrl?: string;

  status?: ProjectStatus;   
  order?: number;           
}


export interface ProjectResponse {
  _id: string;              
  title: string;
  client?: string;
  contact?: string;
  contactMethod?: string;

  shortDescription: string;
  description: string;

  technologies: string[];

  thumbnail?: string;
  gallery?: string[];

  liveUrl?: string;
  githubUrl?: string;

  status: ProjectStatus;
  order: number;

  createdAt: string;
  updatedAt: string;
}
