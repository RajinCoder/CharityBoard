
from supabase import create_client, Client
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# Handles all the supabase calling in one place in order to alleviate calls to the database

supabase_url = os.getenv('SUPABASE_PROJECT_URL')
supabase_key = os.getenv('SUPABASE_ANON_KEY')
supabase: Client = create_client(supabase_url, supabase_key)

@app.route('/')
def home():
    return "Hello, this is your Flask backend!"

@app.route('/get-listings', methods=['GET'])
def get_listings():
    data = supabase.table("ListingTable").select("*").execute()
    return jsonify(data.data), 200


if __name__ == '__main__':
    app.run(debug=True)
