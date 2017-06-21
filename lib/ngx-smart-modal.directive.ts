import { Directive,ElementRef,OnInit, AfterViewInit } from '@angular/core';
import { NgxSmartModalService } from './ngx-smart-modal.service';

@Directive({ selector: '[ngx-smart-modal]' })
export class NgxSmartModalDirective implements OnInit, AfterViewInit{
  constructor() {}

  ngOnInit() {

  }

  ngAfterViewInit(){

  }
}
