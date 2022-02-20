import { NextPage } from "next"
import { GithubJob } from "../lib/api"
import { getData } from "./api";
import { Layout } from "../components/layout";
const Home: NextPage<GithubJob[]> = (props) => {

  return <Layout title="Home">Home page works!</Layout>;
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
