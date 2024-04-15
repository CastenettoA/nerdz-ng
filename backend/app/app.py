# bearer token security concers summary: https://datatracker.ietf.org/doc/html/rfc6750#section-5.3
import logging, json
from flask import Flask, request, make_response, render_template
from authlib.integrations.flask_client import OAuth, OAuthError
from services.route import create_route_names 
from services.oauth2 import update_token 
import routes # import application routes
from services.jwt import check_jwt
from config import *

logging.basicConfig(level=logging.DEBUG) # activate debug level logs
# _logger = logging.getLogger("client") # get a logger instance
# _authlib_logger = logging.getLogger("authlib")
# _authlib_logger.addHandler(logging.StreamHandler(sys.stdout))
# _authlib_logger.setLevel(logging.DEBUG)

# enable verbose HTTP logging
import http
import requests
http.client.HTTPConnection.debuglevel = 1

# init flask app
app = Flask(__name__)
app.secret_key = SECRET_KEY

#register nerdz oauth2 client
app.oauth = OAuth(app, update_token=update_token)
app.oauth.register(**OAUTH_APPLICATION_CONFIG)
create_route_names()

# todo: use teardoun request because with if a f() raise an exception others after_request f() will not execute.
@app.errorhandler(OAuthError)
def handle_error(error):
    """generic app error handler"""
    return render_template("error.html", error=error)

@app.before_request
def before_request_handler():
    """check jwt validity on certain routes"""
    skip_endpoints = ["homepage", "login", "authorize", "logout", "notifications"] # endpoints that do not need a valid access token

    if request.endpoint in skip_endpoints or request.method == "OPTIONS":
        logging.info("bypass jwt validation")
        pass # bypass the jwt validation on OPTIONS preflight request and on defined endpoints
    else:
        access_token = check_jwt()
        unauthorized_response = make_response()

        if not access_token:
            unauthorized_response.data = json.dumps({ "status": "error", "message": "Unauthorized. Your JWT is invalid or expired."})
            return unauthorized_response, 401
        else:
            pass

@app.after_request
def add_basic_headers(response):
    """add Origin and Credentials headers to certain request"""

    response.headers["Access-Control-Allow-Credentials"] = "true"
    response.headers["Access-Control-Allow-Origin"] = ALLOWED_CLIENT_ORIGIN
    response.headers["Access-Control-Allow-Methods"] = ALLOWED_CLIENT_METHODS # post work also if not present here, why?
    response.headers["Access-Control-Allow-Headers"] = "content-type"

    html_endpoints = ["homepage"]
    if request.endpoint not in html_endpoints:
        response.headers["Content-Type"] = "application/json"

    return response


# uncomment this to serve the SPA with Flask
# app = Flask(__name__, static_folder='app', static_url_path='/app')
# @app.route('/', defaults={'path': ''})
# @app.route('/<path:path>')
# def catch_all(path):
#     return app.send_static_file("index.html")

# define application routes (see routes.py)
app.add_url_rule('/', view_func=routes.homepage)
app.add_url_rule('/homepage', view_func=routes.homepage)
app.add_url_rule('/heartbeat', view_func=routes.heartbeat)
app.add_url_rule('/login', view_func=routes.login)
app.add_url_rule('/authorize', view_func=routes.authorize)

app.add_url_rule('/v1/me', view_func=routes.me)
app.add_url_rule('/v1/me/home', view_func=routes.me_home)
app.add_url_rule('/v1/me/followers', view_func=routes.me_followers)
app.add_url_rule('/v1/me/posts', view_func=routes.me_posts, methods=["GET","POST"])
app.add_url_rule('/v1/me/posts/<int:pid>', view_func=routes.me_posts, methods=["GET","POST", "DELETE"])
app.add_url_rule('/v1/me/posts/<int:pid>/comments/<int:n>', view_func=routes.me_posts_comments)
app.add_url_rule('/v1/me/pms', view_func=routes.me_pms)

app.add_url_rule('/v1/users/<int:id>', view_func=routes.users)
app.add_url_rule('/v1/users/<int:id>/posts/<int:pid>', view_func=routes.users_post)
app.add_url_rule('/v1/users/<int:id>/posts', view_func=routes.users_posts)
app.add_url_rule('/v1/users/<int:id>/posts/<int:pid>/votes', view_func=routes.new_user_post_vote, methods=["POST"])
app.add_url_rule('/v1/users/<int:id>/posts/<int:pid>/comments', view_func=routes.users_posts_comments, methods=["GET", "POST"])
app.add_url_rule('/v1/users/<int:id>/posts/<int:pid>/comments/<int:cid>', view_func=routes.users_posts_comments, methods=["PUT","DELETE"])
app.add_url_rule('/v1/users/<int:id>/posts/<int:pid>/lurks', view_func=routes.users_posts_lurks, methods=["POST", "DELETE"])

app.add_url_rule('/v1/logout', view_func=routes.logout)
app.add_url_rule('/v1/oembed/twitter', view_func=routes.oembed_twitter)
app.add_url_rule('/notifications', view_func=routes.notifications)



