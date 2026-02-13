import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';

const JobForm = ({ jobId, jobData, onSubmit }: any) => {
  const [title, setTitle] = useState(jobData?.title || '');
  const [type, setType] = useState(jobData?.type || '');
  const [experience, setExperience] = useState(jobData?.experience || '');
  const [salary, setSalary] = useState(jobData?.salary || '');
  const [location, setLocation] = useState(jobData?.location || '');
  const [deadline, setDeadline] = useState(jobData?.deadline || '');
  const [description, setDescription] = useState(jobData?.description || '');

  const handleSubmit = () => {
    const job = {
      title,
      type,
      experience,
      salary,
      location,
      deadline,
      description,
      status: 'open', // Assuming it's always open, you can change as per your logic
      isActive: true, // Assuming it's always active, you can change as per your logic
    };
    onSubmit(job);
  };

  return (
    <div className="p-6 bg-gray-900 rounded-md shadow-md w-full max-w-lg mx-auto">
      <h3 className="text-2xl font-semibold text-white mb-6">{jobId ? 'Update Job' : 'Post New Job'}</h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="text-white text-sm font-medium">Job Title</label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="type" className="text-white text-sm font-medium">Job Type</label>
          <Input
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="experience" className="text-white text-sm font-medium">Experience Level</label>
          <Input
            id="experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="salary" className="text-white text-sm font-medium">Salary</label>
          <Input
            id="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="text-white text-sm font-medium">Location</label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="deadline" className="text-white text-sm font-medium">Deadline</label>
          <Input
            id="deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="text-white text-sm font-medium">Job Description</label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 p-2 w-full rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <Button onClick={handleSubmit} className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
          {jobId ? 'Update Job' : 'Post Job'}
        </Button>
      </div>
    </div>
  );
};

export default JobForm;
