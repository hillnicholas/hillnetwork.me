#!/usr/bin/env python

from flask import Flask
from flask_restful import Resource, Api

application = Flask(__name__)
api = Api( application )


class Public(Resource)


class Test(Public):
    def get(self):
	return {"test" : "get" }
    def post(self):
	return {"test" : "post" }


class ContactSubmit(Public):
    def post(self):
        return {'testing': 'testing'}



# no authentication needed for these 
api.add_resource( Test, '/test')
api.add_resource( ContactSubmit , '/contact/submit')




if __name__ == '__main__':
    application.run(debug=True)
