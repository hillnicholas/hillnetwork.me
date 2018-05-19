#!/usr/bin/env python 

from flask import Flask
application = Flask(__name__)

@application.route("/")
def hello():
    return "<h1 style='color:blue'>Hello There!</h1>"

@application.route("/test")
def testing():
    return '{"test" : "this is a test"}'


@application.route("/cgi-bin/")
def cgi_handler():
    return "abasdfasdfasdfASDfsdfS"

if __name__ == "__main__":
    application.run(host='0.0.0.0')

