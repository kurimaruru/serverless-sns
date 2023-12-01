FROM public.ecr.aws/lambda/python:3.9


COPY presigned_url/requirements.txt ${LAMBDA_TASK_ROOT}/requirements.txt
RUN python3.9 -m pip install --no-cache-dir -r "${LAMBDA_TASK_ROOT}/requirements.txt" -t .

COPY presigned_url/main.py ${LAMBDA_TASK_ROOT}/main.py

COPY ./db/table.py ${LAMBDA_TASK_ROOT}/db/table.py
COPY ./db/utils.py ${LAMBDA_TASK_ROOT}/db/utils.py
COPY ./utils/s3_client.py ${LAMBDA_TASK_ROOT}/utils/s3_client.py

CMD ["main.handler"]
