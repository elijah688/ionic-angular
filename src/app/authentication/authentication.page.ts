import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.page.html',
  styleUrls: ['./authentication.page.sass'],
})
export class AuthenticationPage implements OnInit {
  private title:string = 'authentication';
  constructor() { }

  ngOnInit() {
  }

}
