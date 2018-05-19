#!/usr/bin/env python

from flask import Flask
from flask_restful import Resource, Api


import public


application = Flask(__name__)
api = Api( application )




# no authentication needed for these 
api.add_resource( public.Test, '/test')
api.add_resource( public.ContactSubmit , '/contact/submit')




if __name__ == '__main__':
    application.run(debug=True)
