import logging
from flask import Flask
app = Flask(__name__)

logging.info('DEMO LOGGING 111!')


@app.route('/')
def hello():
    return "Hello World!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=True)