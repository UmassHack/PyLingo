import time
from googletrans import Translator
from flask import Flask, render_template, flash, session
app = Flask(__name__)
app.secret_key = "super secret key"

@app.route("/")
def main():
    translator = Translator()
    file = open("chat.txt", "r")
    line = file.readline();
    while line:
        flash(translator.translate(line, dest='fr').text)
        # time.sleep(5);
        line = file.readline()
    file.close();
    return render_template("index.html")

@app.route("/profile")
def profile():
    return "profile"

if __name__ == "__main__":
    app.run()
