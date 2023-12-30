FROM public.ecr.aws/lambda/python:3.9

COPY tweet/requirements.txt ${LAMBDA_TASK_ROOT}/requirements.txt
RUN python3.9 -m pip install --no-cache-dir -r "${LAMBDA_TASK_ROOT}/requirements.txt" -t .

COPY tweet/main.py ${LAMBDA_TASK_ROOT}/main.py
COPY tweet/create_tweet_handler.py ${LAMBDA_TASK_ROOT}/create_tweet_handler.py
COPY tweet/fetch_tweet_handler.py ${LAMBDA_TASK_ROOT}/fetch_tweet_handler.py

COPY ./db/table.py ${LAMBDA_TASK_ROOT}/db/table.py
COPY ./db/utils.py ${LAMBDA_TASK_ROOT}/db/utils.py

CMD ["main.handler"]
