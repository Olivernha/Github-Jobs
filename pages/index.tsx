import { NextPage } from "next"
import { GithubJob } from "../lib/api"
import { getData } from "./api";
const Home: NextPage<GithubJob[]> = (props) => {

  return (
    <h1>Github Jobs</h1>
  )
}
export async function getServerSideProps() {
  try {
    const dataJson= await getData();
    const jobs= await dataJson.data;

    return {
      props: {
        jobs : jobs

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
