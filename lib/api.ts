export const API_URL =
  "https://remotive.io/api/remote-jobs";
export interface GithubJob {
  id: string;
  job_type: string;
  url: string;
  tags:string[];
  candidate_required_location: string;
  publication_date: string;
  company_name: string;
  title: string;
  description: string;
  salary: string;
  company_logo: string;
}
