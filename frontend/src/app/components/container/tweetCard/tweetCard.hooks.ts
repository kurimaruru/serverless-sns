import { tweetData } from "@/app/type/types";
import { apiClient } from "@/app/utils/baseApi";
import { useEffect, useState } from "react";

export const fetchTweetImagge = (tweet: tweetData) => {
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchImage = async () => {
      const res = await apiClient(
        "/api/download_url",
        "POST",
        "force-cache",
        JSON.stringify({
          userId: tweet.userId,
          tweetId: tweet.id,
        })
      );

      setImageUrl(res.downloadUrl);
    };
    fetchImage();
  }, []);

  return { imageUrl };
};
