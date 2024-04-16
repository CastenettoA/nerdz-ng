# Backend Readme

## Installation
For installation advice see the readme.md on the parent folder.

## General Infos
This is a server proxy written in Python with the help of the Flask framework. 
The key responsibility of this proxy are:
1. autorize the client application with the Oauth2 Flow
2. expose some of nerdz.eu api to the frontend

At the moment the apis are all stateless. Every front-end request need to pass a valid access_token via an http only cookie.

## Deploy (not stable jet)
With the command `gclod run deploy` on the /backend folder we utilize the Cloud Run deployment from source code to delegate the Cloud Run the creation of Docker Image and serving it. 

The alternative is use this two commands: `gcloud builds submit' and `gcloud run deploy`.