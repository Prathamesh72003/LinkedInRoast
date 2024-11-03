import os

from dotenv import load_dotenv
load_dotenv()

API_ENDPOINT = os.getenv('API_ENDPOINT')
API_KEY = os.getenv('API_KEY')
API_ENDPOINT = 'https://nubela.co/proxycurl/api/v2/linkedin'
HEADERS = {
    "Authorization": f'Bearer {API_KEY}',
    "Content-Type": "application/json",
}

GROQ_API_KEY = os.getenv('GROQ_API_KEY')
