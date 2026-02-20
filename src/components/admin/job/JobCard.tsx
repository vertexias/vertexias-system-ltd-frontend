import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, MapPin, Clock, Briefcase, Users } from "lucide-react";
import { JobResponse } from "@/types/job_type";

interface JobCardProps {
  job: JobResponse;
  onEdit: (job: JobResponse) => void;
  onDelete: (_id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "closed":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200";
    }
  };

  const formatDeadline = (deadline: string) => {
    if (!deadline) return null;
    const date = new Date(deadline);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isDeadlinePassed = (deadline: string) => {
    if (!deadline) return false;
    return new Date(deadline) < new Date();
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <CardTitle className="line-clamp-1">{job.title}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">
              {job.description}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge className={getStatusColor(job.status)}>
              {job.status === "open" ? "Open" : "Closed"}
            </Badge>
            {!job.isActive && (
              <Badge variant="outline" className="text-xs">
                Inactive
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Job Meta Info */}
        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          {job.type && (
            <div className="flex items-center gap-1.5">
              <Briefcase size={14} />
              <span className="capitalize">{job.type}</span>
            </div>
          )}
          {job.location && (
            <div className="flex items-center gap-1.5">
              <MapPin size={14} />
              <span className="line-clamp-1">{job.location}</span>
            </div>
          )}
          {job.experience && (
            <div className="flex items-center gap-1.5">
              <Users size={14} />
              <span className="capitalize">{job.experience}</span>
            </div>
          )}
          {job.deadline && (
            <div
              className={`flex items-center gap-1.5 ${
                isDeadlinePassed(job.deadline) ? "text-red-500" : ""
              }`}
            >
              <Clock size={14} />
              <span>
                {isDeadlinePassed(job.deadline) ? "Expired: " : "Due: "}
                {formatDeadline(job.deadline)}
              </span>
            </div>
          )}
        </div>

        {/* Salary */}
        {job.salary && (
          <div className="text-sm font-medium text-foreground">
            💰 {job.salary}
          </div>
        )}

        {/* Application Count */}
        {typeof job.applicationCount === "number" && (
          <div className="text-xs text-muted-foreground">
            {job.applicationCount} application
            {job.applicationCount !== 1 ? "s" : ""}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 border-t bg-muted/20 pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(job)}
          className="flex-1 gap-2"
        >
          <Edit size={14} />
          Edit
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete(job._id)}
          className="flex-1 gap-2"
        >
          <Trash2 size={14} />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JobCard;