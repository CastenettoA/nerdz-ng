FROM python:3.11-alpine AS builder

WORKDIR /app

COPY requirements.txt /app

RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . /app

ENTRYPOINT [ "python3" ]
CMD ["app.py"]