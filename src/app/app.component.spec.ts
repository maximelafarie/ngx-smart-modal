import {TestBed, async} from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {NgxSmartModalModule, NgxSmartModalService} from '../lib/core/ngx-smart-modal';
import {AppComponent} from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        BrowserModule,
        NgxSmartModalModule
      ],
      providers: [NgxSmartModalService]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
