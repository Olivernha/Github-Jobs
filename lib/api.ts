export const API_URL =
  "https://arbeitnow-free-job-board.p.rapidapi.com/api/job-board-api";
export interface GithubJob {
  slug: string;
  company_name: string;
  created_at: string;
  description: string;
  job_types: string[];
  tags: string[];
  url: string;
  location: string;
  title: string;
  remote: boolean;
}
