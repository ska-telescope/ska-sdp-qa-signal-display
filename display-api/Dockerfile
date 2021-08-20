FROM python:3.9-slim

WORKDIR /usr/src/display-api

# dont write pyc files
ENV PYTHONDONTWRITEBYTECODE 1
# dont buffer to stdout/stderr
ENV PYTHONUNBUFFERED 1

COPY . .

# dependencies
RUN set -eux \
    && pip install --upgrade pip setuptools wheel \
    && pip install -r requirements.txt \
    && rm -rf /root/.cache/pip

# command: uvicorn app.main:app --reload --workers 1 --host 0.0.0.0 --port 8000
# uvicorn server.main:app --reload --port 8001
CMD ["uvicorn", "server.main:app", "--host", "0.0.0.0", "--port", "8002"]
