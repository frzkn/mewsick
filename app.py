from telethon import TelegramClient
import os
from dotenv import load_dotenv
from flask import Flask

load_dotenv()
app = Flask(__name__)

api_id = os.environ.get("API_ID")
api_hash = os.environ.get("API_HASH")
# bot_token = os.environ.get("BOT_TOKEN")

with TelegramClient('mewsick', api_id, api_hash) as client:
    client.loop.run_until_complete(client.send_message('me', 'Hello, myself!'))


@app.route('/')
def hello():
    return "Hello World!"


if __name__ == '__main__':
    app.run()
