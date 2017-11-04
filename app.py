import time
from flask import Flask, render_template, flash, session
app = Flask(__name__)
app.secret_key = "super secret key"

@app.route("/")
def main():
    file = open("chat.txt", "r")
    line = file.readline();
    while line:
        flash(line)
        # time.sleep(5);
        line = file.readline()
    file.close();
    return render_template("index.html")

@app.route("/profile")
def profile():
    return "profile"

if __name__ == "__main__":
    app.run()
