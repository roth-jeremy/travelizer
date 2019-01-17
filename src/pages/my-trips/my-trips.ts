import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Nav } from 'ionic-angular';
import { PlacesVisitedPage } from '../places-visited/places-visited';
import { CreateTripPage } from '../create-trip/create-trip';
import { Trip } from '../../models/trip';
import { HttpClient } from '@angular/common/http';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private  nav:Nav, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTripsPage');
  }

  ionViewDidEnter() {
    this.listTrips();
  }
  

  listTrips() {
    let tripsURL = 'https://comem-appmob-2018-2019-d.herokuapp.com/api/trips';

    this.http.get<Trip[]>(tripsURL).subscribe(tripsList => {
      this.trips = tripsList;
    });
  }

  AddTrip() {
    this.nav.push(CreateTripPage);
  }
  PlacesVisited(trip:Trip) {
    this.nav.push(PlacesVisitedPage, {
      trip: trip
    });
  }

}
