import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fake',
  templateUrl: './fake.component.html',
  styleUrls: ['./fake.component.scss']
})
export class FakeComponent implements OnInit {
  firstname: string = 'Jack';
  @Input() lastname: string;

  constructor() {
  }

  ngOnInit() {
  }

}
