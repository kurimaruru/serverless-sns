import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json([
    {
      id: "test1",
      tweetInfo: {
        user_name: "test1",
        subheader: "2022/10/1",
      },
      tweetContent: {
        message:
          "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with themussels, if you like.",
        imgName: "cat.jpg",
        imgUrl: undefined,
      },
      tweetUserAction: {
        good: 3,
        bad: 0,
      },
      userId: "test111",
    },
    {
      id: "test2",
      tweetInfo: {
        user_name: "test2",
        subheader: "2022/10/5",
      },
      tweetContent: {
        message:
          "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with themussels, if you like.",
        imgName: "cat2.jpg",
        imgUrl: undefined,
      },
      tweetUserAction: {
        good: 2,
        bad: 1,
      },
      userId: "test222",
    },
    {
      id: "test3",
      tweetInfo: {
        user_name: "test3",
        subheader: "2022/10/10",
      },
      tweetContent: {
        message:
          "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with themussels, if you like.",
        imgName: "flower.jpeg",
        imgUrl: undefined,
      },
      tweetUserAction: {
        good: 1,
        bad: 0,
      },
      userId: "test333",
    },
    {
      id: "test4",
      tweetInfo: {
        user_name: "test4",
        subheader: "2022/10/15",
      },
      tweetContent: {
        message:
          "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with themussels, if you like.",
        imgName: "flower2.jpeg",
        imgUrl: undefined,
      },
      tweetUserAction: {
        good: 0,
        bad: 2,
      },
      userId: "test444",
    },
  ]);
}
