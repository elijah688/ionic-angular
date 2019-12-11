import { Component, OnInit } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.sass']
})
export class AppComponent implements OnInit{
  private navigate =
  [
    {
      title : "Dashboard",
      url   : "",
      icon  : "home"
    },
    {
      title : "Photos",
      url   : "",
      icon  : "photos"
    },
    {
      title : "Characters",
      url   : "/list",
      icon  : "list-box"
    },
    {
      title : "My Missions",
      url   : "",
      icon  : "locate"
    },
    {
      title : "Chat",
      url   : "/chat",
      icon  : "chatbubbles"
    },
    
  ]
  constructor(
    private authServ:AuthenticationService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {
    this.authServ.autoLogin();    
  }

  logOut():void{
    this.authServ.logOut();
  }
  

}
