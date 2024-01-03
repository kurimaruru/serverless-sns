import type { Session } from "next-auth";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { tweetData } from "../type/types";
import { apiClient } from "../utils/baseApi";

/** tweet生成するためのhooks */
export const useCreateTweet = (session: Session | null) => {
  const router = useRouter();
  const [binaryForImgData, setBinay] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [image, setImage] = useState<Blob | undefined>();
  const id = uuidv4();

  /** tweet生成のapi */
  const handleSubmitAction: SubmitHandler<tweetData> = async (
    tweet: tweetData
  ): Promise<void> => {
    const uploadUrl = await getUploadUrl(session, id);
    if (image !== undefined && uploadUrl !== null)
      putTweetImageToStorage(uploadUrl, image as Blob);
    const tweetReqData = await createTweetRequestData(id, tweet, session);
    try {
      await apiClient(
        "/api/create_tweet",
        "POST",
        "no-store",
        JSON.stringify(tweetReqData)
      );
      router.push("/home");
    } catch (e) {
      console.log(e);
    }
  };

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
    reader.readAsDataURL(event.target?.files[0]);
  };
  return {
    handleSubmitAction,
    onChangeFileInput,
    binaryForImgData,
    image,
  };
};

const createTweetRequestData = async (
  id: string,
  tweet: tweetData,
  session: Session | null
): Promise<tweetData | null> => {
  if (session === null || session.user === undefined) return null;

  const requestData = {
    id,
    tweetInfo: {
      userName: session.user.name!,
      createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
    },
    tweetContent: {
      message: tweet.tweetContent.message,
      imgName: tweet.tweetContent.imgName,
    },
    tweetUserAction: {
      good: 0,
      comments: [],
    },
    userId: session.user.email!,
  };
  return requestData;
};

const getUploadUrl = async (
  session: Session | null,
  tweetId: string
): Promise<string | null> => {
  if (session === null || session.user === undefined) return null;
  const response = await apiClient(
    "/api/upload_url",
    "POST",
    "no-store",
    JSON.stringify({ userId: session.user.email, tweetId })
  );
  return response.presignedUrl;
};

const putTweetImageToStorage = async (
  uploadUrl: string,
  image: Blob
): Promise<void> => {
  let binaryData: ArrayBuffer | null | string;
  const reader = new FileReader();
  reader.readAsArrayBuffer(image);
  reader.onloadend = () => {
    binaryData = reader.result;
  };
  if (process.env.NEXT_PUBLIC__ENV === "local") {
    console.log("アップロード完了");
  } else {
    await fetch(uploadUrl, {
      method: "PUT",
      body: binaryData!,
    }).catch((e) => {
      throw new Error("Failed to upload image");
    });
  }
};
