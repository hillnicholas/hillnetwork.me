#!/usr/bin/env python
from flask import Flask 
from flask import request
from flask_restful import Resource, Api
import requests
import json

import config
import contact_resources
import authentication
import test_sandbox
import blog


application = Flask(__name__)

application.secret_key = json.load( open(config.KEY_FILE) )["flask_secret_key"]

@application.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response 





api = Api( application )

api.add_resource( authentication.Authenticator, '/auth/login' )

api.add_resource( blog.AdminBlog , '/admin/blog')
api.add_resource( blog.Blog , '/blog')

api.add_resource( contact_resources.ContactSubmit , '/contact/submit')

# test. remove before pushing to production
api.add_resource( test_sandbox.Tester , '/test')
 

if __name__ == '__main__':
    application.run(port="8080", host="0.0.0.0")

