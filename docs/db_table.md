# DB のテーブル設計

## tweet テーブル

| 属性          | 項目            | 説明                                          |
| ------------- | --------------- | --------------------------------------------- |
| Partition key | user_id         | user_id は google 認証の gmail アドレスを利用 |
| sort key      | id              | ツイートの ID で uuid を利用                  |
|               | tweetInfo       | ツイートの作成者、作成日時を持つ項目          |
|               | tweetContent    | ツイートのメッセージや画像の URL              |
|               | tweetUserAction | ツイート良いねなどのユーザーアクション        |
