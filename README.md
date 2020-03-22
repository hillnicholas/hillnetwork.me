*I've depracated my website due to lack of time to maintain it. I would rather have no website than an outdated one.*
# my-webstack

This repository will contain everything I run publicly over http(s)\*.

Previously, I tried running everything as virtualhosts under a single docker container. It ended up being much simpler to just run a single public-facing nginx container and reverse proxy everything to separate containers. That way, each website can be updated individually. 


## The Containers

Each container has a different purpose. These are the containers currently running in this configuration:
* [The reverse proxy](#the-reverse-proxy)
* [The main website](#the-main-website)
* [The documentation website](#the-documentation-website)
* [The flask engine](#the-flask-engine)


### The reverse proxy
This is the only publicly facing container. This made dealing with SSL significantly easier. This allowed the containers in the test/deveopment environments to be easily pushed up and intershanged with the production server. 

### The main website
This is my main website, written with React JS. It can be found by navigating [here](https://hillnetwork.me/).

### The documentation website
This is a drier website, focused more on discussing my current knowledge/experience. It was written using a python framework called [mkdocs](https://github.com/mkdocs/mkdocs). All the content was written in markdown and required no coding.

### The flask engine
So far, the only feature this has is accepting REST requests for the contact page. Having a full flask API server is definitely a little heavy for a simple contact page, but I plan to extend it's features as time goes on. This is running on a WSGI server and also sits behind the Nginx container. 
