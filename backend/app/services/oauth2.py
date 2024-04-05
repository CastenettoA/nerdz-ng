from authlib.oauth2.rfc6749 import OAuth2Token

def update_token(name, token, refresh_token=None, access_token=None):
    try:
        "Authlib will auto update the access token if it is expired when passing  a update_token function to OAuth registry."
        if refresh_token:
            item = OAuth2Token.find(name=name, refresh_token=refresh_token)
        elif access_token:
            item = OAuth2Token.find(name=name, access_token=access_token)
        else:
            return

        # update old token
        item.access_token = token['access_token']
        item.refresh_token = token.get('refresh_token')
        item.expires_at = token['expires_at']
        item.save()
    except Exception as e:
        print(e)
    finally:
        print("just update the token with update_token()\n")
