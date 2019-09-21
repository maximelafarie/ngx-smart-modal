import { Component, OnInit } from '@angular/core';

import { DocOption } from '@app/models';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss']
})
export class OptionsComponent implements OnInit {

  public readonly CODES = {
    MARKUP_OPTION_EXAMPLE: `<ngx-smart-modal [parameter-or-option-name]="value"></ngx-smart-modal>`
  };

  // tslint:disable:max-line-length
  public readonly OPTIONS: DocOption[] = [
    {
      name: 'closable',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Show / hide the cross icon at the top right corner of the modal'
    },
    {
      name: 'escapable',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Enable / disable the modal for listening to the escape keypress event (if pressed and this option is set to true, it will close the current opened modal or the latest opened if you have several modals opened at the same time).  ⚠️ NOT RECOMMANDED for accessibility reasons.'
    },
    {
      name: 'dismissable',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Enable / disable the modal backdrop for listening to the click event (if backdrop is clicked and this option is set to true, it will close the current opened modal or the latest opened if you have several modals opened at the same time)'
    },
    {
      name: 'identifier',
      type: 'string',
      defaultValue: 'undefined',
      description: 'REQUIRED ― The identifiant of the modal instance. Retrieve a modal easily by its identifier'
    },
    {
      name: 'force',
      type: 'boolean',
      defaultValue: 'true',
      description: 'If true and if you declare another modal instance with the same identifier that another, the service will override it by the new you declare in the modal stack.'
    },
    {
      name: 'customClass',
      type: 'string',
      defaultValue: "'nsm-dialog-animation-fade'",
      description: 'All the additionnal classes you want to add to the modal (e.g.: any bootstrap modal class). You can add several classes by giving a string with space-separated class names'
    },
    {
      name: 'backdrop',
      type: 'boolean',
      defaultValue: 'true',
      description: 'Enable / disable the backdrop of a modal. Tip: when you want to encapsulate several modals, set this options at true for the parent modal and false for the others.'
    },
    {
      name: 'hideDelay',
      type: 'number',
      defaultValue: '500',
      description: 'Opening / closing class delay in milliseconds. ⚠️ Only for NgxSmartModal >= 6.0.0!'
    },
    {
      name: 'autostart',
      type: 'boolean',
      defaultValue: 'false',
      description: 'Define if the modal is showing up automatically when loaded or not.'
    },
    {
      name: 'target',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Displays the modal relatively to the targeted element. ⚠️ Only for NgxSmartModal >= 7.0.0!'
    },
    {
      name: 'ariaLabel',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Define a accessible title for your modal.'
    },
    {
      name: 'ariaLabelledBy',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Define a accessible title for your modal. Enter the id of your title content.'
    },
    {
      name: 'ariaDescribedBy',
      type: 'string',
      defaultValue: 'undefined',
      description: 'Define a accessible description for your modal. Enter the id of your description content.'
    }
  ];
  // tslint:enable:max-line-length

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
