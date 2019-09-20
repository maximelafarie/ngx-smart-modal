import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakeComponent } from './fake.component';

describe('FakeComponent', () => {
  let component: FakeComponent;
  let fixture: ComponentFixture<FakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
