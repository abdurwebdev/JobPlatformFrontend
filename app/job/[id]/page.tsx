import { Metadata } from "next";
import JobDetailClient from "./JobDetailClient";
import { api } from "@/app/services/api";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getJobData(id: string) {
  try {
    // Note: If this fails on your local environment, make sure your api instance 
    // uses a full absolute URL (e.g., http://localhost:3000/api) when running server-side.
    const response = await api.get(`/job/job-detail/${id}`);
    return response.data?.job || response.data;
  } catch (error) {
    console.error("Failed to fetch job on server:", error);
    return null;
  }
}

// 1. Dynamic Metadata Generation for SEO & Tab Title
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const job = await getJobData(resolvedParams.id);

  if (!job) {
    return {
      title: "Position Not Found | Job Platform",
    };
  }

  const title = `${job.title} – ${job.company_name} | Job Platform`;
  const cleanDescription = job.description 
    ? job.description.replace(/<\/?[a-z][\s\S]*>/i, "").substring(0, 160)
    : "View details for this position.";

  return {
    title,
    description: cleanDescription,
    openGraph: {
      title,
      description: cleanDescription,
      type: "article",
      url: `https://job-platform-frontend-62ud.vercel.app/api/job/${resolvedParams.id}`,
    },
   // Find your metadata return statement and update the twitter block to look like this:
twitter: {
  card: "summary_large_image", // Must be a valid literal type
  title: title,
  description: "This is the Rozgar App. " + (cleanDescription || ""), // Combine your custom text here
},
  };
}

// 2. Core Server Page Entry
export default async function JobDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const initialJobData = await getJobData(resolvedParams.id);

  // We pass the fetched data safely down to our client viewer
  return <JobDetailClient initialData={initialJobData} />;
}