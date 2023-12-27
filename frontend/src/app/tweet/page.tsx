"use client";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Avatar, Button, Grid, Input, TextareaAutosize } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { StyledFab } from "../components/elements/styledFab/styledFab";
import { tweetData } from "../type/types";
import { useCreateTweet } from "./tweet.hooks";

const _CreateTweet = ({}) => {
  const { handleSubmitAction, onChangeFileInput, binaryForImgData, image } =
    useCreateTweet();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<tweetData>();
  const [disable, setDisable] = useState(true);
  useEffect(() => {
    let len = watch("tweetContent.message").length;
    if (len === 0) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("tweetContent.message")]);

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitAction)}>
        <Grid container mt={1}>
          <Grid item xs={3}>
            <Link href="/home" style={{ textDecoration: "none" }}>
              <Button variant="text">キャンセル</Button>
            </Link>
          </Grid>

          <Grid item xs={9} sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              variant="contained"
              type="submit"
              style={{ borderRadius: "20px" }}
              disabled={disable}
            >
              投稿する
            </Button>
          </Grid>
        </Grid>
        <Avatar
          src="https://img.benesse-cms.jp/pet-cat/item/image/normal/f3978ebc-9030-49e7-aa5e-4a370a955e1b.jpg?w=1200&h=1200&resize_type=cover&resize_mode=force"
          style={{ marginLeft: "3px" }}
        />
        <TextareaAutosize
          maxRows={4}
          placeholder="いまどうしてる？"
          style={{
            width: "100%",
            height: "20vh",
            outline: "none",
            border: "none",
            fontSize: "15pt",
          }}
          {...register("tweetContent.message", { required: true })}
        />
        {errors.tweetContent && <span>This field is required</span>}
        {!!binaryForImgData && (
          <img
            src={`${binaryForImgData}`}
            alt="B64image"
            style={{ width: "100%", height: "40vh", objectFit: "contain" }}
          />
        )}
        <StyledFab color="primary" aria-label="add">
          <label htmlFor="uploadButton">
            <Input
              id="uploadButton"
              type="file"
              {...register("tweetContent.imgName")}
              sx={{ display: "none" }}
              onChange={onChangeFileInput}
            />
            <AddPhotoAlternateIcon />
          </label>
        </StyledFab>
      </form>
    </>
  );
};

export default _CreateTweet;
