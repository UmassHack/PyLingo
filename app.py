import time
from googletrans import Translator
from flask import Flask, render_template, flash, session
app = Flask(__name__)
app.secret_key = "super secret key"

@app.route("/")
def main():
    return render_template("index.html")

@app.route("/language/<language>")
def doTranslation(language):
    translator = Translator()
    file = open("chat.txt", "r")
    line = file.readline()
    finalString = ""
    language = language.lower()
    while line:
        if language == "french":
            finalString += translator.translate(line, dest='fr').text
        elif language == "spanish":
            finalString += translator.translate(line, dest='es').text
        elif language == "english":
            finalString += translator.translate(line, dest='en').text
        line = file.readline()
    file.close()
    return finalString

@app.route("/blah/<data>")
def blah(data):
    return data

@app.route("/profile")
def profile():
    return "profile"

if __name__ == "__main__":
    app.run()
