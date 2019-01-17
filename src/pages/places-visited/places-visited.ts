import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Nav } from 'ionic-angular';
import { Trip } from '../../models/trip';


/**
 * Generated class for the PlacesVisitedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-places-visited',
  templateUrl: 'places-visited.html',
})
export class PlacesVisitedPage {

  trip : Trip;

  constructor(public navCtrl: NavController, public navParams: NavParams, private  nav:Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesVisitedPage');
    this.trip = this.navParams.get('trip');
  }

  AddPlace() {
    this.nav.push(AddPlacePage);
  }
}
