import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Mail } from "lucide-react";
import { ContactStatus } from "@/types/contact_type";
import { toast } from "sonner";
import {
  updateContact,
} from "@/services/contact/contact";
import ContactDetailsPanel from "./contactDetailsPanel";

interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

interface Props {
  contacts: Contact[];
  onDelete: (id: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
}

export default function ContactTable({
  contacts,
  onDelete,
  onUpdateStatus,
}: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleRowClick = async (contact: Contact) => {
    if (expandedId === contact._id) {
      // Close panel if already expanded
      setExpandedId(null);
      return;
    }

    // Open panel
    setExpandedId(contact._id);

    // If status is not VIEWED, mark as VIEWED
    if (contact.status === "NEW") {
      setUpdatingId(contact._id);
      try {
        await updateContact(contact._id, { status: "VIEWED" as ContactStatus });
        // Update local state immediately
        onUpdateStatus(contact._id, "VIEWED");
      } catch (error) {
        console.error("Error updating status:", error);
        toast.error("Failed to update status");
      } finally {
        setUpdatingId(null);
      }
    }
  };

  const handleStatusChange = async (contact: Contact, status: string) => {
    setUpdatingId(contact._id);
    try {
      await updateContact(contact._id, { status: status as ContactStatus });
      // Update local state immediately
      onUpdateStatus(contact._id, status);
      setExpandedId(null); // Collapse panel after status change
      toast.success("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
      case "VIEWED":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "SPAM":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "REPLIED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card shadow-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/40 border-b border-border">
            <tr className="text-muted-foreground">
              <th className="px-6 py-4 text-left font-medium">Name</th>
              <th className="px-6 py-4 text-left font-medium">Email</th>
              <th className="px-6 py-4 text-left font-medium">Message Preview</th>
              <th className="px-6 py-4 text-left font-medium">Date</th>
              <th className="px-6 py-4 text-left font-medium">Status</th>
              <th className="px-6 py-4 text-center font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-16 text-muted-foreground"
                >
                  No contact messages yet.
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <>
                  <tr
                    key={contact._id}
                    className={`border-b border-border cursor-pointer transition-colors hover:bg-muted/50 ${
                      updatingId === contact._id ? 'opacity-50' : ''
                    }`}
                    onClick={() => handleRowClick(contact)}
                  >
                    <td className="px-6 py-5 font-medium text-foreground">
                      {contact.name}
                    </td>

                    <td className="px-6 py-5 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-primary flex-shrink-0" />
                        <span className="truncate">{contact.email}</span>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-muted-foreground">
                      <div className="max-w-md">
                        <div className="line-clamp-2">
                          {contact.message}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-muted-foreground whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {contact.status.replace("_", " ")}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-center">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent row click
                          onDelete(contact._id);
                        }}
                        className="gap-2"
                      >
                        <Trash2 size={14} />
                        Delete
                      </Button>
                    </td>
                  </tr>

                  {/* Expandable Panel */}
                  {expandedId === contact._id && (
                    <ContactDetailsPanel
                      contact={contact}
                      updatingId={updatingId}
                      onStatusChange={handleStatusChange}
                    />
                    )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}