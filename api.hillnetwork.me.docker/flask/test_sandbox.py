from flask import session
from flask import request
from flask_restful import Resource 
import re
import json
import hashlib
import config
import resource_types


# creating 
class Tester(resource_types.Authenticated):

    def __init__(self):
        pass

    def get_authenticated( self ):
        return { "debug_username" : session.get("username", False) }

    def post_authenticated( self ):
        return { "debug_username" : session.get("username", False) }


