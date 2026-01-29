import time
from flask import Flask
import mysql.connector
from config import *


class MySQLManager:
    """
    Context Manager class that handels MySQL database connections.
    """
    def __init__(self):
        self.config = db_config
        self.conn = None
    
    def __enter__(self):
        """Connects to the database and returns the connection object."""
        # This runs when you enter 'with' block
        self.conn = mysql.connector.connect(**self.config)
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        """
        Handles the closing logic.
        :param exc_type: The type of exception
        :param exc_val: The error message
        :param exc_tb: The traceback object
        """
        # This runs when you leave the 'with' block
        if self.conn:
            # if no error happens, save changes
            if exc_type is None:
                self.conn.commit()
            else:
                # Error happened, dischard changes.
                print(f"Rollback due to: {exc_val}")
                self.conn.rollback()
            self.conn.close()
        return False

app = Flask(__name__)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/api/data')
def get_data():
    try:
        with MySQLManager() as conn:
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM user")
            result = cursor.fetchall()
        return{"data": result}
    except Exception as e: 
        return {"error": str(e)}, 500