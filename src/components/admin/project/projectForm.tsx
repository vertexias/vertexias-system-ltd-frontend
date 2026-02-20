import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { postProject, updateProject } from "@/services/admin/project";
import { ProjectPayload, ProjectResponse, ProjectStatus } from "@/types/project_type";

interface ProjectFormProps {
  project?: ProjectResponse | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ project, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<ProjectPayload>({
    title: "",
    client: "",
    contact: "",
    contactMethod: "",
    shortDescription: "",
    description: "",
    technologies: [],
    thumbnail: "",
    gallery: [],
    liveUrl: "",
    githubUrl: "",
    status: ProjectStatus.ONGOING,
    order: 0,
  });

  const [techInput, setTechInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // File upload states
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        client: project.client,
        contact: project.contact,
        contactMethod: project.contactMethod,
        shortDescription: project.shortDescription,
        description: project.description,
        technologies: project.technologies,
        thumbnail: project.thumbnail,
        gallery: project.gallery,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        status: project.status,
        order: project.order,
      });
      
      // Set existing image previews
      if (project.thumbnail) {
        setThumbnailPreview(project.thumbnail);
      }
      if (project.gallery && project.gallery.length > 0) {
        setGalleryPreviews(project.gallery);
      }
    }
  }, [project]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle thumbnail file selection
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
        toast.error("Please select a valid image file (jpg, jpeg, png, webp)");
        return;
      }
      
      // Validate file size (3MB)
      if (file.size > 3 * 1024 * 1024) {
        toast.error("File size should not exceed 3MB");
        return;
      }
      
      setThumbnailFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle gallery files selection
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length > 5) {
      toast.error("Maximum 5 gallery images allowed");
      return;
    }
    
    // Validate each file
    const validFiles: File[] = [];
    const previews: string[] = [];
    
    files.forEach((file) => {
      // Validate file type
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) {
        toast.error(`${file.name} is not a valid image file`);
        return;
      }
      
      // Validate file size
      if (file.size > 3 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 3MB`);
        return;
      }
      
      validFiles.push(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        previews.push(reader.result as string);
        if (previews.length === validFiles.length) {
          setGalleryPreviews([...galleryPreviews, ...previews]);
        }
      };
      reader.readAsDataURL(file);
    });
    
    setGalleryFiles([...galleryFiles, ...validFiles]);
  };

  // Remove thumbnail
  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview("");
    setFormData((prev) => ({ ...prev, thumbnail: "" }));
  };

  // Remove gallery image
  const handleRemoveGalleryImage = (index: number) => {
    const newFiles = galleryFiles.filter((_, i) => i !== index);
    const newPreviews = galleryPreviews.filter((_, i) => i !== index);
    setGalleryFiles(newFiles);
    setGalleryPreviews(newPreviews);
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()],
      }));
      setTechInput("");
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      
      // Add all images to FormData
      if (thumbnailFile) {
        formDataToSend.append('images', thumbnailFile);
      }
      
      galleryFiles.forEach((file) => {
        formDataToSend.append('images', file);
      });
      
      // Add all other form fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('shortDescription', formData.shortDescription);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('order', formData.order.toString());
      
      // Add optional fields if they exist
      if (formData.client) formDataToSend.append('client', formData.client);
      if (formData.contact) formDataToSend.append('contact', formData.contact);
      if (formData.contactMethod) formDataToSend.append('contactMethod', formData.contactMethod);
      if (formData.liveUrl) formDataToSend.append('liveUrl', formData.liveUrl);
      if (formData.githubUrl) formDataToSend.append('githubUrl', formData.githubUrl);
      
      // Add technologies as JSON string
      formDataToSend.append('technologies', JSON.stringify(formData.technologies));
      
      // Keep existing images if no new files uploaded
      if (!thumbnailFile && formData.thumbnail) {
        formDataToSend.append('existingThumbnail', formData.thumbnail);
      }
      if (galleryFiles.length === 0 && formData.gallery && formData.gallery.length > 0) {
        formDataToSend.append('existingGallery', JSON.stringify(formData.gallery));
      }

      if (project) {
        await updateProject(project._id, formDataToSend);
        toast.success("Project updated successfully");
      } else {
        await postProject(formDataToSend);
        toast.success("Project created successfully");
      }
      onSuccess();
    } catch (error: any) {
      console.error("Error saving project:", error);
      toast.error(error.message || "Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project ? "Edit Project" : "Create New Project"}</CardTitle>
        <CardDescription>
          {project
            ? "Update your project details"
            : "Fill in the details to create a new project"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Project Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="E.g., E-commerce Platform"
              required
            />
          </div>

          {/* Client & Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client Name</Label>
              <Input
                id="client"
                name="client"
                value={formData.client}
                onChange={handleInputChange}
                placeholder="Optional"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact">Contact</Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Email or Phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactMethod">Contact Method</Label>
              <Input
                id="contactMethod"
                name="contactMethod"
                value={formData.contactMethod}
                onChange={handleInputChange}
                placeholder="E.g., Email, Phone"
              />
            </div>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="shortDescription">
              Short Description <span className="text-red-500">*</span>
            </Label>
            <Input
              id="shortDescription"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleInputChange}
              placeholder="Brief one-line description"
              required
            />
          </div>

          {/* Full Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Full Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed project description..."
              rows={6}
              required
            />
          </div>

          {/* Technologies */}
          <div className="space-y-2">
            <Label htmlFor="technologies">Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                id="technologies"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="E.g., React, Node.js, MongoDB"
              />
              <Button
                type="button"
                onClick={handleAddTechnology}
                variant="outline"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="gap-1">
                  {tech}
                  <X
                    size={14}
                    className="cursor-pointer"
                    onClick={() => handleRemoveTechnology(tech)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Thumbnail Upload */}
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail Image</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  id="thumbnail"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleThumbnailChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Max size: 3MB. Formats: JPG, PNG, WebP
                </p>
              </div>
            </div>
            
            {/* Thumbnail Preview */}
            {thumbnailPreview && (
              <div className="relative w-full h-48 mt-2 border rounded-lg overflow-hidden">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveThumbnail}
                >
                  <X size={16} />
                </Button>
              </div>
            )}
          </div>

          {/* Gallery Upload */}
          <div className="space-y-2">
            <Label htmlFor="gallery">Gallery Images (Max 5)</Label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  id="gallery"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  multiple
                  onChange={handleGalleryChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Max 5 images, each max 3MB. Formats: JPG, PNG, WebP
                </p>
              </div>
            </div>
            
            {/* Gallery Previews */}
            {galleryPreviews.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2">
                {galleryPreviews.map((preview, index) => (
                  <div key={index} className="relative aspect-square border rounded-lg overflow-hidden">
                    <img
                      src={preview}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-1 right-1 h-6 w-6 p-0"
                      onClick={() => handleRemoveGalleryImage(index)}
                    >
                      <X size={12} />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                value={formData.liveUrl}
                onChange={handleInputChange}
                placeholder="https://example.com"
                type="url"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                placeholder="https://github.com/username/repo"
                type="url"
              />
            </div>
          </div>

          {/* Order & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                name="order"
                type="number"
                value={formData.order}
                onChange={handleInputChange}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Project Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: ProjectStatus) =>
                  setFormData((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ProjectStatus.ONGOING}>Ongoing</SelectItem>
                  <SelectItem value={ProjectStatus.PUBLISHED}>Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting
                ? project
                  ? "Updating..."
                  : "Creating..."
                : project
                ? "Update Project"
                : "Create Project"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ProjectForm;