import { Component, OnInit } from '@angular/core';

import { DocStyle, DocClass } from '@app/models';

@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss']
})
export class StyleComponent implements OnInit {

  public readonly CODES = {
    SCSS_IMPORT: `/* You can add global styles to this file, and also import other style files */
/* NgxSmartModal variables override */
$color-overlay: rgba(0, 0, 0, .7);
$dialog-position-top: 20%;

@import "~ngx-smart-modal/ngx-smart-modal";
// ...`,
  };

  // tslint:disable:max-line-length
  public readonly SCSS_VARIABLES: DocStyle[] = [
    {
      name: '$color-overlay',
      type: '<a href="https://www.w3schools.com/cssref/css_colors_legal.asp" class="siimple-link" target="_blank">color</a>',
      defaultValue: 'rgba(0,0,0,.5)',
      description: 'Modifies the modals overlay background color'
    },
    {
      name: '$dialog-position-top',
      type: '<a href="https://www.w3schools.com/cssref/css_units.asp" class="siimple-link" target="_blank">unit</a>',
      defaultValue: '1.75rem',
      description: 'Defines the position of the modal from the top of the screen'
    },
    {
      name: '$dialog-position-right',
      type: '<a href="https://www.w3schools.com/cssref/css_units.asp" class="siimple-link" target="_blank">unit</a>',
      defaultValue: 'auto',
      description: 'Defines the position of the modal from the right of the screen'
    },
    {
      name: '$dialog-position-bottom',
      type: '<a href="https://www.w3schools.com/cssref/css_units.asp" class="siimple-link" target="_blank">unit</a>',
      defaultValue: 'auto',
      description: 'Defines the position of the modal from the bottom of the screen'
    },
    {
      name: '$dialog-position-left',
      type: '<a href="https://www.w3schools.com/cssref/css_units.asp" class="siimple-link" target="_blank">unit</a>',
      defaultValue: 'auto',
      description: ' Defines the position of the modal from the left of the screen'
    },
    {
      name: '$transition-duration',
      type: '<a href="https://www.w3schools.com/cssref/css3_pr_transition-duration.asp" class="siimple-link" target="_blank">duration</a>',
      defaultValue: '500ms',
      description: 'Defines the transition effect duration. <strong>Keep in mind you also need to set the same time (in ms) in the <code>hideDelay</code> modal option (see below)</strong>'
    },
    {
      name: '$transition-timing-function',
      type: '<a href="https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp" class="siimple-link" target="_blank">function</a>',
      defaultValue: 'ease-in-out',
      description: 'Specifies the speed curve of the transition effect (<a target="_blank" href="https://www.w3schools.com/cssref/css3_pr_transition-timing-function.asp" class="siimple-link">available speed curves here</a>)'
    },
    {
      name: '$opened-modal-body-overflow',
      type: '<a href="https://www.w3schools.com/cssref/pr_pos_overflow.asp" class="siimple-link" target="_blank">overflow</a>',
      defaultValue: 'hidden',
      description: 'Defines the page scroll lock behavior if a modal is opened'
    },
  ];

  public readonly SCSS_CLASS: DocClass[] = [
    {
      name: '',
      description: 'no class. The modal will show without any transition effect'
    },
    {
      name: '.nsm-dialog-animation-fade',
      description: 'default modal effect with a simple fade effect'
    },
    {
      name: '.nsm-dialog-animation-ltr',
      description: 'the modal comes with a left-to-right effect'
    },
    {
      name: '.nsm-dialog-animation-rtl',
      description: 'the modal comes with a right-to-left effect'
    },
    {
      name: '.nsm-dialog-animation-ttb',
      description: 'the modal comes with a top-to-bottom effect'
    },
    {
      name: '.nsm-dialog-animation-btt',
      description: 'the modal comes with a bottom-to-top effect'
    },
    {
      name: '.nsm-centered',
      description: 'the modal is centered vertically'
    },
  ];
  // tslint:enable:max-line-length

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
