# Installation
For installation see the readme.md on the parent folder.

# General Infos
This is a server proxy written in Python and the Flask framework and the key task are:
1. autorize the client application with the Oauth2 Flow
2. expose some of nerdz.eu api to the frontend

At the moment the api is stateless. Every request need to pass an access token via an http only cookie.