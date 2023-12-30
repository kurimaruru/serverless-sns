from db.utils import query


def fetch_tweet_handler(payload: dict):
    """tweet取得ラムダ."""
    user_ids = payload["userIds"]

    tweets = []
    for user_id in user_ids:
        tweet = query(table_name="Tweets", key_dict={"user_id": user_id})
        tweets.append(tweet)

    return {"tweets": tweets}
