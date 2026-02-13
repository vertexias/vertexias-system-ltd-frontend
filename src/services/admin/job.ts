
import axios from "axios";
import { apiClient } from "../base/api";
import { JobPayload, JobResponse } from "@/types/job_type";
// API call for creating a job
export async function postJob(payload: JobPayload) {
  try {
    const res = await apiClient.post<JobResponse>("/jobs", payload);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ||
        "Something went wrong";
      const status = err.response?.status ?? 0;
      throw { status, message: msg };
    }
    throw { status: 0, message: "Something went wrong" };
  }
}

// API call for updating a job by ID
export async function updateJob(jobId: string, payload: JobPayload) {
  try {
    const res = await apiClient.put<JobResponse>(`/jobs/${jobId}`, payload);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ||
        "Something went wrong";
      const status = err.response?.status ?? 0;
      throw { status, message: msg };
    }
    throw { status: 0, message: "Something went wrong" };
  }
}

// API call for deleting a job by ID
export async function deleteJob(jobId: string) {
  try {
    const res = await apiClient.delete(`/jobs/${jobId}`);
    return res;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const msg =
        (err.response?.data as { message?: string })?.message ||
        "Something went wrong";
      const status = err.response?.status ?? 0;
      throw { status, message: msg };
    }
    throw { status: 0, message: "Something went wrong" };
  }
}
