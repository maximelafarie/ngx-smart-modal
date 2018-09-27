![ngx-smart-modal-banner](src/assets/banner.jpg)

[![Join the chat at https://gitter.im/ngx-smart-modal/Lobby](https://badges.gitter.im/ngx-smart-modal/Lobby.svg)](https://gitter.im/ngx-smart-modal/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Greenkeeper badge](https://badges.greenkeeper.io/biig-io/ngx-smart-modal.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/biig-io/ngx-smart-modal.svg?branch=master)](https://travis-ci.org/biig-io/ngx-smart-modal) [![npm version](https://badge.fury.io/js/ngx-smart-modal.svg)](https://badge.fury.io/js/ngx-smart-modal) [![npm downloads](https://img.shields.io/npm/dm/ngx-smart-modal.svg)](https://npmjs.org/ngx-smart-modal) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/8763afb5afe5443bb18c63f7721cd53c)](https://www.codacy.com/app/maximelafarie/ngx-smart-modal?utm_source=github.com&utm_medium=referral&utm_content=biig-io/ngx-smart-modal&utm_campaign=Badge_Coverage) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/8763afb5afe5443bb18c63f7721cd53c)](https://www.codacy.com/app/maximelafarie/ngx-smart-modal?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=biig-io/ngx-smart-modal&amp;utm_campaign=Badge_Grade)

`ngx-smart-modal` is a lightweight and very complete Angular library for managing modals inside any Angular project. It was built for modern browsers using TypeScript, HTML5 and Angular >=2.4.0.

## Demo
http://biig-io.github.io/ngx-smart-modal/


## No external library, no jQuery! 🤘
To avoid imposing you to download a CSS library by using this package, you simply have to use our built-in SCSS/CSS file with custom animations and overridable variables. So get rid of being forced to use a CSS library you don't want to! In addition, it doesn't use jQuery either!

![NgxSmartModal is the CSS frameworks's friend!](src/assets/css_frameworks.png)
> #### But... I'm using Bootstrap (or Materialize, Foundation or anything else)!
> Don't panic! We already thought about that! And because we want to be as neutral as we can, we made it very flexible for you to style it!
> So if your app uses a CSS framework that has some modal styles, you simply have to pick up its class names and set the main class in the `[customClass]="'modal'"` (e.g.: bootstrap). And the rest of the modal DOM elements has just to be set in the `ngx-smart-modal` component (e.g.: modal-dialog, modal-content, modal-header, etc.).

Check out the [documentation](https://github.com/biig-io/ngx-smart-modal#parameters--options) & [demo](https://github.com/biig-io/ngx-smart-modal) for more information and examples!

See the [changelog](https://github.com/biig-io/ngx-smart-modal/blob/master/CHANGELOG.md) for recent changes.

You can take a look on [this diagram](https://github.com/biig-io/ngx-smart-modal#how-it-works) if you are curious about how this library works.


## Features
 - Handle large quantity of modals anywhere in your app
 - Customize the style of your modals through custom CSS classes and SCSS variables!
 - No external CSS library is used so you can easily override the modals default style
 - Pass data to any modal and retrieve it very simply in the modal view (or anywhere else)
 - Events on `open`, `close`, `dismiss`, `escape` and more for each modal
 - Manage all your modal stack and data with very fast methods
 - Very smart `z-index` computation (no ugly glitches or problems with a modal inside another)
 - A modal in a modal in a modal in a modal... I guess you got it!
 - AoT compilation support


## Setup
To use `ngx-smart-modal` in your project install it via [npm](https://www.npmjs.com/package/ngx-smart-modal):
```
npm i ngx-smart-modal --save
```
or with [yarn](https://yarnpkg.com/en/package/ngx-smart-modal):
```
yarn add ngx-smart-modal
```
⚠️ If you have the following warning after install **(for NgxSmartModal <= 5.0.0)**:
```
npm WARN ngx-smart-modal@x.x.x requires a peer of web-animations-js@>=x.x.x but none was installed.
```
or
```
warning "ngx-smart-modal@x.x.x" has unmet peer dependency "web-animations-js@>=x.x.x".
```
Just run:
```
npm i web-animations-js --save
```
or
```
yarn add web-animations-js
```

**If you're using SystemJS**
```
System.config({
  map: {
    'ngx-smart-modal': 'node_modules/ngx-smart-modal/bundles/ngx-smart-modal.umd.js'
  }
});
```

Then add
`NgxSmartModalModule` (with `.forRoot()` or `.forChild()` depending if the module which you import the library into is the main module of your project or a nested module) and `NgxSmartModalService` to your project `NgModule`
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

And import `ngx-smart-modal.scss` or `ngx-smart-modal.css` in a global style file (e.g. `styles.scss` or `styles.css` in classic Angular projects or any other scss/css file it imports):
Example with **styles.scss**:
```
/* You can add global styles to this file, and also import other style files */
@import "~ngx-smart-modal/ngx-smart-modal";
@import "app/app.component";
...
```
[Demo example here](https://github.com/biig-io/ngx-smart-modal/blob/master/src/styles.scss)


## Style & customization
⚠️ **For `ngx-smart-modal` >= 6.0.0 only!**
`ngx-smart-modal` provides built-in [SCSS variables](https://sass-lang.com/guide#topic-2) that you can override easily like it (assuming you imported `ngx-smart-modal.scss` as explained above):
```
/* You can add global styles to this file, and also import other style files */
/* NgxSmartModal variables override */
$color-overlay: rgba(0, 0, 0, .7);
$dialog-position-top: 20%;

@import "~ngx-smart-modal/ngx-smart-modal";
...
```
_Note that variables needs to be overridden **before** `@import`!_

### Available SCSS variables
The below documentation will use the following pattern:
> `parameter/option name` (type) | default value | _description_

- `$color-overlay` (hex / rgb / rgba) | `rgba(0, 0, 0, .5)` ― _Modifies the modals overlay background color_

- `$dialog-position-top` (px / %) | `5%` ― _Defines the position of the modal from the top of the screen_

- `$transition-duration` (duration) | `500ms` ― _Defines the transition effect duration. **Keep in mind you also need to set the same time (in ms) in the `hideDelay` modal option (see below)**_

- `$transition-timing-function` (transition-timing-function Property) | `ease-in-out` ― _Specifies the speed curve of the transition effect ([available speed curves here](https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp))_

### Built-in effects
`ngx-smart-modal` can understand several built-in classes to open differently with a sexy effect:

To change this effect, you can use the `customClass` option (see below) but you also can define your own class names with dedicated effect and pass them to `customClass`!

 - ` `: no class. The modal will show without any transition effect
 - `.nsm-dialog-animation-fade`: default modal effect with a simple fade effect
 - `.nsm-dialog-animation-ltr `: the modal comes with a left-to-right effect
 - `.nsm-dialog-animation-rtl`: the modal comes with a right-to-left effect
 - `.nsm-dialog-animation-ttb`: the modal comes with a top-to-bottom effect
 - `.nsm-dialog-animation-btt`: the modal comes with a bottom-to-top effect
 - `.nsm-centered`: the modal is centered vertically


## Parameters / Options
`ngx-smart-modal` comes with some parameters / options in order to make it fit your needs. The following parameters / options needs to be used like this: `<ngx-smart-modal [parameter-or-option-name]="value"></ngx-smart-modal>`

The below documentation will use the following pattern:
> `parameter/option name` (type) | default value | required? ― _description_

- `closable` (boolean) | `true` ― _Show / hide the cross icon at the top right corner of the modal_

- `escapable` (boolean) | `true` ― _Enable / disable the modal for listening to the escape keypress event (if pressed and this option is set to true, it will close the current opened modal or the latest opened if you have several modals opened at the same time)_

- `dismissable` (boolean) | `true` ― _Enable / disable the modal backdrop for listening to the click event (if backdrop is clicked and this option is set to true, it will close the current opened modal or the latest opened if you have several modals opened at the same time)_

- `identifier` (string) | `undefined` | **REQUIRED** ― _The identifiant of the modal instance. Retrieve a modal easily by its identifier_

- `force` (boolean) | true ― _If true and if you declare another modal instance with the same identifier that another, the service will override it by the new you declare in the modal stack._

- `customClass` (string) | `'nsm-dialog-animation-fade'` ― _All the additionnal classes you want to add to the modal (e.g.: any bootstrap modal class). You can add several classes by giving a string with space-separated class names_

- `backdrop` (boolean) | `true` ― _Enable / disable the backdrop of a modal. **Tip**: when you want to encapsulate several modals, set this options at true for the parent modal and false for the others._

- `hideDelay` (number) | `500` ― _Opening / closing class delay **in milliseconds**. ⚠️ Only for `NgxSmartModal >= 6.0.0`!_

- `autostart` (boolean) | `false` ― _Define if the modal is showing up automatically when loaded or not._

- `target` (string) | `undefined` ― _Displays the modal relatively to the targeted element. ⚠️ Only for `NgxSmartModal >= 7.0.0`!_


## Manipulate modals
You can use it directly in your component's template like this
```
<ngx-smart-modal #myModal identifier="myModal">
  <h1>Title</h1>
  <p>Some stuff...</p>

  <button (click)="myModal.close()">Close</button>
</ngx-smart-modal>
```
At this point, the modal instance is stored in the `NgxSmartModalService`. You can do absolutely what you want with it, anywhere in your app. For example, from a component :
```
import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  ...
})
export class AppComponent {
  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }
}
```
Then in the AppComponent view you can open any modal with no need to be in the same view:
```
<button (click)="ngxSmartModalService.getModal('myModal').open()">Open myModal</button>
```

## Manipulate data
You can associate data with any created modal. To do that, simply use the `setModalData()` from the `NgxSmartModalService`:
```
import { AfterViewInit, Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  ...
})
export class AppComponent implements AfterViewInit {
  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

  ngAfterViewInit() {
    const obj: Object = {
      prop1: 'test',
      prop2: true,
      prop3: [{a: 'a', b: 'b'}, {c: 'c', d: 'd'}],
      prop4: 327652175423
    };

    this.ngxSmartModalService.setModalData(obj, 'myModal');
  }
}
```
After that, you can retrieve the modal data directly from the view with the `getData()` modal property. To avoid any errors with unavailable data, you can use the `hasData()` modal property (It's dynamic. If data comes after a certain time its value will automatically change to `true`):
```
<ngx-smart-modal #myModal identifier="myModal">
  <div *ngIf="myModal.hasData()">
    <pre>{{ myModal.getData() | json }}</pre>
  </div>

  <button (click)="myModal.close()">Close</button>
</ngx-smart-modal>
```

## Handle events
`ngx-smart-modal` comes with several built-in events:

 - `onOpen`: modal is opening
 - `onClose`: modal is closing
 - `onCloseFinished`: modal has been closed
 - `onDismiss`: modal is closing by clicking on its backdrop
 - `onDismissFinished`: modal has been closed by clicking on its backdrop
 - `onEscape`: modal has been closed by escape key
 - `onAnyCloseEvent`: modal is closing whatever the kind of event (close / escape / dismiss)
 - `onAnyCloseEventFinished`: modal has been closed whatever the kind of event (close / escape / dismiss)
 - `visibleChange`: modal visibility has changed (regardless of the modal visibility state)
 - `onDataAdded`: data were added to the modal (using `setData()`)
 - `onDataRemoved` data were removed from the modal (using `removeData()`)

You can handle events directly from the view...
```
<ngx-smart-modal #myModal identifier="myModal" (onOpen)="log('Modal opened!')" (onClose)="log('Modal closed!')" (onDismiss)="log('Modal dismissed!')">
  <h1>Title</h1>
  <p>Some stuff...</p>

  <button (click)="myModal.close()">Close</button>
</ngx-smart-modal>
```
...and execute component's functions:
```
@Component({
  ...
})
export class AppComponent {
  constructor() {
  }

  public log(msg: string) {
    console.log(msg);
  }
}
```

Or you also can declare modal in any template (e.g.: the Rickroll demo modal)...
```
<ngx-smart-modal #videoModal identifier="videoModal" customClass="medium-modal">
  <h1>Hey, I Rickrolled You!</h1>
  <iframe #rickroll width="1280" height="720"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1&controls=0&showinfo=0&ecver=1&enablejsapi=1"
          frameborder="0" allowfullscreen></iframe>

  <button class="button -dark" (click)="videoModal.close()">Close</button>
</ngx-smart-modal>
```
... and listen to its events from any component:
```
export class AppComponent implements AfterViewInit {
  ...
  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

  ngAfterViewInit() {
    this.ngxSmartModalService.getModal('videoModal').onOpen.subscribe((modal: NgxSmartModalComponent) => {
      console.log('Rickroll modal opened!', modal);
    });
  }
}
```


## API
`ngx-smart-modal` also comes with the `NgxSmartModalService` that you can use in any component like this:
```
import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  ...
})
export class AppComponent {
  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }
}
```
**List of available methods**:
 - `addModal(modalInstance: ModalInstance, force?: boolean)`: add a new modal instance
 - `getModal(id: string)`: retrieve a modal instance by its identifier
 - `get(id: string)`: retrieve a modal instance by its identifier (alias of `getModal`)
 - `open(id: string, force?: boolean)`: open a given modal
 - `close(id: string)`: close a given modal
 - `toggle(id: string, force?: boolean)`: toggle a given modal
 - `getModalStack()`: retrieve all the created modals
 - `getOpenedModals()`: retrieve all the opened modals
 - `getHigherIndex()`: get the higher `z-index` value between all the modal instances
 - `getModalStackCount()`: it gives the number of modal instances
 - `removeModal(id: string)`: remove a modal instance from the modal stack
 - `setModalData(data: any, id: string, force?: boolean)`: associate data to an identified modal
 - `getModalData(id: string)`: retrieve modal data by its identifier
 - `resetModalData(id: string)`: reset the data attached to a given modal
 - `closeLatestModal()`: Close the latest opened modal **if it has been declared as escapable**

To get more details about the available methods, their parameters and what they return, please take a look at **[ngx-smart-modal.service.ts](https://github.com/biig-io/ngx-smart-modal/blob/master/src/ngx-smart-modal/src/services/ngx-smart-modal.service.ts)** file (well documented).


## Precautions when upgrading to a newer version
### Upgrade from <=5.x.x to 6.x.x
Make sure that you imported `ngx-smart-modal.scss` or `ngx-smart-modal.css` in a global style file (e.g. `styles.scss` or `styles.css` in classic Angular projects or any other scss/css file it imports).

### Upgrade from <=6.x.x to >=7.x.x
Nothing should break unless if you added custom style to the modal content. In this case, it may break your existing style. To fix it, you simply have to add the `.nsm-body` selector after the `.nsm-dialog` selector because from now, the modal content is wrapped in a `.nsm-body` block.


## Author and Maintainer
* [Maxime LAFARIE](https://github.com/maximelafarie)

## Contributors
* [Mark LUCAS](https://github.com/marco10024)
* [gaetanmarsault](https://github.com/gaetanmarsault)
* [neromaycry](https://github.com/neromaycry)
* [Kraus Vincent](https://github.com/khylias)
* [Andreas Bissinger](https://github.com/be-ndee)
* [Yosbel Marín](https://github.com/yosbelms)
* [Thomas Chang](https://github.com/thomascsd)


## Issues
If you wish to submit an issue, please use the available template to facilitate reading and comprehension of all issues encountered. You can find this template in `./github/issue_template.md`.


## Contribute
Firstly fork this repo, then clone your fork and go inside the root of the freshly forked project.
Run `npm i` or `yarn` to install dependencies then `yarn start` to start the angular-cli demo.
To modify the library, go into `src/ngx-smart-modal` and do some code (and some tests)! 🤓
When you've finished, commit and push it to your forked repo, and make a PR to the official `ngx-smart-modal` repo!
Thank you for your support, you rock! 🤘🎸


## How it works
Basically, imagine that the component is based on a service that stores any modals you create in order to let you pick them up and manage them anywhere in your app at any time.

![Sequence diagram](src/assets/sequence_diagram.png)
