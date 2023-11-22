"use client";

import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { TweetCard } from "../components/container/tweetCard";
import { Footer } from "../components/elements/footer";
import { Header } from "../components/elements/header";
import { ProgressCircle } from "../components/elements/progressCircle";
import { useFetchTweetsData } from "./home.hooks";

const TweetArea = () => {
  const { fetchTweetsData, tweetsData } = useFetchTweetsData();
  useEffect(() => {
    console.log("useEffect");
    fetchTweetsData();
  }, []);
  return (
    <>
      {tweetsData.length !== 0 ? (
        <>
          <Grid container>
            <Grid item xs={12}>
              <Header />
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "60px" }}>
            <Grid item xs={12}>
              {tweetsData.map((data) => (
                <TweetCard key={data.id} />
              ))}
            </Grid>
          </Grid>
          <Grid container style={{ marginTop: "50px" }}>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </>
      ) : (
        <>
          <Grid container justifyContent="center">
            <Grid item>
              <ProgressCircle />
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "black",
                  textDecoration: "none",
                }}
              >
                Now Loading...
              </Typography>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default TweetArea;
