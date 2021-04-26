import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MaterializeComponent } from './materialize.component';

describe('MaterializeComponent', () => {
  let component: MaterializeComponent;
  let fixture: ComponentFixture<MaterializeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterializeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
