![ngx-smart-modal](https://user-images.githubusercontent.com/5319267/28756216-65c335c4-756a-11e7-9ac5-6a0e0cd8ea22.png)

[![Join the chat at https://gitter.im/ngx-smart-modal/Lobby](https://badges.gitter.im/ngx-smart-modal/Lobby.svg)](https://gitter.im/ngx-smart-modal/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) 
[![Greenkeeper badge](https://badges.greenkeeper.io/biig-io/ngx-smart-modal.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/biig-io/ngx-smart-modal.svg?branch=master)](https://travis-ci.org/biig-io/ngx-smart-modal) [![npm version](https://badge.fury.io/js/ngx-smart-modal.svg)](https://badge.fury.io/js/ngx-smart-modal) [![npm downloads](https://img.shields.io/npm/dm/ngx-smart-modal.svg)](https://npmjs.org/ngx-smart-modal) [![codecov](https://codecov.io/gh/biig-io/ngx-smart-modal/branch/master/graph/badge.svg)](https://codecov.io/gh/biig-io/ngx-smart-modal)

`ngx-smart-modal` is a lightweight and very complete Angular component for managing modal inside any Angular project. It was built for modern browsers using TypeScript, SCSS, HTML5 and Angular >=4.0.0.

## Demo
http://biig-io.github.io/ngx-smart-modal/


## No external library, no jQuery! 🤘
To avoid imposing you to download a CSS library by using this package, this one is only using [Angular animations](https://angular.io/guide/animations). So get rid of being forced to use a CSS library you don't want to! In addition, it doesn't use jQuery either! 

> #### But... I'm using Bootstrap (or Materialize, Foundation or anything else)!
> Don't panic! We already thought about that! And because we want to be as neutral as we can, we made it very flexible for you to style it!
> So if your app uses a CSS framework that has some modal styles, you simply have to pick up its class names and set the main class in the `[customClasses]="modal"` (e.g.: bootstrap). And the rest of the modal DOM elements simply has to be set in the `ngx-smart-modal` component (e.g.: modal-dialog, modal-content, modal-header, etc.).

Check out the [documentation](https://github.com/biig-io/ngx-smart-modal) & [demos](https://github.com/biig-io/ngx-smart-modal) for more information and tutorials!

See the [changelog](https://github.com/biig-io/ngx-smart-modalchangelog.md) for recent changes.

## Features
 - Handle large quantity of modals anywhere in your app
 - Customize the style of your modals through custom CSS classes
 - No external CSS library is used so you can easily override the modals default style
 - Pass data to any modal, and retrieve it very simply in the modal view
 - Events on `open`, `close` and `dismiss` for each modal
 - Manage all your modal stack and data with very fast methods
 - Very smart `z-index` computation (no ugly glitches or problems with a modal inside another)
 - A modal in a modal in a modal in a modal... I guess you got it!
 - AoT compilation support

## Setup
To use `ngx-smart-modal` in your project install it via [npm](https://www.npmjs.com/package/ngx-smart-modal):
```
npm i ngx-smart-modal --save
```
⚠️ If you have the following warning after install:
```
npm WARN ngx-smart-modal@2.0.1 requires a peer of web-animations-js@>=2.0.0 but none was installed.
``` 
or 
```
warning "ngx-smart-modal@2.0.1" has unmet peer dependency "web-animations-js@>=2.0.0".
```
Just run:
```
npm i web-animations-js --save
```
or
```
yarn add web-animations-js
```
Then add 
`NgxSmartModalModule` (with `.forRoot()` or `.forChild()` depending if the module which you import the library into is the main module of your project or a nested module) and `NgxSmartModalService` to your project `NgModule`
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [ NgxSmartModalService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
```

## Manipulate modals
You can use it directly in your component's template like this
```
<ngx-smart-modal #myModal [identifier]="'myModal'">
  <h1>Title</h1>
  <p>Some stuff...</p>

  <button (click)="myModal.close()">Close</button>
</ngx-smart-modal>
```
At this point, the modal instance is stored in the `NgxSmartModalService`. You can do absolutely what you want with it, anywhere in your app. For example, from a component :
```
import {Component} from '@angular/core';
import {NgxSmartModalService} from 'ngx-smart-modal';

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
import {AfterViewInit, Component} from '@angular/core';
import {NgxSmartModalService} from 'ngx-smart-modal';

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
<ngx-smart-modal #myModal [identifier]="'myModal'">
  <div *ngIf="myModal.hasData()">
    <pre>{{ myModal.getData() | json }}</pre>
  </div>

  <button (click)="myModal.close()">Close</button>
</ngx-smart-modal>
```

## Handle events
`ngx-smart-modal` comes with three built-in events: `onOpen`, `onClose` and `onDismiss`.

 - `onOpen`: a modal has been opened
 - `onClose`: a modal has been closed
 - `onDismiss`: a modal has been closed by clicking on its backdrop

You can handle events directly from the view...
```
<ngx-smart-modal #myModal [identifier]="'myModal'" (onOpen)="log('Modal opened!')" (onClose)="log('Modal closed!')" (onDismiss)="log('Modal dismissed!')">
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
```

## Contribute
Firstly fork this repo, then clone it and go inside the root of the freshly forked project.
`ng serve` to start the angular-cli demo.
To modify the package, go into ./src/lib/core and do some code! 🤓
When you finished commit and push it to your fork repo, make a PR!
Thank you for your support, you rock! 🤘🎸

## How it works
Basically, imagine that the component is based on a service that stores any modals you create in order to let you pick them up and manage them anywhere in your app at any time.

![Sequence diagram](demo/src/assets/sequence_diagram.png)
