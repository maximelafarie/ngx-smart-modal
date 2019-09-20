import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForkMeComponent } from './fork-me.component';

describe('ForkMeComponent', () => {
  let component: ForkMeComponent;
  let fixture: ComponentFixture<ForkMeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForkMeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForkMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
