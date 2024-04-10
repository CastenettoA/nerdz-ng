from secret import SECRET_KEY, CLIENT_ID
ALLOWED_CLIENT_ORIGIN="https://127.0.0.1:4200"
ALLOWED_CLIENT_METHODS="GET, POST, DELETE"
API_BASE_URL="https://api.nerdz.eu/v1"
O2_TOKEN_ENPOINT_URL="https://api.nerdz.eu/v1/oauth2/token"
O2_AUTHORIZE_URL="https://api.nerdz.eu/v1/oauth2/authorize"
NOTIFICATIONS_WS_URL="https://api.nerdz.eu/v1/stream/me/notifications"
SCOPES={"scope": "base:read base:write followers:read following:read friends:read messages:read notifications:read pms:read profile_comments:read profile_messages:read profile:read projects:read project_comments:read project_messages:read"}
LOCALHOST_CERTIFICATE_EXPIRATION_UNIXTIMESTAMP="1780649373" # incorrect. the real expiration is 8 year later this unix timestamp

OAUTH_APPLICATION_CONFIG = {
    "name": "nerdz",
    "client_id": CLIENT_ID,
    "client_secret": SECRET_KEY,
    "client_kwargs": SCOPES,
    "access_token_url": O2_TOKEN_ENPOINT_URL,
    "refresh_token": O2_TOKEN_ENPOINT_URL,
    "authorize_url": O2_AUTHORIZE_URL,
    "api_base_url": API_BASE_URL+"/"
    # is possible to set token_endpoint to let authlib refresh the token upon expiration
}