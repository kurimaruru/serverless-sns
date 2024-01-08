import { Grid } from "@mui/material";
import { TweetCard } from "../components/container/tweetCard/tweetCard";
import { Footer } from "../components/elements/footer/footer";
import { Header } from "../components/elements/header/header";
import { NotDisplayTweet } from "../components/elements/notDisplayTweet/notDisplayTweet";
import { fetchSession } from "../hooks/session";
import { useFetchTweetsData } from "./home.hooks";

const TweetArea = async () => {
  const session = await fetchSession();
  // TODO: フォロー機能を実装したら、フォローしているユーザーのツイートのみを表示するようにする
  const { fetchTweetsData } = useFetchTweetsData([session!.user!.email!]);
  const tweetsData = await fetchTweetsData();

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Header session={session} />
        </Grid>
      </Grid>
      <Grid container style={{ marginTop: "60px" }}>
        <Grid item xs={12}>
          {tweetsData.length !== 0 ? (
            tweetsData.map((data) => (
              <TweetCard key={data.id} tweet={data} session={session} />
            ))
          ) : (
            <NotDisplayTweet session={session} />
          )}
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
