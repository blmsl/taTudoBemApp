import { Component, Injectable } from '@angular/core';
import { NavController, NavParams, Platform, Events, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import 'rxjs/add/operator/map';

import { PushService } from "../../providers/push-service/push-service";

declare var cordova;

declare var navigator;
declare var Connection;

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
  providers: [PushService]
})

@Injectable()
export class ConfigPage {

  public canBeNotify: boolean;
  public notifications = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public platform: Platform,
    public alertCtrl: AlertController,
    public pushService: PushService,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private nativeStorage: NativeStorage

  ) {
    this.checkNetwork();
    this.notify();
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

  notify() {

    this.nativeStorage.getItem('notifications').then(res => {
      this.canBeNotify = res;
      console.log("sera?   " + res);
    });
  }

  saveNotify() {
    this.nativeStorage.setItem('notifications', this.canBeNotify).then(res => {
      console.log("save: " + res)

      if (res == true) {
        this.pushwooshRegisterDevice().then(res => {
          console.log("teste register: " + JSON.stringify(res))
        })
      } else {
        this.pushwooshUnregisterDevice().then(res => {
          console.log("teste unregister: " + res)
        });
      }
    })
  }

  pushwooshRegisterDevice() {

    var pushwoosh = cordova.require("pushwoosh-cordova-plugin.PushNotification");
    pushwoosh.onDeviceReady({
      appid: "B24E8-4AF21",
      projectid: "494295368226",
      serviceName: "tatudobemapp"
    });

    return new Promise((resolve) => {
      pushwoosh.registerDevice(
        function (status) {
          console.log("register: " + JSON.stringify(status));
        },
        function (status) {
          console.log("failed to register: " + status);
        }
      );
      resolve(status)
    })
  }

  pushwooshUnregisterDevice() {

    var pushwoosh = cordova.require("pushwoosh-cordova-plugin.PushNotification");
    pushwoosh.onDeviceReady({
      appid: "B24E8-4AF21",
      projectid: "494295368226",
      serviceName: "tatudobemapp"
    });


    return new Promise((resolve) => {
      pushwoosh.unregisterDevice(
        function (status) {
          console.log("unregister: " + JSON.stringify(status));
        },
        function (error) {
          console.log("failed to unregister: " + status);
        }
      )
      resolve(status)
    })

  }
}