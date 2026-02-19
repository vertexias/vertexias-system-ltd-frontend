
import axios from "axios";
import { apiClient } from "../base/api";
import { ContactPayload, ContactResponse, ContactUpdatePayload } from "@/types/contact_type";
// API call for creating a job
export async function postContact(payload: ContactPayload) {
  try {
    const res = await apiClient.post<ContactResponse>("/contact", payload);
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

// API call for updating a contact by ID
export async function updateContact(contactId: string, payload: ContactUpdatePayload) {
  try {
    const res = await apiClient.patch<ContactResponse>(`/contact/${contactId}`, payload);
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

// GET all contacts
export async function getContacts() {
  try {
    const res = await apiClient.get<ContactResponse[]>("/contact");
    return res.data;
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


// API call for deleting a contact by ID
export async function deleteContact(contactId: string) {
  try {
    const res = await apiClient.delete(`/contact/${contactId}`);
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
