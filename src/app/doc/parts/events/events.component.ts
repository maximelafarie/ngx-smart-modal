import { Component, OnInit } from '@angular/core';
import { DocEvent } from '@app/models';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  // tslint:disable:max-line-length
  // tslint:disable:no-trailing-whitespace
  public readonly CODES = {
    HTML_EVENT: `<ngx-smart-modal #myModal identifier="myModal" (onOpen)="log('Modal opened!')" (onClose)="log('Modal closed!')" (onDismiss)="log('Modal dismissed!')">
  <h1>Title</h1>
  <p>Some stuff...</p>

  <button (click)="myModal.close()">Close</button>
</ngx-smart-modal>`,
    COMP_FUNC: `@Component({
  // ...
})
export class AppComponent {
  constructor() {
  }

  public log(msg: string) {
    console.log(msg);
  }
}`,
    RICKROLL_MODAL_HTML: `<ngx-smart-modal #videoModal identifier="videoModal" customClass="medium-modal">
  <h1>Hey, I Rickrolled You!</h1>
  <iframe #rickroll width="1280" height="720"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&autoplay=1&controls=0&showinfo=0&ecver=1&enablejsapi=1"
          frameborder="0" allowfullscreen></iframe>

  <button class="button -dark" (click)="videoModal.close()">Close</button>
</ngx-smart-modal>`,
    LISTEN_EVENT_EXAMPLE: `export class AppComponent implements AfterViewInit {
  // ...
  constructor(public ngxSmartModalService: NgxSmartModalService) {
  }

  ngAfterViewInit() {
    this.ngxSmartModalService.getModal('videoModal').onOpen.subscribe((modal: NgxSmartModalComponent) => {
      console.log('Rickroll modal opened!', modal);
    });
  }
}`
  };
  // tslint:enable:no-trailing-whitespace
  // tslint:enable:max-line-length


  // tslint:disable:max-line-length
  public readonly EVENTS: DocEvent[] = [
    {
      name: 'onOpen',
      description: 'modal is opening'
    },
    {
      name: 'onOpenFinished',
      description: 'modal has been opened'
    },
    {
      name: 'onClose',
      description: 'modal is closing'
    },
    {
      name: 'onCloseFinished',
      description: 'modal has been closed'
    },
    {
      name: 'onDismiss',
      description: 'modal is closing by clicking on its backdrop'
    },
    {
      name: 'onDismissFinished',
      description: 'modal has been closed by clicking on its backdrop'
    },
    {
      name: 'onEscape',
      description: 'modal has been closed by escape key'
    },
    {
      name: 'onAnyCloseEvent',
      description: 'modal is closing whatever the kind of event (<code>close</code> / <code>escape</code> / <code>dismiss</code>)'
    },
    {
      name: 'onAnyCloseEventFinished',
      description: 'modal has been closed whatever the kind of event (<code>close</code> / <code>escape</code> / <code>dismiss</code>)'
    },
    {
      name: 'visibleChange',
      description: 'modal visibility has changed (regardless of the modal visibility state)'
    },
    {
      name: 'onDataAdded',
      description: 'data were added to the modal (using <code>setData()</code>)'
    },
    {
      name: 'onDataRemoved',
      description: 'data were removed from the modal (using <code>removeData()</code>)'
    },
  ];
  // tslint:enable:max-line-length

  constructor() { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

}
