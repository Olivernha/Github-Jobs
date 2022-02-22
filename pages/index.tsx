import { NextPage } from "next"
import { GithubJob } from "../lib/api"
import { getData } from "./api";
import { Layout } from "../components/layout";
import { JobCard } from "../components/jobs";
interface HomeProps {
  jobs: GithubJob[]
}
const Home: NextPage<HomeProps> = (props) => {

  return <Layout title="Home">{props.jobs.map((job) => (
    <JobCard key={job.id} {...job} />
  ))}</Layout>;
}
export async function getServerSideProps() {
  try {
    const dataJson = await getData();
    const jobs = await dataJson.jobs;
    console.log(jobs);
    
    return {
      props: {
        jobs: jobs

      }
    }
  }
  catch (e) {
    return {
      props: {
        jobs: []
      }
    }
  }
}

export default Home
