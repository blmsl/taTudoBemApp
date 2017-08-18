import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';

declare var cordova;

@Injectable()
export class PushService {

    PUSHWOOSH_APP_ID: string = 'B24E8-4AF21';
    GOOGLE_PROJECT_NUMBER: string = '494295368226';
    MPNS_SERVICE_NAME: string = 'tatudobemapp';
    
    constructor(public platform : Platform){

        this.platform.ready().then(() => {
            if(this.platform.is('ios') || this.platform.is('android')){
                console.log("PushwooshService init: Running on push compatible platform "+ this.platform.userAgent() +')');
                this.initPushwoosh();
            } else{
                console.log("PushwooshService init: No compatible platform available.  Skipping init.)");
                return;
            }
        });
    }

    initPushwoosh(){
        var pushNotification = cordova.require("pushwoosh-cordova-plugin.PushNotification");

          document.addEventListener('push-notification', function (event) {
            var userData = (event as any).userdata; 

            if (userData) {
            console.log('user data: ' + JSON.stringify(userData));
            }

          });

          pushNotification.onDeviceReady({
              appid: this.PUSHWOOSH_APP_ID,
              projectid: this.GOOGLE_PROJECT_NUMBER,
              serviceName: this.MPNS_SERVICE_NAME
          });

          pushNotification.registerDevice(
              function (status) {
                var pushToken = status;
                console.log(pushToken);
              },
              function (status) {
              }
          );
    }

}