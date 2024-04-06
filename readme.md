# Nerdz-Ng

Nerdz-Ng is a simple social network based on the [Nerdz social network API](https://api.nerdz.eu/docs).

Angular was chosen for the front-end and Python with the Flask module for the back-end to manage token recovery with the Oauth2 protocol.

The project is divided into two folders, one for the front-end part of the application (Angular) and one for the back-end part (python proxy)

At the moment the project has not yet been released and is only available locally.

## Front end
The front-end is build with [Angular](https://angular.dev/). 
Nerdz Ng front-end best to know facts:
* [Carbon Design System](https://carbondesignsystem.com/) (abbreviation is: CDS) is the graphic and visual foundation of it. Nerdz Ng is available in black and white theme by default (thanks to CDS color tokens). The CDS Is used for theming, spacing, colors, font, grid, icons and more. It also come with the [BEM](https://getbem.com/) css metodologhy.
* The SCSS style of the Angular components is writed on the /assets/scss folder and not in the components own SCSS.
* ...

## Backend
The back-end is developed in Python with the help of the [Flask framework](https://flask.palletsprojects.com/en/3.0.x/).
Nerdz Ng back-end best to know facts:
* Act as a proxy for the [Nerdz Api](https://github.com/nerdzeu/nerdz-api) exposed on api.nerdz.ru
* Authenticate the user and get the access_token via the oauth2 protocol (update logic not working yet)
* ...

## How to start locally the project
1. clone the entire repo to your local environment
2. create trusted certificated with [mkcert](https://github.com/FiloSottile/mkcert) one for front-end (to put in path: frontend/cert) and one for bac-kend (to put in thepath: backend/cert)
3. install python and angular dependencies (to install angular dependencies launch this on the shell: "npm install" on this path: frontend/)
4. create your Nerdz application on www.nerdz.eu > settings > app (this is to get the clientId and the clientSecret key)
5. create on the backend/ folder a file named "secret.py" and put in that file your client id and your Nerdz App secret key:

    ```python
    SECRET_KEY="XXX..."
    CLIENT_ID="23"
    ```
6. launch the server with this command:

    ```cd backend; source ./bin/activate; flask --app app/app.py --debug run --cert='./cert/localhost.pem' --key='./cert/localhost-key.pem```
7. launch the client with this command:

    ```cd frontend; npm run start-ssl```

8. (eventually for speed up development) create a .bashrc alias named "nerdz" to launch the previous two command simultanely like:

    ```bash
    alias nerdz="cd nerdz-ng && fe & cd .. && be"
    alias fe="cd frontend; npm run start-ssl"
    alias be="cd backend; source ./bin/activate; flask --app app/app.py --debug run --cert='./cert/localhost.pem' --key='./cert/localhost-key.pem"
    ```

## Guidelines for contributors
1. Make sure to apply the Carbon Design System guidelines for the front-end part. For example use for colors the colors token and for spacing the spacing token. 
