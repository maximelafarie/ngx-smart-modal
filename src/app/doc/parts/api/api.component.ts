import { Component, OnInit } from '@angular/core';

import { DocMethod } from '@app/models';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  public readonly CODES = {
    SERVICE_IMPORT: `import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  // ...
})
export class AppComponent {
  constructor(public ngxSmartModalService: NgxSmartModalService) { }
}`
  };

  // tslint:disable:max-line-length
  public readonly METHODS: DocMethod[] = [
    {
      name: ['addModal(modalInstance: ModalInstance, force?: boolean)'],
      description: 'Add a new modal instance',
      params: [
        {
          name: 'modalInstance',
          type: 'ModalInstance',
          description: `An object containing the modal <code>identifier</code> and the modal <code>Class</code> instance`
        },
        {
          name: 'force',
          type: 'boolean',
          description: 'Wether to erase potentially existing modal with the same <code>identifier</code> or not'
        }
      ],
      return: {
        type: 'void'
      }
    },
    {
      name: ['getModal(id: string)', 'get(id: string)'],
      description: 'Retrieve a modal instance by its identifier',
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'The <code>identifier</code> of the modal you want to retrieve'
        }
      ],
      return: {
        type: 'NgxSmartModalComponent | Error',
        description: 'A modal with same identifier or an error'
      }
    },
    {
      name: ['open(id: string, force?: boolean)'],
      description: 'Open a given modal',
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'The <code>identifier</code> of the modal you want to open'
        },
        {
          name: 'force',
          type: 'boolean',
          description: 'By default modals will open according to their instanciation order. Enable this option will open it top of all other modals declared later or already opened'
        },
      ],
      return: {
        type: 'void'
      }
    },
    {
      name: ['close(id: string)'],
      description: 'Close a given modal',
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'The <code>identifier</code> of the modal you want to close'
        }
      ],
      return: {
        type: 'void'
      }
    },
    {
      name: ['closeAll()'],
      description: 'Close all opened modals',
      params: [],
      return: {
        type: 'void'
      }
    },
    {
      name: ['toggle(id: string, force?: boolean)'],
      description: 'Toggle (open <strong>or</strong> close) a given modal',
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'The <code>identifier</code> of the modal you want to toggle'
        },
        {
          name: 'force',
          type: 'boolean',
          description: 'By default modals will open according to their instanciation order. Enable this option will open it top of all  note it has no effect if modal closes.'
        }
      ],
      return: {
        type: 'void'
      }
    },
    {
      name: ['getModalStack()'],
      description: 'Retrieve all created modals',
      params: [],
      return: {
        type: 'ModalInstance[]',
        description: 'An array of modal instances'
      }
    },
    {
      name: ['getOpenedModals()'],
      description: 'Retrieve all opened modals',
      params: [],
      return: {
        type: 'ModalInstance[]',
        description: 'An array of <strong>opened</strong> modal instances'
      }
    },
    {
      name: ['getHigherIndex()'],
      description: 'Get the higher index value between all the modal instances',
      params: [],
      return: {
        type: 'number',
        description: 'An higher index over all existing modals index'
      }
    },
    {
      name: ['getModalStackCount()'],
      description: 'Gives the number of modal instances',
      params: [],
      return: {
        type: 'number',
        description: 'The number of modal instances'
      }
    },
    {
      name: ['removeModal(id: string)'],
      description: 'Remove a modal instance from the modal stack',
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'The <code>identifier</code> of the modal you want to remove'
        }
      ],
      return: {
        type: 'void'
      }
    },
    {
      name: ['setModalData(data: any, id: string, force?: boolean)'],
      description: "Associate data to an identified modal. You can get it later with service methods or from modal's reference",
      params: [
        {
          name: 'data',
          type: 'any',
          description: 'The data you want to bind to the modal'
        },
        {
          name: 'id',
          type: 'string',
          description: 'The <code>identifier</code> of the modal'
        },
        {
          name: 'force',
          type: 'boolean',
          description: 'Overwrite potentially existing data that has already been associated with the modal'
        },
      ],
      return: {
        type: 'boolean',
        description: 'If data successfully bound to the modal <code>true</code>, either<code>false</code>'
      }
    },
    {
      name: ['getModalData(id: string)'],
      description: 'Retrieve modal data by its identifier',
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'The <code>identifier</code> of the modal'
        }
      ],
      return: {
        type: 'any | undefined',
        description: 'The data you attached to the modal'
      }
    },
    {
      name: ['resetModalData(id: string)'],
      description: 'Reset the data attached to a given modal',
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'The <code>identifier</code> of the modal you want to remove the attached data'
        }
      ],
      return: {
        type: 'any | boolean',
        description: 'The removed data. <code>false</code> if modal not found'
      }
    },
    {
      name: ['closeLatestModal()'],
      description: 'Close the latest opened modal <strong>if it has been declared as escapable</strong>',
      params: [],
      return: {
        type: 'void'
      }
    },
    {
      name: ['create(id: string, content: Content<T>, options?: INgxSmartModalOptions)'],
      description: 'Create dynamic NgxSmartModalComponent',
      params: [
        {
          name: 'id',
          type: 'string',
          description: 'The <code>identifier</code> of the modal you want to create'
        },
        {
          name: 'content',
          type: 'Content<T>',
          description: 'The modal content (String, TemplateRef or Component)'
        },
        {
          name: 'options',
          type: 'INgxSmartModalOptions',
          description: 'The modal options. It is the same as the one you may use with template declaration'
        },
      ],
      return: {
        type: 'ComponentFactory<NgxSmartModalComponent>',
        description: 'An instance of <code>NgxSmartModalComponent</code>'
      }
    },
  ];
  // tslint:enable:max-line-length

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
