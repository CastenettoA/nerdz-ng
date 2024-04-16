FROM python:3.8-slim
WORKDIR /backend/app
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8080
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 app:app
