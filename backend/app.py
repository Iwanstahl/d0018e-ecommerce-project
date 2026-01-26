import time
from flask import Flask

app = Flask(__name__)

# It's good practice to prefix your routes with /api 
# so they don't clash with your React routes later.
@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

if __name__ == '__main__':
    app.run(debug=True, port=5000)