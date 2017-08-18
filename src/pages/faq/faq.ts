import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Platform } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseListObservable } from 'angularfire2/database';

declare var navigator;
declare var Connection;

@Component({
  selector: 'page-faq',
  templateUrl: 'faq.html',
})
export class FaqPage {

  suicideFacts: FirebaseListObservable<any[]>;

  shownGroup = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public firebaseProvider: FirebaseProvider, public toastCtrl: ToastController, public platform: Platform) {

    this.suicideFacts = this.firebaseProvider.getSuicideInfos();
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
    this.loading();
  }

  loading() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
      duration: 300
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  }

  isGroupShown(group) {
    return this.shownGroup === group;
  }

}
