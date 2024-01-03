import json
import logging

from create_tweet_handler import create_tweet_handler
from fetch_tweet_handler import fetch_tweet_handler


def handler(event, context):
    """tweet作成ラムダ."""
    handler_mapping = {
        "/api/create_tweet": create_tweet_handler,
        "/api/fetch_tweet": fetch_tweet_handler,
    }
    try:
        path = event["path"]
        payload = json.loads(event["body"])
        handler = handler_mapping[path]
        result = handler(payload)
        status_code = 200

    except Exception as e:
        logging.exception(e)
        status_code = 500
        result = {"message": "InternalServerError"}

    finally:
        return {
            "isBase64Encoded": False,
            "statusCode": status_code,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS, POST",
                "Access-Control-Allow-Headers": "Content-Type",
            },
            "body": json.dumps(result),
        }
