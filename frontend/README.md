# Installation
For installation tutorial see the readme.md on the parent folder.

# General Infos
This is a web application written in Angular (see package.json to know the Angular version).
For the visual design was choosen the CDS (IMB carbon design system).

# Icons
Nerdz Ng use the [cds icons library](https://carbondesignsystem.com/elements/icons/library/). 
Normally you can use a icon in a component like this:

1. After searching the icon on the cds icon library import your icon on the component:
    ```typescript
    import ArrowRight20 from '@carbon/icons/es/arrow--right/20';
    @Component({
    imports [IconModule],
    ...
    constructor(protected iconService: IconService) { } 
    ngOnInit() {
        this.iconService.registerAll([ArrowRight20])```

2. use in the template:
    ```html
    <svg class="cds--btn__icon .cds-icon--theme" cdsIcon="arrow--right" size="20"></svg>```

Note that if the icon needs to react to theme color change you need to add this css class to the <svg> element: `.cds-icon--theme`.
