import { AfterViewInit, Component, VERSION, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { INgxSmartModalOptions } from './../../../ngx-smart-modal/src/config/ngx-smart-modal.config';
import { NgxSmartModalComponent, NgxSmartModalService } from '../../../ngx-smart-modal';
import { FakeComponent } from '../fake/fake.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements AfterViewInit {
  version = VERSION.full;

  // tslint:disable:max-line-length
  sampleText: string[] = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ullamcorper neque ac ullamcorper scelerisque. Proin molestie erat sapien, ac dapibus tortor placerat a. Vivamus quis tempor mauris. Ut porta ultricies nisi in eleifend. In magna nisi, tempor pharetra consequat in, sagittis id augue. Aliquam eu lectus id mi vulputate convallis. Nam facilisis nisl quis urna gravida tempus.',
    'Nulla nulla metus, posuere nec magna vitae, volutpat fermentum turpis. Cras blandit orci adipiscing est volutpat euismod. Mauris condimentum in urna in malesuada. Sed adipiscing tellus accumsan commodo fermentum. Duis augue nisi, euismod eget faucibus sed, luctus sit amet libero. Ut rutrum diam vel tellus luctus varius. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed leo mauris. Etiam nec aliquam lacus. Suspendisse ac nulla libero. In consectetur elementum urna, at dignissim nulla convallis congue. Nulla ligula mauris, imperdiet id ultricies eget, vulputate vel neque. Praesent porta elit eu elit feugiat lobortis. Sed nec ullamcorper neque, lacinia consequat sem. Aenean id tellus at quam pellentesque molestie. Vivamus vitae pharetra magna, sit amet elementum nulla.',
    'Sed ut purus congue odio euismod blandit at ac odio. Nunc rhoncus ut arcu sed vestibulum. Duis lobortis aliquam mollis. Nam elementum rhoncus sem, at aliquet mauris semper posuere. Quisque tortor elit, fringilla ut hendrerit nec, tristique nec arcu. Aenean lacus turpis, fermentum ullamcorper vulputate eu, pulvinar eu mi. Donec in ligula sollicitudin sapien aliquet euismod. Vivamus vulputate libero in enim auctor iaculis vel sit amet felis. Vestibulum feugiat lectus vel est posuere tristique.',
    'Vestibulum ultricies accumsan pharetra. Cras at imperdiet diam. Suspendisse potenti. Pellentesque in sodales purus. Sed mattis nibh in pharetra pellentesque. In hac habitasse platea dictumst. Nulla facilisi.',
    'In vel lorem sollicitudin, aliquet nunc vel, rutrum libero. Vivamus eu leo at odio sodales rutrum id a erat. Integer pellentesque condimentum velit a sollicitudin. Maecenas lectus neque, interdum at leo ut, molestie iaculis mauris. Sed ut nisl lorem. Mauris vitae dolor in lorem fringilla suscipit vel sed ligula. Nullam sodales blandit faucibus. Nulla dignissim mollis aliquam. Vivamus lacinia aliquam diam vitae vulputate. Pellentesque nec vulputate lorem, vel volutpat odio. Duis eleifend ipsum eros, quis dapibus lectus condimentum gravida. Nunc blandit leo lacus, a ultrices tellus fermentum et. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla eu blandit nunc.'
  ];

  @ViewChild(TemplateRef, { static: false }) tpl: TemplateRef<any>;

  constructor(public ngxSmartModalService: NgxSmartModalService, private router: Router, private cdr: ChangeDetectorRef) {
  }

  public log(msg: string) {
    console.log(msg);
  }

  ngAfterViewInit() {
    const obj: object = {
      prop1: 'test',
      prop2: true,
      prop3: [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }],
      prop4: 327652175423
    };

    this.ngxSmartModalService.setModalData(obj, 'modalData');

    this.ngxSmartModalService.getModal('videoModal').onOpen.subscribe((modal: NgxSmartModalComponent) => {
      console.log('Rickroll modal opened!', modal);
    });

    this.ngxSmartModalService.getModal('modalData').onOpen.subscribe((modal: NgxSmartModalComponent) => {
      console.log(modal.getData());
    });

    this.ngxSmartModalService.getModal('classicModal').onEscape.subscribe((modal: NgxSmartModalComponent) => {
      console.log('You just escaped the classicModal!', modal);
    });

    this.ngxSmartModalService.getModal('classicModal').onAnyCloseEventFinished.subscribe((modal: NgxSmartModalComponent) => {
      console.log('All close events are ended!', modal);
    });

    // Needed to avoid "Expression has changed since the last check cycle..."
    this.cdr.detectChanges();
  }

  goFeature() {
    this.router.navigate(['demo/feature']);
  }

  goBackToDoc() {
    this.router.navigate(['']);
  }

  goBootstrap() {
    this.router.navigate(['demo/bootstrap']);
  }

  goMaterialize() {
    this.router.navigate(['demo/materialize']);
  }

  goFoundation() {
    this.router.navigate(['demo/foundation']);
  }

  goAutoStart() {
    this.router.navigate(['demo/autostart']);
  }

  goNewDynamic() {
    const opts: INgxSmartModalOptions = {
      backdrop: false
    };

    this.ngxSmartModalService.create('dynamicModal1', 'Hello, I\'m a simple text !').open();

    this.ngxSmartModalService.create('dynamicModal2', FakeComponent, opts).open();

    this.ngxSmartModalService.create('dynamicModal3', this.tpl, opts).open();
  }

}
