# bearer token security concers summary: https://datatracker.ietf.org/doc/html/rfc6750#section-5.3
import logging, json
from flask import Flask, request, make_response, render_template
from authlib.integrations.flask_client import OAuth, OAuthError
from services.route import create_route_names 
from services.oauth2 import update_token 
import routes # import application routes
from services.jwt import check_jwt
import imp
app_config = imp.load_source("app_config", "/app_config")
app_secret = imp.load_source("app_secret", "/run/secrets/app_secret")
logging.info(app_config.ALLOWED_CLIENT_ORIGIN)
logging.basicConfig(level=logging.DEBUG) # activate debug level logs
# _logger = logging.getLogger("client") # get a logger instance
# _authlib_logger = logging.getLogger("authlib")
# _authlib_logger.addHandler(logging.StreamHandler(sys.stdout))
# _authlib_logger.setLevel(logging.DEBUG)

# enable verbose HTTP logging
import http
http.client.HTTPConnection.debuglevel = 1


# init flask app
app = Flask(__name__)
app.secret_key = app_secret.SECRET_KEY

#register nerdz oauth2 client
app.oauth = OAuth(app, update_token=update_token)
app.oauth.register(
    'nerdz',
    client_id =    app_secret.CLIENT_ID,
    client_secret =    app_secret.SECRET_KEY,
    client_kwargs = app_config.SCOPES,
    access_token_url = app_config.O2_TOKEN_ENPOINT_URL,
    refresh_token = app_config.O2_TOKEN_ENPOINT_URL,
    authorize_url = app_config.O2_TOKEN_ENPOINT_URL,
    api_base_url = app_config.O2_TOKEN_ENPOINT_URL+'/',
)

create_route_names()

# todo: use teardoun request because with if a f() raise an exception others after_request f() will not execute.
@app.errorhandler(OAuthError)
def handle_error(error):
    """generic app error handler"""
    return render_template("error.html", error=error)

@app.before_request
def before_request_handler():
    """check jwt validity on certain routes"""
    skip_endpoints = ["heartbeat","homepage", "login", "authorize", "logout", "notifications"] # endpoints that do not need a valid access token

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
    response.headers["Access-Control-Allow-Origin"] = app_config.ALLOWED_CLIENT_ORIGIN
    response.headers["Access-Control-Allow-Methods"] = app_config.ALLOWED_CLIENT_METHODS # post work also if not present here, why?
    response.headers["Access-Control-Allow-Headers"] = "content-type"

    html_endpoints = ["homepage"]
    if request.endpoint not in html_endpoints:
        response.headers["Content-Type"] = "application/json"

    return response

# define application routes (see routes.py)
app.add_url_rule('/', view_func=routes.homepage)
app.add_url_rule('/homepage', view_func=routes.homepage)
app.add_url_rule('/heartbeat', view_func=routes.heartbeat)
app.add_url_rule('/login', view_func=routes.login)
app.add_url_rule('/authorize', view_func=routes.authorize)

app.add_url_rule('/v1/me', view_func=routes.me) 
app.add_url_rule('/v1/me/home', view_func=routes.me_home)
app.add_url_rule('/v1/me/followers', view_func=routes.me_followers)
app.add_url_rule('/v1/me/following/users', view_func=routes.me_following)
app.add_url_rule('/v1/me/posts', view_func=routes.me_posts, methods=["GET","POST"])
app.add_url_rule('/v1/me/posts/<int:pid>', view_func=routes.me_posts, methods=["GET","POST", "DELETE"])
app.add_url_rule('/v1/me/posts/<int:pid>/comments/<int:n>', view_func=routes.me_posts_comments)
app.add_url_rule('/v1/me/posts/<int:pid>/comments/<int:n>', view_func=routes.me_posts_comments)
app.add_url_rule('/v1/me/pms', view_func=routes.me_pms)

app.add_url_rule('/v1/users/<int:id>', view_func=routes.users)
app.add_url_rule('/v1/users/<int:id>/posts/<int:pid>', view_func=routes.users_post)
app.add_url_rule('/v1/users/<int:id>/posts', view_func=routes.users_posts)
app.add_url_rule('/v1/users/<int:id>/posts/<int:pid>/votes', view_func=routes.users_post_vote, methods=["GET", "POST"])
app.add_url_rule('/v1/users/<int:id>/posts/<int:pid>/comments', view_func=routes.users_posts_comments, methods=["GET", "POST"])
app.add_url_rule('/v1/users/<int:id>/posts/<int:pid>/comments/<int:cid>', view_func=routes.users_posts_comments, methods=["PUT","DELETE"])
app.add_url_rule('/v1/users/<int:id>/posts/<int:pid>/lurks', view_func=routes.users_posts_lurks, methods=["GET","POST", "DELETE"])

app.add_url_rule('/v1/logout', view_func=routes.logout)
app.add_url_rule('/v1/oembed/twitter', view_func=routes.oembed_twitter)
app.add_url_rule('/notifications', view_func=routes.notifications)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=80, debug=True, ssl_context=('./cert/localhost.pem', './cert/localhost-key.pem'))

# """HTTP traffic is handled by a Gunicorn web server
# in a Google Cloud Run container. """
# if __name__ == "__main__":
#     app.run(debug=True, host="127.0.0.0", port=int(os.environ.get("PORT", 8080)))
#     # app.run(debug=True, host="0.0.0.0", port=int(os.environ.get("PORT", 8080)))