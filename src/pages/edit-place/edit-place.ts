import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';
import { Place } from '../../models/place';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { Geolocation } from '@ionic-native/geolocation';



/**
 * Generated class for the EditPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-place',
  templateUrl: 'edit-place.html',
})
export class EditPlacePage {

  /**
   * The trips API url
   */
  apiUrl = config.apiUrl+'api/places/';

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the ressource is incorrect).
   */
  placeUpdateError: boolean;

  placeInfo: Place;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private geolocation: Geolocation, public toastCtrl: ToastController) {
    this.placeInfo = this.navParams.get('place');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPlacePage');
  }

  patchPlace() {
    // Hide previous error messages
    this.placeUpdateError = false;

    this.http.patch<Place>(this.apiUrl + this.placeInfo.id, this.placeInfo).subscribe(() =>{
      this.notify("Place updated successfully");
      this.navCtrl.pop();
    }, err => {
      console.log(err);
      this.placeUpdateError = true;
      this.notify("Place update failed");
      console.warn(`Place update failed: ${err.message}`);
    })
  }

  notify(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
    }).present();
  }

}
