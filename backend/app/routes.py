import json, jwt, requests
import logging
from flask import current_app, make_response, redirect, render_template, session, request, jsonify, url_for
from services.route import app_routes
from services.jwt import create_jwt, check_jwt, get_access_token
# from services.notifications import wsconnect
from models import AuthorizeToken
from datetime import datetime
import imp
app_config = imp.load_source("app_config", "/app_config")
app_secret = imp.load_source("app_secret", "/run/secrets/app_secret")

def login():
    logging.info(app_secret.SECRET_KEY)
    """init grant flow: (1) redirect usr to authorize_url (2) user get autenticated
     (3) server redirect to redirect_url with auth_code (..4) client request the access token send
     the autorization code to the server"""
    redirect_uri = url_for("authorize", _external=True)
    return current_app.oauth.nerdz.authorize_redirect(redirect_uri) # redirect user to authorization server and get the auth. code

def authorize():
    """retrive the access_token from nerdz server and send a jwt cookie to client with the token"""
    res = current_app.oauth.nerdz.authorize_access_token() # get access & refresh_token from authorization server
    res = AuthorizeToken(**res) # unpackaging res attribute with a data class
    client_jwt = create_jwt(res)

    response = make_response(redirect(f"https://127.0.0.1:4200/?login=yes"))
    response.set_cookie("client_jwt", client_jwt, None, None, "/", "127.0.0.1", True, True) # attach to response an Secure Http Only Cookie
    response.set_cookie("jwt_expires_at", str(res.expires_at), None, None, "/", "127.0.0.1") # for debug
    response.set_cookie("jwt_expires_at_timestamp", str(datetime.fromtimestamp(res.expires_at)), None, None, "/", "127.0.0.1") # for debug

    # return access_token to Angular app. There are other way to do it?
    return response

def logout():
     """logout the user from the server deleting the jwt token cookie"""
     response = jsonify({ "status": "success"})
     response.set_cookie("client_jwt", "", 0, "Wed, 09 Jun 2021 10:18:14 GMT", "/", "127.0.0.1", True, True)
     response.set_cookie("jwt_expires_at", "", 0, "Wed, 09 Jun 2021 10:18:14 GMT", "/", "127.0.0.1") # for debug
     response.set_cookie("jwt_expires_at_timestamp", "", 0, "Wed, 09 Jun 2021 10:18:14 GMT", "/", "127.0.0.1") # for debug
     return response

def homepage():
    return render_template("home.html", routes=app_routes)

def heartbeat():
    return jsonify({"status":"healthy"})

def me():
    """return info about the current logged-in user"""
    access_token = get_access_token()
    resp = make_response()
    req = requests.get(f"{app_config.API_BASE_URL}/me?access_token={access_token}")
    resp.data = json.dumps(json.loads(req.text))
    return resp, 200

def me_home():
    """Shows the homepage of the current user, mixing projects and users posts"""
    access_token = get_access_token()
    resp = make_response()

    req = requests.get(f"{app_config.API_BASE_URL}/me/home?access_token={access_token}")
    resp.data = json.dumps(json.loads(req.text))
    return resp, 200

def me_followers():
    """Shows the followers information for the specified user"""
    access_token = get_access_token()
    resp = make_response()
    req = requests.get(f"{app_config.API_BASE_URL}/me/followers?access_token={access_token}")
    resp.data = json.dumps(json.loads(req.text))
    return resp, 200

def me_following():
    """Shows the following information for the specified user"""
    access_token = get_access_token()

    req = requests.get(f"{app_config.API_BASE_URL}/me/following/users?access_token={access_token}")
    return req.text, 200

def me_posts(pid=None):
    """
    [GET] Get a specified post with pid me/posts/{pid}
    [POST] Creates a new post on the specified user board
    [DELETE] delete the users post"""

    access_token = get_access_token()
    resp = make_response()

    # # if request.method == "GET" and pid is None:
    # req = requests.get(f"{app_config.API_BASE_URL}/me/home?access_token={access_token}&older=18522")
    # # req = requests.get(f"{app_config.API_BASE_URL}/me/posts&access_token={access_token}&language=it&n=2&older=125291")
    # logging.warning("-----------")
    # logging.warning("-----------")
    # logging.warning("-----------")
    # logging.warning(req)
    # logging.warning("-----------")
    # logging.warning("-----------")
    # logging.warning("-----------")

    # resp.data = json.dumps(json.loads(req.text))

    if request.method == "GET" and pid:
        req = requests.get(f"{app_config.API_BASE_URL}/me/posts/{pid}?access_token={access_token}")
        resp.data = json.dumps(json.loads(req.text))

    elif request.method == "POST":
        data = request.json
        msg = data.get("message")
        req = requests.post(f"{app_config.API_BASE_URL}/me/posts?access_token={access_token}", json={ "message": msg })
        resp.data = json.dumps(json.loads(req.text))
    elif request.method == "DELETE" and pid:
        req = requests.delete(f"{app_config.API_BASE_URL}/me/posts/{pid}?access_token={access_token}")
        resp.data = json.dumps(json.loads(req.text))

    return resp, 200

