import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private  nav:Nav, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTripsPage');
    this.listTrips();
  }
  

  listTrips() {
    let tripsURL = config.apiUrl+'api/trips';

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
