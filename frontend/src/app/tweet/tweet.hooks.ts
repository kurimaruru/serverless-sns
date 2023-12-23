import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { tweetData } from "../type/types";

/** tweet生成するためのhooks */
export const useCreateTweet = () => {
  const router = useRouter();
  /** tweet生成のapi */
  const handleSubmitAction: SubmitHandler<tweetData> = async (
    tweet
  ): Promise<void> => {
    tweet = {
      id: uuidv4(),
      tweetInfo: {
        userName: "testUser",
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
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
    try {
      const res = await fetch("http://localhost:3000/api/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tweet),
      });
      if (res.status !== 200) throw new Error("Failed to tweet");
      router.push("/home");
    } catch (e) {
      console.log(e);
    }
  };
  // プレビュー表示
  const [binaryForImgData, setBinay] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [image, setImage] = useState<Blob | undefined>();
  /** 画像アップロード時にプレビュー表示するためのhooks */
  const onChangeFileInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
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
  return {
    handleSubmitAction,
    onChangeFileInput,
    binaryForImgData,
    image,
  };
};
