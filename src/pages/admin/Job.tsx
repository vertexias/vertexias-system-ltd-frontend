// src/pages/job.tsx
import JobForm from '@/components/admin/job/JobForm';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { deleteJob, postJob, updateJob } from '@/services/admin/job';
import React, { useState, useEffect } from 'react';

const Job = () => {
  const [jobData, setJobData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
    const { isAuthenticated } = useAuth();


  useEffect(() => {
    // Fetch job data if updating (Replace with actual job id)
    if (isEditing && jobData) {
      setJobData(jobData);
    }
  }, [isEditing, jobData]);

  const handlePostJob = async (job: any) => {
    try {
      const newJob = await postJob(job);
      alert('Job posted successfully');
      console.log(newJob);
    } catch (error) {
      alert('Error posting job');
    }
  };

  const handleUpdateJob = async (job: any) => {
    try {
      const updatedJob = await updateJob(jobData.id, job);
      alert('Job updated successfully');
      console.log(updatedJob);
    } catch (error) {
      alert('Error updating job');
    }
  };

  const handleDeleteJob = async () => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        await deleteJob(jobData.id);
        alert('Job deleted successfully');
        setJobData(null); // Reset job data after delete
      } catch (error) {
        alert('Error deleting job');
      }
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Job Management</h1>
      {!jobData ? (
        <JobForm jobData={null} onSubmit={handlePostJob} />
      ) : (
        <>
          <JobForm jobId={jobData.id} jobData={jobData} onSubmit={handleUpdateJob} />
          <Button onClick={handleDeleteJob} className="mt-4 bg-red-600 text-white">
            Delete Job
          </Button>
        </>
      )}
    </div>
  );
};

export default Job;
