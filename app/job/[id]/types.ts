export interface JobData {
  id: string;
  title: string;
  company_name: string;
  url: string;
  category?: string;
  tags?: string[];
  job_type?: string;
  publication_date?: string;
  candidate_required_location?: string;
  salary?: string;
  description: string;
  source?: string;
}