import { SafeHtmlPipe } from './safe-html.pipe';
import { DomSanitizer, BrowserModule } from '@angular/platform-browser';
import { TestBed, inject } from '@angular/core/testing';

describe('SafeHtmlPipe', () => {

  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
  });

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    const pipe = new SafeHtmlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  }));
});
