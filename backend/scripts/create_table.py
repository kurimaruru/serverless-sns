import boto3

db_client = boto3.client(
    service_name="dynamodb",
    endpoint_url="http://localhost:8000",
)

table_list = db_client.list_tables()["TableNames"]

# AnnotationsTable
if "Tweets" not in table_list:
    db_client.create_table(
        TableName="Tweets",
        KeySchema=[
            {"AttributeName": "user_id", "KeyType": "HASH"},
            {"AttributeName": "id", "KeyType": "RANGE"},
        ],
        AttributeDefinitions=[
            {"AttributeName": "user_id", "AttributeType": "S"},
            {"AttributeName": "id", "AttributeType": "S"},
        ],
        ProvisionedThroughput={"ReadCapacityUnits": 1, "WriteCapacityUnits": 1},
    )
    print("Tweetsテーブルを作成しました。")
