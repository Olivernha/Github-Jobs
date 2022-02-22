import css from "./job.module.css";
import { GithubJob } from "../../lib/api";
import { fromToday } from "../../lib/date";
import { JobToApply } from "./job-to-apply";
import { JobHeader } from "./job-header";


export interface JobDescriptionProps extends GithubJob {}

export const JobDescription: React.FC<JobDescriptionProps> = ({
  title,
  description,
  candidate_required_location,
  job_type,
  company_name,
  company_logo,
  publication_date,
  url

}) => {
  return (
    <div className={css["job-description"]}>
      <JobToApply link={url} />
      <div>
        <JobHeader
          title={title}
          location={candidate_required_location}
          type={job_type}
          company={company_name}
          logo={company_logo}
          daysAgo={fromToday(publication_date)}
        />
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  );
};