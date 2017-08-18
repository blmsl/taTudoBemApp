import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, ToastController } from 'ionic-angular';

import { HomePage } from "../home/home";

declare var navigator;
declare var Connection;

@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menu: MenuController, public platform: Platform, public toastCtrl: ToastController) {
    this.checkNetwork();
  }

    checkNetwork() {

    this.platform.ready().then(() => {

      var networkState = navigator.connection.type;
      var states = {};

      states[Connection.NONE] = 'Sem conexão com a internet. Por favor, verifique sua rede Wi-Fi ou a do seu celular.';

      if (states[networkState] == states[Connection.NONE]) {
        let toast = this.toastCtrl.create({
          message: states[Connection.NONE],
          duration: 3000,
          showCloseButton: true,
          closeButtonText: 'Ok',
          position: 'bottom'
        });

        toast.present();
      }

    })

  }

  ionViewDidLoad() {
    this.menu.close();
    this.menu.enable(false);
  }

  goToHomePage() {
    this.navCtrl.setRoot(HomePage);
  }

}
