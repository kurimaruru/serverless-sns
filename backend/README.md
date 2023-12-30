# backend

## 事前準備

- python をインストールしておくこと
- poetry のインストール
  - https://python-poetry.org/docs/
- poetry init

  ```bash
  $ cd backend
  $ poetry init


  poetry export -f requirements.txt --output requirements.txt
  ```

## Docker 環境構築手順

- ビルドと立ち上げ

```bash
$ docker compose build
$ docker compose up -d
```

## テーブル作成

```bash
# awsのssoログインを済ませておくこと
$ cd backend
$ poetry run python3 scripts/create_table.py
```

-

```bash
# networkの生成
$ docker network create dynamodb-local-network
$ docker network create minio-local-network
```

## lambda のローカル実行

```bash
$ sam build
$ sam local invoke HelloWorldFunction --event events/event.json
# upload
$ sam local invoke GeneratePresignedUrlFunction --event events/presigned_url/event.json  --docker-network minio-network
# download
sam local invoke GeneratePresignedUrlFunction --event events/download_url/event.json  --docker-network minio-network
# create tweet
sam local invoke TweetActionFunction --event events/create_tweet/event.json  --docker-network dynamodb-network
# fetch_tweet
sam local invoke TweetActionFunction --event events/fetch_tweets/event.json  --docker-network dynamodb-network
```

### aws sso の設定

https://qiita.com/sakai00kou/items/086a12caa69a78c18f61
