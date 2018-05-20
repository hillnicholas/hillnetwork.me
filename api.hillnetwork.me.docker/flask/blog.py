#!/usr/bin/env python
from flask import Flask
from flask import request
from flask_restful import Resource, Api
import requests
import json

import resource_types



class BlogEdit( resource_types.Authenticated ):

    def get_authenticated( self ):
        return dict()


