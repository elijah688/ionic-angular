import { Component, OnInit, Input } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass'],
})
export class NavigationComponent implements OnInit {
  @Input() private title:string;
  private navigate =
  [
    {
      title : "Auth",
      url   : "/authentication",
      icon  : "home"
    },
    {
      title : "LOGO",
      url   : "/recipes",
      icon  : "chatboxes"
    },
    {
      title : "Contacts",
      url   : "/contacts",
      icon  : "contacts"
    },
  ]
  constructor() { }

  ngOnInit() {}

  


}
