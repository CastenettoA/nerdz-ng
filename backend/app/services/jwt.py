import logging
import jwt
from flask import request, current_app
from authlib.integrations.flask_client import token_update
from datetime import datetime
from models import AuthorizeToken

import imp
app_config = imp.load_source("app_config", "/app_config")
app_secret = imp.load_source("app_secret", "/run/secrets/app_secret")

def get_decoded_client_jwt():
     "return the decoded client JWT"
     # todo: if a user, browser, ecc delete the cookie this will go in error.
     # need to implement the redirect to /login and after the redirect to what the user will bee doing before.
     try:
          _jwt = request.cookies.get("client_jwt")
          decoded_jwt = jwt.decode(_jwt, app_secret.SECRET_KEY, algorithms=["HS256"])
     except Exception as e: 
          print(e)
     # except jwt.InvalidTokenError:
     #      logging.info(f"InvalidTokenError")
     # except jwt.PyJWTError as e:
     #      logging.info(f"PyJWTError: {e}")
     finally: return decoded_jwt

def get_access_token(decoded_jwt=None):
     "return the client JWT access token"
     if not decoded_jwt:
          decoded_jwt = get_decoded_client_jwt()
     return decoded_jwt["access_token"]

def check_jwt()->str|None:
     """Check client JTW validity and expiration
        [token refresh] the access_token refresh logic is handled by the on_token_udate() via token update signal
        """

     jwt_exceptions = [
          jwt.InvalidTokenError,
          jwt.DecodeError,
          jwt.InvalidSignatureError,
          jwt.ExpiredSignatureError,
          jwt.InvalidAudienceError,
          jwt.InvalidIssuerError,
          jwt.InvalidIssuedAtError,
          jwt.ImmatureSignatureError,
          jwt.InvalidKeyError,
          jwt.InvalidAlgorithmError,
          jwt.MissingRequiredClaimError,
     ] 
   
     # check the client jwt
     decoded_jwt = None
     try:
          decoded_jwt = get_decoded_client_jwt()
          decoded_jwt = check_jwt_expiration(decoded_jwt)
     except Exception as e: print(e)
     finally:
          if decoded_jwt:
               # I return back the access token or the void string to the route
               return decoded_jwt["access_token"]
          else:
               return None

def check_jwt_expiration(decoded_jwt):
     "check the jwt expiration, so return the new token or the old one"
     print("entering check_jwt_expiration...")

     expires_at = float(decoded_jwt["expires_at"]) # unix timestamp
     now = datetime.timestamp(datetime.now()) # get the actual time in unix timestamp
     missing_second = expires_at - now # due time in second to the expiration of the access token

     if missing_second > 59.0: # check if there are at least 59 seconds
          print(f"il jwt è ancora valido. Sade in {missing_second}s, cioè nel {datetime.fromtimestamp(expires_at)}")
          return decoded_jwt
     else:
          print(f"il jwt è scaduto o in prossima scadenza, rinnovo necessario. Expires_at is: {datetime.fromtimestamp(expires_at)}")
          refresh_access_token(decoded_jwt)
          pass
          
def refresh_access_token(decoded_jwt):
     """refresh the access token and return it"""
     try:
          # request from nerdz a new access token
          t = decoded_jwt["refresh_token"]
          res = current_app.oauth.nerdz.fetch_access_token(refresh_token=t, grant_type="refresh_token")
          res = AuthorizeToken(**res)
          decoded_jwt = create_jwt(res)
          return create_jwt(res)
     except Exception as e: 
          print(f"errore nel refresh dell'access_token: {e}\n\n")
          return None

def create_jwt(res):
     "create a JWT from nerdz json response"
     payload = {
          "access_token": res.access_token,
          "refresh_token": res.refresh_token,
          "expires_at": res.expires_at,
          "scope": res.scope
     }
     encoded_jwt = jwt.encode(payload, app_secret.SECRET_KEY, algorithm="HS256")
     return encoded_jwt