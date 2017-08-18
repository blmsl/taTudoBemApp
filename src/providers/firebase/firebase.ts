import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
 
@Injectable()
export class FirebaseProvider {
 
  constructor(public fireDatabase: AngularFireDatabase) { }
 
  getSuicideInfos() {
    return this.fireDatabase.list('/suicideFacts/');
  }

}