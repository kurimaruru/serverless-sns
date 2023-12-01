import { NextResponse } from "next/server";

export function POST() {
  return NextResponse.json([
    {
      id: "test1",
      tweetInfo: {
        userName: "test1",
        createdAt: "2022/10/1",
      },
      tweetContent: {
        message:
          "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with themussels, if you like.",
        imgName: "cat.jpg",
        imgUrl: "https://news.walkerplus.com/article/1023800/10210444_615.jpg",
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
        userName: "test2",
        createdAt: "2022/10/5",
      },
      tweetContent: {
        message:
          "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with themussels, if you like.",
        imgName: "cat2.jpg",
        imgUrl:
          "https://dol.ismcdn.jp/mwimgs/5/d/600/img_7e0b8adba77c91687a8078920dedc7be160077.jpg",
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
        userName: "test3",
        createdAt: "2022/10/10",
      },
      tweetContent: {
        message:
          "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with themussels, if you like.",
        imgName: "flower.jpeg",
        imgUrl:
          "https://user0514.cdnw.net/shared/img/thumb/AMENEKO8474_TP_V.jpg",
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
        userName: "test4",
        createdAt: "2022/10/15",
      },
      tweetContent: {
        message:
          "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with themussels, if you like.",
        imgName: "flower2.jpeg",
        imgUrl:
          "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg",
      },
      tweetUserAction: {
        good: 0,
        bad: 2,
      },
      userId: "test444",
    },
  ]);
}
