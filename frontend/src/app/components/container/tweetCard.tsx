"use client";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import { red } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import { useState } from "react";
import { StyledMenu } from "../elements/styledMenu";

export const TweetCard = ({}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: red[500], objectFit: "contain" }}
            aria-label="recipe"
            src="https://img.benesse-cms.jp/pet-cat/item/image/normal/f3978ebc-9030-49e7-aa5e-4a370a955e1b.jpg?w=1200&h=1200&resize_type=cover&resize_mode=force"
          />
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
              <MenuItem style={{ color: "red" }}>delete</MenuItem>
            </StyledMenu>
          </>
        }
        title="test"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="200"
        image="https://img.benesse-cms.jp/pet-cat/item/image/normal/f3978ebc-9030-49e7-aa5e-4a370a955e1b.jpg?w=1200&h=1200&resize_type=cover&resize_mode=force"
        alt="image"
        style={{ objectFit: "contain" }}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          これはテスト画面ですよー！猫ちゃんかわいい！
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ThumbUpAltIcon />
        </IconButton>
        <Box>1</Box>
        <IconButton aria-label="share">
          <ThumbDownAltIcon />
        </IconButton>
        <Box>2</Box>
      </CardActions>
    </Card>
  );
};
