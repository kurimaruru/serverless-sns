import { useRecoilState } from "recoil";
import { tweetsDataSelector } from "../store/tweet";
import { tweetsData } from "../type/types";

export const useFetchTweetsData = () => {
  const [tweetsData, setTweetsData] = useRecoilState(tweetsDataSelector);
  const fetchTweetsData = async (): Promise<void> => {
    let res = null;
    if (process.env.NEXT_PUBLIC__ENV === "local") {
      res = await fetch("http://localhost:3000/api/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const test = await fetch("http://127.0.0.1:3000/hello", {
        mode: "no-cors",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("★★★★★★sam local api★★★★★★", test);
    } else {
      // 本番APIをたたく
      res = await fetch("http://localhost:3001/api/home", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const tweetsData: tweetsData = await res.json();
    setTweetsData(tweetsData);
  };

  return { fetchTweetsData, tweetsData };
};
