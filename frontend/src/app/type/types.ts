export type tweetsData = { tweets: tweetData[] };

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
};

export type userAction = {
  good: string;
  comments: string[];
};

export type ValidSession = {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string;
  appAccessToken: string;
};
