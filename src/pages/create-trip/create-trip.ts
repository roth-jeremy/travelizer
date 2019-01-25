import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, ToastController, ToastOptions } from 'ionic-angular';
import { TripRequest } from '../../models/trip-request';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../../models/trip';
import { MyTripsPage } from '../my-trips/my-trips';
import { AuthProvider } from '../../providers/auth/auth';
import { AuthRequest } from '../../models/auth-request';

/**
 * Generated class for the CreateTripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-trip',
  templateUrl: 'create-trip.html',
})
export class CreateTripPage {

  tripInfo: TripRequest;

  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  tripCreationError: boolean;

  /**
   * The angular form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  constructor(private auth: AuthProvider, public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public TripEvent: Events, public toastCtrl: ToastController) {
    this.tripInfo = new TripRequest();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateTripPage');
  }

  saveTrip($event) {
    // Prevent default HTML form behaviour 
    $event.preventDefault();

    // Don't do anything if the form is invalid
    if (this.form.invalid) {
      return;
    }

    // Hide previous error messages
    this.tripCreationError = false;

    let tripUrl = "https://comem-appmob-2018-2019-d.herokuapp.com/api/trips";

    // create a POST request
    // when a trip is created, redirect to the user's trips screen with success message (created sucessfully)

    this.http.post<Trip>(tripUrl, this.tripInfo).subscribe(createdTrip => {
      this.TripEvent.publish('newTrip', true);
<<<<<<< HEAD
      this.notify("Trip created successfully");
      this.navCtrl.pop();
=======
      this.navCtrl.pop;
>>>>>>> b9ed77b17cb377d34acbee2b8506071afdaf1b5d
    }, err => {
      console.log(err);
      this.tripCreationError = true;
      this.notify("Trip creation failed")
      console.warn(`Trip creation failed: ${err.message}`);
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
