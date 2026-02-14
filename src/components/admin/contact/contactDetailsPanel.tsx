import { Button } from "@/components/ui/button";
import { ContactStatus } from "@/types/contact_type";

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
  contact: Contact;
  updatingId: string | null;
  onStatusChange: (contact: Contact, status: string) => void;
}

export default function ContactDetailsPanel({
  contact,
  updatingId,
  onStatusChange,
}: Props) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-gray-100 text-gray-800";
      case "VIEWED":
        return "bg-blue-100 text-blue-800";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800";
      case "SPAM":
        return "bg-red-100 text-red-800";
      case "REPLIED":
        return "bg-green-100 text-green-800";
      default:
        return "bg-muted/10 text-muted-foreground";
    }
  };

  return (
    <tr className="bg-muted/20 border-b border-border animate-fade-in">
      <td colSpan={6} className="px-6 py-6">
        <div className="flex flex-col gap-4">
          
          {/* Full Message */}
          <div>
            <h4 className="text-sm font-semibold mb-2">
              Full Message:
            </h4>

            {/* Professional message container */}
            <div className="bg-background p-4 rounded-lg border border-border max-h-[300px] overflow-y-auto">
              <p className="whitespace-pre-wrap leading-relaxed break-words">
                {contact.message}
              </p>
            </div>
          </div>

          {/* Metadata */}
          <div className="flex justify-between text-sm text-muted-foreground">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {new Date(contact.createdAt).toLocaleString()}
            </div>

            {contact.updatedAt && (
              <div>
                <span className="font-medium">Last updated:</span>{" "}
                {new Date(contact.updatedAt).toLocaleString()}
              </div>
            )}
          </div>

          {/* Status Section */}
          <div className="pt-3 border-t border-border">
            <p className="text-sm font-medium mb-2">
              Update Status:
            </p>

            <div className="flex gap-3 flex-wrap">
              {["IN_PROGRESS", "SPAM", "REPLIED"].map((status) => (
                <Button
                  key={status}
                  size="sm"
                  variant="outline"
                  disabled={
                    updatingId === contact._id ||
                    contact.status === status
                  }
                  onClick={() => onStatusChange(contact, status)}
                  className={
                    contact.status === status
                      ? getStatusColor(status) + " border-2 font-semibold"
                      : ""
                  }
                >
                  {updatingId === contact._id &&
                  contact.status !== status
                    ? "Updating..."
                    : status.replace("_", " ")}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
