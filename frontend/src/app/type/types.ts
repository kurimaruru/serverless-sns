export type tweetsData = tweetData[];

export type tweetData = {
  id: string;
  tweetInfo: tweetInfo;
  tweetContent: tweetContent;
  tweetUserAction: userAction;
  userId: string;
};

export type tweetInfo = {
  userName: string;
  createdAt: string;
};

export type tweetContent = {
  message: string;
  imgName: string;
  imgUrl: string;
};

export type userAction = {
  good: number;
  bad: number;
};
