import { NextPage } from "next"
import { GithubJob } from "../lib/api"
import { getData } from "./api";
import { Layout } from "../components/layout";
import { JobCard } from "../components/jobs";
import { useEffect } from "react";
interface HomeProps {
  jobs: GithubJob[]
}
const Home: NextPage<HomeProps> = (props) => {
  const searchHandler = () =>{
    fetch('/api',{
      method: 'POST',
      body:JSON.stringify({
        limit:10,
        search:'well-being conversation'
      })
    })
    .then((res) => res.json())
      .then(console.log)
      .catch(console.log);
  }
  useEffect(() => {
    searchHandler();
  }, []);
  return <Layout title="Home">{props.jobs.map((job) => (
    <JobCard key={job.id} {...job} />
  ))}</Layout>;
}
export async function getServerSideProps() {
  try {
    const dataJson = await getData();
    const jobs = await dataJson.jobs;
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
