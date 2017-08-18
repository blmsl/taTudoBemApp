import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { WelcomePage } from "../pages/welcome/welcome";
import { AboutPage } from "../pages/about/about";
import { FaqPage } from "../pages/faq/faq";
import { ConfigPage } from "../pages/config/config";
import { PushService } from "../providers/push-service/push-service";


@Component({
  templateUrl: 'app.html',
  providers: [PushService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;

  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public pushService: PushService) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Mitos e verdades', component: FaqPage, icon: 'paper' },
      { title: 'Configurações', component: ConfigPage, icon: 'settings' },
      { title: 'Sobre o app', component: AboutPage, icon: 'heart' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.hideSplashScreen();
    });
  }

  hideSplashScreen() {
    if (this.splashScreen) {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 100);
    }
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

}
