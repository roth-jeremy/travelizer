import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { PlacesVisitedPage } from '../places-visited/places-visited';
import { CreateTripPage } from '../create-trip/create-trip';
import { Trip } from '../../models/trip';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';

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

  /**
   * The trips table
   */
  trips : Trip[];

  /**
   * The trips API url
   */
  apiUrl = config.apiUrl+'api/trips';

  constructor(public navCtrl: NavController, public navParams: NavParams, private  nav:Nav, public toastCtrl: ToastController , private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTripsPage');
  }

  ionViewDidEnter() {
    this.listTrips();
  }
  

  listTrips() {
    this.http.get<Trip[]>(this.apiUrl).subscribe(tripsList => {
      this.trips = tripsList;
    });
  }

  AddTrip() {
    this.nav.push(CreateTripPage);
  }

  DeleteTrip(trip:Trip): void {
    this.http.delete(this.apiUrl + "/" + trip.id).subscribe(() => {
      this.listTrips();
      this.notify("Trip deleted successfully");
    }, err => {
      this.notify("Only trips created by the user are deletable");
    });
  }

  PlacesVisited(trip:Trip) {
    this.nav.push(PlacesVisitedPage, {
      trip: trip
    });
  }

  notify(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
    }).present();
  }

}
