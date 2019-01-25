import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../../models/trip';
import { config } from '../../app/config';
import { PlacesVisitedPage } from '../places-visited/places-visited';

/**
 * Generated class for the SearchTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search-trip',
  templateUrl: 'search-trip.html',
})
export class SearchTripPage {

  /**
   * The trips table
   */
  trips : Trip[];
  searchtext : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchTripPage');
  }

  listTrips() {
    let tripsURL = config.apiUrl+'api/trips';

    this.http.get<Trip[]>(tripsURL, {
      params:{
        search : this.searchtext
      }
    }).subscribe(tripsList => {
      this.trips = tripsList;
    });
  }

  PlacesVisited(trip:Trip) {
    this.navCtrl.push(PlacesVisitedPage, {
      trip: trip
    });
  }
}
