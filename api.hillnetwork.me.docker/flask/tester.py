import requests

HOST="192.168.2.37"
PORT="8080"
PATH="/test"
url = "http://" + HOST + ":" +  PORT + PATH

def authenticate( session ):
    auth_url = "http://" + HOST + ":" +  PORT + "/auth/login"
    return s.post( auth_url, json={"username" : "admin","password" : "SecureApp1!" } ).json()["logged_in"]

# create session
s = requests.session()
success = authenticate( s )

# get/post
test_get = s.get( url )
test_post = s.post( url )

print "GET " + PATH + " status code: ", test_get.status_code
print test_get.text
print "POST " + PATH + " status code: ", test_post.status_code
print test_post.text
