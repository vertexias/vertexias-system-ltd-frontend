// src/types/contact_types.ts
export type ContactStatus = "NEW" | "REPLIED" | "VIEWED" | "IN_PROGRESS" | "SPAM" ;
// Define the contact payload structure (for posting and updating contact)
export interface ContactPayload {

    name: string;
    email: string;
    message: string;
  
}

export interface ContactUpdatePayload {

    status?: ContactStatus;
    adminReply?: string;
}

// Define the response structure when a contact is created or updated
export interface ContactResponse {
    name: string;
    email: string;
    message: string;
    status?: ContactStatus;
    adminReply?: string;
    createdAt: string;
    updatedAt: string;
}
