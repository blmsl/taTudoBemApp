import { Component } from '@angular/core';
import { NavController, LoadingController, MenuController, Platform, AlertController, ToastController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

declare var navigator;
declare var Connection;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public menu: MenuController,
    public platform: Platform,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    private callNumber: CallNumber
  ) {
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
          duration: 300,
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
    this.menu.enable(true);

    this.loading();
  }

  loading() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box"></div>
      </div>`,
      duration: 3000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
  }

  helpMeAbout() {
    let alert = this.alertCtrl.create({
      title: 'Sobre o 141',
      subTitle: 'Ao clicar no botão "Preciso conversar com alguém!" você estará ligando automaticamente para o CVV - Centro de Valorização da Vida, uma ONG que oferece apoio emocional e prevenção do suicídio de forma gratuita sob total sigilo por telefone.',
      buttons: [
        {
          text: 'Ok',
          handler: data => {
            console.log('clicou ok para ligar 141');
          }
        }
      ]
    });
    alert.present();
  }


  launchDialer(n: string) {
    this.callNumber.callNumber(n, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }


  launch(url) {
    this.platform.ready().then(() => {
      open(url, '_parent', 'location = yes');
    });

  }

}
