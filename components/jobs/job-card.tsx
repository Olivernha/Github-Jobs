import { NextPage } from "next"
import Link from "next/link";

import css from "./job.module.css";
import { ClockIcon, GlobeIcon } from "../common/icon";
import { GithubJob } from "../../lib/api";
import { fromToday } from "../../lib/date";
import { JobImage } from "./job-image";

export interface JobCardProps extends GithubJob {

}
export const JobCard: NextPage<JobCardProps> = ({
    company_name,
    id,
    job_type,
    title,
    candidate_required_location,
    publication_date,
    company_logo,

}) => {
    return (
        <Link href={`/job/${id}`} passHref>
            <div className={css.card}>

                <JobImage src={company_logo} alt={company_name} size={90} />
                <div className={css.info}>
                    <h2>{company_name}</h2>
                    <h3>{title}</h3>
                    <div className={css["info-line"]}>
                        {job_type.length > 0 && <span className={css["job-type"]}>{job_type}</span>}

                        <div className={css["icon-line"]}>
                            <span>
                                <GlobeIcon /> {candidate_required_location}
                            </span>
                            <span style={{ marginLeft: "1rem" }}>
                                <ClockIcon /> {fromToday(publication_date)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}