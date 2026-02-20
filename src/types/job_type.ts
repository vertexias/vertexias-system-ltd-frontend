// src/types/job_types.ts

// Define the job payload structure (for posting and updating jobs)
export interface JobPayload {
  title: string;
  type: string;  // E.g., full-time, part-time
  experience: string;  // E.g., junior, mid, senior
  salary: string;  // E.g., 60000 USD
  location: string;  // E.g., New York, NY
  deadline: string;  // E.g., 2026-05-01T23:59:59.999Z
  description: string;  // Job description
  status: string;  // E.g., open, closed
  isActive: boolean;  // Whether the job is active or not
}

// Define the response structure when a job is created or updated
export interface JobResponse {
  _id: string;  // Job ID (if created or fetched)
  title: string;
  type: string;
  experience: string;
  salary: string;
  location: string;
  deadline: string;
  description: string;
  status: string;
  applicationCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
