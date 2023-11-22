"use client";

import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Avatar, Button, Grid, Input, TextareaAutosize } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { StyledFab } from "../components/elements/styledFab";
import { tweetData } from "../type/types";

const _CreateTweet = ({}) => {
  const router = useRouter();
  const handleSubmitAction: SubmitHandler<tweetData> = async (tweet) => {
    tweet = {
      id: uuidv4(),
      tweetInfo: {
        userName: "testUser",
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      },
      tweetContent: {
        message: tweet.tweetContent.message,
        imgName: "testImage",
        imgUrl: "testUrl",
      },
      tweetUserAction: {
        good: 0,
        bad: 0,
      },
      userId: "testUserId",
    };

    const res = await fetch("http://localhost:3000/api/tweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tweet),
    });
    console.log("★★★★★★★★★★★", res.json());
    router.push("/home");
  };

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
  // プレビュー表示
  const [binary, setBinay] = useState<string | ArrayBuffer | null | undefined>(
    null
  );
  const [image, setImage] = useState<Blob | undefined>();
  const onChangeFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length === 0) {
      return;
    }
    if (!event.target.files?.[0].type.match("image.*")) {
      return;
    }
    setImage(event.target.files?.[0]);
    const reader = new FileReader();
    reader.onload = (e) => {
      setBinay(e.target?.result);
    };
    console.log("preview");
    reader.readAsDataURL(event.target?.files[0]);
  };
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
        {!!binary && (
          <img
            src={`${binary}`}
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
