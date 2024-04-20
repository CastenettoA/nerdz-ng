# Nerdz-Ng

Nerdz-Ng is a simple social network based on the [Nerdz social network API](https://api.nerdz.eu/docs) developed with Angular and Python Flask.
The project is divided into two folders, one for front-end and one for back-end.

At the moment **the project has not been released yet and is only available locally**.

## Frontend
The front-end is build with [Angular](https://angular.dev/). 
Nerdz Ng front-end best to know facts:
* [Carbon Design System](https://carbondesignsystem.com/) (abbreviation is: CDS) is the graphic and visual foundation of it. Nerdz Ng is available in black and white theme by default (thanks to CDS color tokens). The CDS Is used for theming, spacing, colors, font, grid, icons and more. It also come with the [BEM](https://getbem.com/) css metodologhy.
* The SCSS style of the Angular components is writed on the /assets/scss folder and not in the components own SCSS.

## Backend
The back-end is developed in Python with the help of the [Flask framework](https://flask.palletsprojects.com/en/3.0.x/).
Nerdz Ng back-end best to know facts:
* Act as a proxy for the [Nerdz Api](https://github.com/nerdzeu/nerdz-api) exposed on api.nerdz.ru
* Authenticate the user and get the access_token via the oauth2 protocol (update logic not working yet)

## How to start locally the project
1. clone the repo locally
2. create trusted certificated with [mkcert](https://github.com/FiloSottile/mkcert) one for front-end (to put in path: `frontend/cert`) and one for bac-kend (to put in thepath: `backend/cert`)
3. install python and angular dependencies (to install angular dependencies launch this on the shell: `npm install` on this path: `frontend/`)
4. create your Nerdz application on www.nerdz.eu > settings > app (this is to get the clientId and the clientSecret key)
5. create on the `backend/` folder a file named `secret.py` and put in that file your client id and your Nerdz App secret key:

    ```python
    SECRET_KEY="XXX..."
    CLIENT_ID="23"
    ```
6. launch the server with this commands:
    ```bash
       cd backend # enter in the back-end repo
       source ./bin/activate # activate the virtual env
       flask --app app/app.py --debug run --cert='./cert/localhost.pem' --key='./cert/localhost-key.pem # launch app.py with flask
    ```
8. launch the client with this commands:
    ```bash
       cd frontend  # enter in the front-end repo
       npm run start-ssl # launch angular app in live reloading
    ```
10. (eventually for speed up your development flow) create a .bashrc alias named "nerdz" to launch the previous two command simultanely like:

    ```bash
    alias nerdz="cd nerdz-ng && fe & cd .. && be"
    alias fe="cd frontend; npm run start-ssl"
    alias be="cd backend; source ./bin/activate; flask --app app/app.py --debug run --cert='./cert/localhost.pem' --key='./cert/localhost-key.pem"
    ```

## Guidelines for contributors
Please carefully read the CONTRIBUTING.me file on this folder.