def me_posts_comments(pid, n):
    """List comments on specified post, filtered by some parameters.
        'pid' is the post id. 'n' is for limiting the comments returned"""

    access_token = get_access_token()
    # resp = make_response()

    req = requests.get(f"{app_config.API_BASE_URL}/me/posts/{pid}/comments?access_token={access_token}&n={n}")
    # resp.data = json.dumps(json.loads(req.text))
    return req.text, 200

def me_pms():
    """Shows the list of the private conversation of the current user"""
    access_token = get_access_token()
    resp = make_response()
    req = requests.get(f"{app_config.API_BASE_URL}/me/pms?access_token={access_token}")
    resp.data = json.dumps(json.loads(req.text))
    return resp, 200

def users(id):
    """Shows the basic information for the specified user"""
    access_token = get_access_token() # externalize the access_token verify logic
    resp = make_response()
    
    req = requests.get(f"{app_config.API_BASE_URL}/users/{id}?access_token={access_token}")
    resp.data = json.dumps(json.loads(req.text))
    return resp, 200

def users_post(id, pid):
    """[get] get a single user post by {pid}"""
    access_token = get_access_token()
    resp = make_response()
    req = requests.get(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}?access_token={access_token}")
    resp.data = json.dumps(json.loads(req.text))
    return resp, 200

def users_posts(id):
    """This will show the last posts on the user board by default. You can personalize the request via query string parameters"""
    access_token = get_access_token()
    resp = make_response()
    req = requests.get(f"{app_config.API_BASE_URL}/users/{id}/posts?access_token={access_token}")
    resp.data = json.dumps(json.loads(req.text))
    return resp, 200

def users_posts_comments(id, pid, cid=None):
    """
      'id' is the user id, 'pid' is the post id, cid is the comment id, 'n' is a query param for limiting the comments returned
      [GET] List comments on specified post, filtered by some parameters.
      [POST] Creates a new post comment on the specified user board
      [PUT] Update the speficied comment on the specified users post
      [DELETE] Delete the specified comment on the speficied users post"""

    access_token = get_access_token()

    match request.method:
        case "GET": # get comment request
            n = request.args.get('n')
            if n:
                req = requests.get(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}/comments?access_token={access_token}&n={n}")
            else:
                req = requests.get(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}/comments?access_token={access_token}")
        case "POST": # new comment request
            msg = request.json.get("message")
            if msg and id and pid:
                req = requests.post(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}/comments?access_token={access_token}", json={"message":msg})
            else: 
                return "some of required field is/are not present, please add it and retry. Fields: message body, user id, post id", 400
        case "PUT": # edit comment request
            msg = request.json.get("message")
            if msg and id and pid and  cid:
                req = requests.put(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}/comments/{cid}?access_token={access_token}", json={"message":msg})
            else: 
                return "some of required field is/are not present, please add it and retry. Fields: message body, user id, post id, comment id", 400
        case "DELETE":
            req = requests.delete(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}/comments/{cid}?access_token={access_token}")
        case _: # default case
            return "bad request or method not supported", 400
    return req.text, 200

def users_posts_lurks(id, pid):
    """[GET] get the lurkers list of a user post 
       [POST] Adds a new lurk on the current post
       [DELETE] deletes the lurk on the current post"""
    
    access_token = get_access_token()

    if request.method == "GET" and id and pid:
        req = requests.get(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}/lurks?access_token={access_token}")

    elif request.method == "POST" and id and pid:
        req = requests.post(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}/lurks?access_token={access_token}")

    elif request.method == "DELETE" and id and pid:
        req = requests.delete(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}/lurks?access_token={access_token}")

    else:
        return "Unsupported http method or missing parameters", 405

    return req.text, 200

def users_post_vote(id, pid):
    """[GET] get user post votes
       [POST] add or remove a post vote
       vote value:  [1, 0, -1]"""
    access_token = get_access_token()
    resp = make_response()

    if request.method == "GET":
        req = requests.get(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}/votes?access_token={access_token}")
        resp.data = json.dumps(json.loads(req.text))

    elif request.method == "POST":
        if request.method == "POST" and request.json:
            vote = request.json.get("vote")
        else: 
            vote = 0

        if not vote:
            vote = 0

        req = requests.post(f"{app_config.API_BASE_URL}/users/{id}/posts/{pid}/votes?access_token={access_token}", json={"vote": vote})
        resp.data = json.dumps(json.loads(req.text))
    return resp, 200

def oembed_twitter():
    """Returns a single Tweet, specified by either a Tweet web URL or the Tweet ID, in an oEmbed-compatible format. """
    access_token = get_access_token()
    resp = make_response()

    resourceUrl = "https://publish.twitter.com/oembed"
    url = request.args.get("url")
    theme = request.args.get("theme")

    req = requests.get(f"{resourceUrl}?url={url}&theme={theme}")
    resp.data = json.dumps(json.loads(req.text))
    return resp, 200

def notifications():
    """activate the notification web socket"""
    # asyncio.run(wsconnect())
    resp = make_response("launching notification web socket")
    return resp, 200