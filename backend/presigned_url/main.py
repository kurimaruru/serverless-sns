import json
import logging

from db.utils import query
from utils.s3_client import get_s3_client

# 署名付きURLの期限（30分×60秒）
URL_EXPIRE_TIME = 30 * 60


def handler(event, context):
    """
    署名付きURLの発行ラムダ.
    """

    try:
        path = event["path"]
        payload = json.loads(event["body"])
        print(payload)
        if path == "/api/download_url":
            print("download_url")
        elif path == "/api/upload_url":
            print("presigned_url")
        else:
            raise Exception("Invalid path")

        # TODO: presigned_urlの生成
        status_code = 200
        result = {"message": "success"}

    except Exception as e:
        logging.exception(e)
        status_code = 500
        result = {"message": "InternalServerError"}

    finally:
        return {
            "isBase64Encoded": False,
            "statusCode": status_code,
            "headers": {},
            "body": json.dumps(result),
        }


def generate_download_url(bucket: str, png_path: str, page_index: int) -> dict:
    """ダウンロード用署名付きURLを発行."""
    try:
        url = get_s3_client().generate_presigned_url(
            ClientMethod="get_object",
            Params={
                "Bucket": bucket,
                "Key": png_path,
            },
            ExpiresIn=URL_EXPIRE_TIME,
        )
        state = "DONE"

    except:
        url = ""
        state = "ERROR"

    finally:
        return {"presignedUrl": url, "state": state, "pageIndex": page_index}
