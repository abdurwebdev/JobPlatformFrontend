export interface JobItem {
  id: string | number;
  title: string;
  company_name: string;
  job_type?: string;
  category?: string;
  salary?: string;
  candidate_required_location?: string;
}