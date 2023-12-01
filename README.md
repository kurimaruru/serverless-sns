# backend

## Docker 環境構築手順

```bash
# networkの生成
$ docker network create dynamodb-local-network
$ docker network create minio-local-network
```

## lambda のローカル実行

```bash
$ sam local invoke HelloWorldFunction --event events/event.json
$ sam local invoke GeneratePresignedUrlFunction --event events/presigned_url/event.json
```
