"use client";

import { tweetData } from "@/app/type/types";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import type { Session } from "next-auth";
import { useState } from "react";
import { StyledMenu } from "../../elements/styledMenu/styledMenu";
import { fetchTweetImagge } from "./tweetCard.hooks";

type Props = {
  tweet: tweetData;
  session: Session | null;
};

export const TweetCard = (props: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { imageUrl } = fetchTweetImagge(props.tweet);

  return (
    <Card>
      <CardHeader
        avatar={
          props.session && props.session.user ? (
            <Avatar alt="Remy Sharp" src={props.session.user.image ?? ""} />
          ) : (
            <Avatar
              alt="Remy Sharp"
              src={
                "https://kotonohaworks.com/free-icons/wp-content/uploads/kkrn_icon_user_1-768x768.png"
              }
            />
          )
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem style={{ color: "red" }}>削除</MenuItem>
            </StyledMenu>
          </>
        }
        title={props.tweet.id}
        subheader={props.tweet.tweetInfo.createdAt}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.tweet.tweetContent.message}
        </Typography>
      </CardContent>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt="image"
        style={{ objectFit: "contain" }}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ThumbUpAltIcon />
        </IconButton>
        <Box>{props.tweet.tweetUserAction.good}</Box>
        <IconButton aria-label="share">
          <ThumbDownAltIcon />
        </IconButton>
        <Box>{props.tweet.tweetUserAction.bad}</Box>
      </CardActions>
    </Card>
  );
};
