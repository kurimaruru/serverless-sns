import { tweetData } from "@/app/type/types";
import { useEffect, useState } from "react";

export const fetchTweetImagge = (tweet: tweetData) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      const res = await fetch("http://localhost:3000/api/downloadUrl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: tweet.userId,
          tweetId: tweet.id,
        }),
        cache: "no-cache",
      });
      const data = await res.json();

      setImageUrl(data.downloadUrl);
    };
    fetchImage();
  }, []);

  return { imageUrl };
};
