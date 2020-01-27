import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fake',
  templateUrl: './fake.component.html',
  styleUrls: ['./fake.component.scss']
})
export class FakeComponent implements OnInit {

  public name = 'Jack';

  constructor() {
  }

  ngOnInit() {
  }

}
