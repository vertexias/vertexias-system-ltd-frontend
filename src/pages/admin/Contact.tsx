import React, { useEffect, useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import ContactTable from "@/components/admin/contact/contactTable";
import { getContacts, deleteContact } from "@/services/contact/contact";
import { MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (err) {
      toast.error("Failed to load contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  
  const handleUpdateStatus = (id: string, status: string) => {
  setContacts((prev) =>
    prev.map((contact) =>
      contact._id === id ? { ...contact, status } : contact
    )
  );
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
      toast.success("Contact deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />

      <div className="flex-1 p-10 space-y-10">
        
        {/* Header Section */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Manage Contacts
            </h1>
          </div>

          <p className="text-muted-foreground">
            View and manage user contact messages from your website.
          </p>
        </div>

        {/* Table Section */}
        {loading ? (
          <div className="text-muted-foreground">Loading contacts...</div>
        ) : (
          <ContactTable contacts={contacts} onDelete={handleDelete} onUpdateStatus={handleUpdateStatus} />
        )}
      </div>
    </div>
  );
}

export default Contact;
