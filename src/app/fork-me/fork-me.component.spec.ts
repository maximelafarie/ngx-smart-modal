import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ForkMeComponent } from './fork-me.component';

describe('ForkMeComponent', () => {
  let component: ForkMeComponent;
  let fixture: ComponentFixture<ForkMeComponent>;

  beforeEach(waitForAsync(() => {
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
