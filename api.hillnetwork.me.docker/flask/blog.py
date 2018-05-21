#!/usr/bin/env python
from flask import Flask, request
from flask import request
from flask_restful import Resource, Api
import requests
import json

import resource_types
import database

# More of a data structure representing what a blog post contains. 
# assumes input is validated.
class BlogPost:

    def __init__( self, title=False, content=False, datetime=False ):
        self._title = title
        self._content = content
        self._datetime = datetime


    def set_title( self, title ):
        self._title = title
        
    def get_title( self ):
        return self._title

    def set_content( self, content ):
        self._content = content

    def add_attachment( self, file_object ):
        return 

    def get_datetime( self ):
        return self._datetime

    def get_content( self ):
        return self._content

    # returns if this object has the required parameters
    def verify( self ):
        return type(self._title) == type(str()) and \
                type(self._content) == type(str())

    def json( self ):
        return json.dumps({ 
                            "title" : self._title,
                            "content" : self._content
                        })
 


# define the API resources
class AdminBlog( resource_types.Authenticated ):


    def __init__( self ):
        super( resource_types.Authenticated, self ).__init__()
        self.hndb = database.HillnetworkDatabase()



    def post_authenticated( self ):
        params = request.get_json()
        if not params: 
            return self._failed(message="No data was sent with this request.")

        title = params.get("title", None )
        content = params.get("content", None )

        # make sure there is a title and content
        if not title or not content:
            return self._failed( message="invalid parameters") 

        if type( title ) not in  [type(u''), type(str()) ] or \
            type( content ) not in [ type( u''), type( str()) ]:
            return self._failed(message="Bad type(s) for title and/or content")

        blogpost = BlogPost( title=str(title), content=str(content) )
        #print self.hndb.post_content( blogpost )
        return self._success() if self.hndb.post_content( blogpost ) else self._failed( message="There was an error submitting this post.")



    def _success( self ):
        return { "success" : True }



    def _failed( self, message=None ):
        response = { "success" : False }
        if message:
            response["message"] = message
        return response





# define the API resources
class Blog( resource_types.Public ):


    def __init__( self ):
        super( resource_types.Authenticated, self ).__init__()
        self.hndb = database.HillnetworkDatabase()



    # by default, this will retrieve 
    def get( self ):
        params = request.get_json()
        if not params: 
            return self._failed(message="No data was sent with this request.")

        start_time = params.get("start_time", None )
        end_time = params.get("end_time", None )

        # if both parameters are specified, use them. Otherwise, just return the most 
        # recent posts.
        if start_time and end_time and type(start_time) == type(int()) and \
         type(end_time) == type( int() ):
            results = self.hndb.fetch_content( start_time, end_time )
        else:
            results = self.hndb.fetch_most_recent( 5 )

        return list( blogpost.json() for blogpost in results )