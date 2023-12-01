import { Grid } from "@mui/material";
import { TweetCard } from "../components/container/tweetCard";
import { Footer } from "../components/elements/footer";
import { Header } from "../components/elements/header";
import { useFetchTweetsData } from "./home.hooks";

const TweetArea = async () => {
  const { fetchTweetsData } = useFetchTweetsData();
  const tweetsData = await fetchTweetsData();
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "60px" }}>
        <Grid item xs={12}>
          {tweetsData.map((data) => (
            <TweetCard key={data.id} tweet={data} />
          ))}
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "50px" }}>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
};

export default TweetArea;
