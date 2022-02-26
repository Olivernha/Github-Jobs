import { NextPage } from "next"
import { GithubJob } from "../lib/api"
import { getData } from "./api";
import { Layout } from "../components/layout";
import { JobCard } from "../components/jobs";
import { useEffect, useMemo, useState } from "react";
import { SearchBox } from "../components/search/search-box";
import { SearchType } from "../components/search/search-type";
import { SearchLocation } from "../components/search";
import { Pagination } from "../components/pagination/pagination";

let PageSize = 10;
interface HomeProps {
  jobs: GithubJob[]
}
const Home: NextPage<HomeProps> = (props) => {
  let pageSize = 5;
  const [page, setPage] = useState(1);
  const [startIndex, setStartIndex] = useState(page * pageSize - pageSize);
  const [pages] = useState(Math.round(props.jobs.length / pageSize));
  const [jobs, setJobs] = useState<GithubJob[]>(props.jobs.slice(startIndex, startIndex + pageSize));

  const [type, setType] = useState<boolean>(false);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   if(type){
  //     setJobs(jobs.filter(job => job.job_type === 'full_time').slice(startIndex, startIndex + pageSize));
  //   }else{
  //     setJobs(props.jobs.slice(startIndex, startIndex + pageSize));
  //   }

  // },[startIndex ,type])



  const typeHandler = (e: boolean) => {
    console.log(page);
    if (e) {
      setType(e);
      console.log('type true');
      setJobs(props.jobs.filter(job => job.job_type === 'full_time').slice(page * pageSize - pageSize, page * pageSize - pageSize + pageSize));
    } else {
      setType(e);
      console.log('type false');
      setJobs(props.jobs.filter(job => job.job_type === 'full_time').slice(page * pageSize - pageSize, page * pageSize - pageSize + pageSize));
      // setJobs(jobs.slice(startIndex, startIndex + pageSize));
    }
  }

  const locationHandler = (value: string) => {
    setLocation(value);
    if (value) {
      const filteredJobs = props.jobs.filter(job => job.candidate_required_location === value);
      setJobs(filteredJobs);
    } else {
      setLocation('');
      setJobs(props.jobs.slice(startIndex, startIndex + pageSize));
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
  const handlePageChange = (count: number) => {
    setPage(count);
    console.log(count);
    // setStartIndex(count * pageSize - pageSize);
    setJobs(props.jobs.slice(count * pageSize - pageSize, count * pageSize - pageSize + pageSize));
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
          <Pagination
            current={page}
            onChange={handlePageChange}
            hasNext={jobs.length === 5}
            disabled={loading}
            pages={pages}
          />
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
