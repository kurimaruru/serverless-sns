import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { tweetData } from "../type/types";

/** tweet生成するためのhooks */
export const useCreateTweet = () => {
  const router = useRouter();
  const [binaryForImgData, setBinay] = useState<
    string | ArrayBuffer | null | undefined
  >(null);
  const [image, setImage] = useState<Blob | undefined>();

  /** tweet生成のapi */
  const handleSubmitAction: SubmitHandler<tweetData> = async (
    tweet: tweetData
  ): Promise<void> => {
    const uploadUrl = await getUploadUrl("testUserId", "hogehogehoge");
    putTweetImageToStorage(uploadUrl, image as Blob);
    const tweetReqData = createTweetRequestData(tweet);
    try {
      const res = await fetch("http://localhost:3000/api/tweet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tweetReqData),
      });
      if (res.status !== 200) throw new Error("Failed to tweet");
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

const createTweetRequestData = (tweet: tweetData): tweetData => {
  const requestData = {
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
  return requestData;
};

const getUploadUrl = async (
  userId: string,
  tweetId: string
): Promise<string> => {
  const res = await fetch("http://localhost:3000/api/getUploadUrl", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, tweetId }),
  });
  const data = await res.json();
  return data.presignedUrl;
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
    const res = await fetch(uploadUrl, {
      method: "PUT",
      body: image!,
    });
  }
};
