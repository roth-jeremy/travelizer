import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Nav } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private  nav:Nav) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesVisitedPage');
  }

  AddPlace() {
    this.nav.push(AddPlacePage);
  }
}
