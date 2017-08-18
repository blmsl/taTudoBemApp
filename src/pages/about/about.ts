import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {
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

}
