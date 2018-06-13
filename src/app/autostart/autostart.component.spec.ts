import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutostartComponent } from './autostart.component';

describe('AutostartComponent', () => {
  let component: AutostartComponent;
  let fixture: ComponentFixture<AutostartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutostartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutostartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
