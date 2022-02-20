import { NextPage } from "next"
import Link from "next/link";

import css from "./job.module.css";
import { ClockIcon, GlobeIcon } from "../common/icon";
import { GithubJob } from "../../lib/api";
import { fromToday } from "../../lib/date";
import { JobImage } from "./job-image";

export interface JobCardProps extends GithubJob { }{

}
export const JobCard: NextPage<JobCardProps> = ({
    company_name,
    slug,
    job_types,
    title,
    location,
    created_at,

}) => {
    return (
        <Link href={`/page/${slug}`} passHref>
            <div className={css.card}>
           
            <JobImage src={'https://via.placeholder.com/500'} alt={company_name} size={90} />
             <div className={css.info}>
                    <h2>{company_name}</h2>
                    <h3>{title}</h3>
                    <div className={css["info-line"]}>
                    {job_types.length === 0 && <span className={css["job-type"]}>No Type yet</span>}
                        {job_types.length > 0 && <span className={css["job-type"]}>{job_types.map(t => t.replace(/./, c => c.toUpperCase()) + '  ')}</span>}
                        <div className={css["icon-line"]}>
                            <span>
                                <GlobeIcon /> {location}
                            </span>
                            <span style={{ marginLeft: "1rem" }}>
                                <ClockIcon /> {fromToday(created_at)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}