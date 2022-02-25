import { useRouter } from "next/router";
import { useEffect } from "react";
import { getData } from "../api";
// import { JobDescription } from "../../components/job/job-description";
import { Layout } from "../../components/layout";
import {  GithubJob } from "../../lib/api";
import { JobDescription } from "../../components/jobs/job-description";

export interface JobProps {
  job: GithubJob;
  redirect: boolean;
}

export const Job: React.FC<JobProps> = ({ job, redirect }) => {
  const router = useRouter();
  useEffect(() => {
    if (redirect) {
      router.push("/404");
    }
  }, [redirect]);
  console.log(job);
  
  const title = job?.title ? `${job.title}` : "Job Listing";
  console.log(title);
  
  return (
    <Layout title={title}>{Boolean(job) && <JobDescription {...job} />}</Layout>
  );
};

export const getServerSideProps = async (context: any) => {
  try {
    const { id } =  context.params;
    const data = await getData();
    const jobData = await data.jobs;
    const job = await jobData.filter((j: GithubJob) => +j.id === +id)[0];
    if(!job) {
      return { props: { job: {}, redirect: true } };
    }
    return { props: { job: job, redirect: false } };
  } catch (err) {
    return { props: { job: {}, redirect: true } };
  }
};

export default Job;