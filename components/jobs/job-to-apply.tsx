import Link from "next/link";

import { ArrowIcon } from "../common/icon";
import css from "./job.module.css";

export interface JobToApplyProps {
  link: string;
}

export const JobToApply: React.FC<JobToApplyProps> = ({link }) => (
  <div className={css.apply} >
    <Link href="/" >
      <a>
        <ArrowIcon /> Back to search
      </a>
    </Link>
    <h3 className={css["apply-header"]}>how to apply</h3>
    <a href={link}>Click Here</a>
  </div>
);