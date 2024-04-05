# Nerdz-Ng

Nerdz-Ng is a simple social network based on the Nerdz social network API ([link APIs](https://api.nerdz.eu/docs)).

Angular was chosen for the front-end and Python with the Flask module for the back-end to manage token recovery with the Oauth2 protocol.

The project is divided into two folders, one for the front-end part of the application (Angular) and one for the back-end part (python proxy)

At the moment the project has not yet been released and is only available locally.

## Front end
The front-end is developed using the Angular framework. Here are some main features:
* ((Carbon Design System)[https://carbondesignsystem.com/]) (aka CDS) is the graphic and visual foundation of Nerdz Ng. Thanks to this Nerdz Ng is available in black and white theme. Is used for theming, spacing, colors, font, grid, icons and more. It also come with the BEM css metodologhy.
* The style of component is write on the /assets/scss folder. Is not write in the component scss

## Backend
The back-end is developed in Python with the help of the Flask framework, these are its main functions
* act as a proxy for the api exposed on api.nerdz.ru
* authenticate the user and get the access_token via the oauth2 protocol (update logic not working yet)
* continues...

## How to start locally the project
1. clone the entire repo to your local environment
2. create trusted certificated with ([mkcert](https://github.com/FiloSottile/mkcert)) one for front-end (to put in path: frontend/cert) and one for bac-kend (to put in thepath: backend/cert)
3. install python and angular dependencies (to install angular dependencies do: "npm install" on this path: frontend/)
4. create your angular application (to get the clientId and the clientSecret key)
5. create on backend/ folder a file name <i>secret.py"</i> and put that below keys:

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