import { tweetsData } from "../type/types";

export const useFetchTweetsData = () => {
  const fetchTweetsData = async (): Promise<tweetsData> => {
    let res = null;
    if (process.env.NEXT_PUBLIC__ENV === "local") {
      res = await fetch("http://localhost:3000/api/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
      });
    } else {
      // TODO:本番APIをたたく
      res = await fetch("http://localhost:3001/api/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const tweetsData: tweetsData = await res.json();
    return tweetsData;
  };

  return { fetchTweetsData };
};
