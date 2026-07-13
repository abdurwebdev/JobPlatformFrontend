import { Metadata } from "next";
import { api } from "@/app/services/api";
import JobDetailClient from "./JobDetailClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getJobData(id: string) {
  try {
    const response = await api.get(`/job/job-detail/${id}`);
    return response.data?.job || response.data;
  } catch (error) {
    console.error("Failed to fetch job asset on server runtime:", error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const job = await getJobData(resolvedParams.id);

  if (!job) {
    return { title: "Position Not Found | Job Platform" };
  }

  return {
    title: `${job.title} – ${job.company_name} | Job Platform`,
    description: job.description 
      ? job.description.replace(/<\/?[a-z][\s\S]*>/i, "").substring(0, 160)
      : "View full structural operational demands for this role.",
  };
}

export default async function JobDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const initialJobData = await getJobData(resolvedParams.id);

  return <JobDetailClient initialData={initialJobData} />;
}