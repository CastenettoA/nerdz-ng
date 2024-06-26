# Nerdz Ng developer guidelines

### General
1. Follow your best programming standard
2. Be sure to follow the pattern that you see on this repository, do not reinvent the well and where possibile try to improve things.
3. Check the **[Nerdz Ng Todo List](https://explosivelab.notion.site/Pianificazione-Nerdz-Ng-pubblico-1bc826ecc0994dd8915be97fc3489cde?pvs=74)** and try to use as reference to know what to do.
4. In the "Nerdz Ng Todo List", if you are assign to you a task, **write your name on the task** so other contributors can know that and avoid to work on the same feature.

### Front-end
1. Generally make sure to apply the IBM Carbon Design System guidelines for the front-end part. For example use for colors the colors token and for spacing the spacing token. This is important because the black-and-white theme is based directly on this tokens.
2. Do not write SCSS directly on the component files but write them in the `frontend/src/scss/` folder. Where possible create reusable pieces of SCSS writing a mixin inside the `mixins.scss` file.
3. Generally do not write CSS directly on the template but use the SCSS files.
4. For CSS class names you should use the BEM methodology.


### Back-end
1. Feel free to follow your best patterns and the coding style you find on the `/backend` folder
