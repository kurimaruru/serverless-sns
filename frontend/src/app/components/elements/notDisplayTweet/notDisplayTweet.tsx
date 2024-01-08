"use client";

import { sessionState } from "@/app/store/session";
import { Box, Typography } from "@mui/material";
import type { Session } from "next-auth";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

type Props = {
  session: Session | null;
};

export const NotDisplayTweet = (props: Props) => {
  const [session, setSession] = useRecoilState(sessionState);
  useEffect(() => {
    if (session === null) {
      setSession(props.session);
    }
  }, []);
  return (
    <>
      <Box
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        display={"flex"}
      >
        <Typography variant={"h6"} color={"gray"} mt={"50%"}>
          表示できるツイートがありません
        </Typography>
      </Box>
    </>
  );
};
