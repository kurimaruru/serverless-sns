import { tweetsData } from "../type/types";
import { apiClient } from "../utils/baseApi";

export const useFetchTweetsData = () => {
  const fetchTweetsData = async (): Promise<tweetsData> => {
    const tweetsData = await apiClient("/api/fetch_tweet", "POST", "no-store");

    return tweetsData;
  };

  return { fetchTweetsData };
};
