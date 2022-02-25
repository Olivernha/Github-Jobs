import { NextPage } from "next"
import { GithubJob } from "../lib/api"
import { getData } from "./api";
import { Layout } from "../components/layout";
import { JobCard } from "../components/jobs";
import { useEffect, useState } from "react";
import { SearchBox } from "../components/search/search-box";
import { SearchType } from "../components/search/search-type";
import { SearchLocation } from "../components/search";
interface HomeProps {
  jobs: GithubJob[]
}
const Home: NextPage<HomeProps> = (props) => {
  const [jobs, setJobs] = useState<GithubJob[]>(props.jobs);
  const [type, setType] = useState<boolean>(false);
  const [location, setLocation] = useState("");

  const typeHandler = (e: boolean) => {
    setType(e);
    if (e) {
      setJobs(jobs.filter(job => job.job_type === 'full_time'));
    } else {
      setType(e);
      setJobs(props.jobs);
    }
  }
  const locationHandler = (value: string) => {
    
    setLocation(value);

    if (value) {
      setJobs(props.jobs.filter(job => job.candidate_required_location === value));
    }else{
      setLocation('');
      setJobs(props.jobs);
    }
  

  }
  const searchHandler = (search: string) => {

    setJobs(perJob => perJob.filter(job => {
      return job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.company_name.toLowerCase().includes(search.toLowerCase()) ||
        job.description.toLowerCase().includes(search.toLowerCase()) ||
        job.category.toLowerCase().includes(search.toLowerCase())
    }));

  }

  return (
    <Layout title="Home">
      <SearchBox onSearch={searchHandler} />
      <div className="responsive">
        <div className="search-widgets">
          <SearchType checked={type} onChange={typeHandler} />
          <SearchLocation location={location} onChange={locationHandler} />
        </div>
        <div className="full-width">
          {jobs.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
        </div>
      </div>
    </Layout>
  );
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
