import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WelcomePage } from "../pages/welcome/welcome";
import { AboutPage } from "../pages/about/about";
import { FaqPage } from "../pages/faq/faq";
import { ConfigPage } from "../pages/config/config";

import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FirebaseProvider } from './../providers/firebase/firebase';
import { PushService } from "../providers/push-service/push-service";
import { NativeStorage } from "@ionic-native/native-storage";
import { CallNumber } from "@ionic-native/call-number";

const firebaseConfig = {
  apiKey: "AIzaSyAaYhj0YJhDP8YtdidxebiSlM_nEtv7Hnc",
  authDomain: "domain.firebaseapp.com",
  databaseURL: "https://tatudobemapp.firebaseio.com/",
  projectId: "tatudobemapp",
  storageBucket: "tatudobemapp.appspot.com",
  messagingSenderId: "494295368226"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    WelcomePage,
    AboutPage,
    FaqPage,
    ConfigPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    WelcomePage,
    AboutPage,
    FaqPage,
    ConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    FirebaseProvider,
    PushService,
    CallNumber,
    NativeStorage
  ]
})
export class AppModule { }
