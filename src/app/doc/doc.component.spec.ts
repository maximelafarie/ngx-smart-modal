import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocComponent } from './doc.component';

describe('DocComponent', () => {
  let component: DocComponent;
  let fixture: ComponentFixture<DocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
