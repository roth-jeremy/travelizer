import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { PlacesVisitedPage } from '../places-visited/places-visited';
import { CreateTripPage } from '../create-trip/create-trip';

/**
 * Generated class for the MyTripsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-trips',
  templateUrl: 'my-trips.html',
})
export class MyTripsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private  nav:Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTripsPage');
  }

  AddTrip() {
    this.nav.push(CreateTripPage);
  }
  PlacesVisited() {
    this.nav.push(PlacesVisitedPage);
  }

}
