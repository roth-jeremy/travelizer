import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, ToastController, ToastOptions } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { QimgImage } from '../../models/qimg-image';
import { PictureProvider } from '../../providers/picture/picture';
import { PlaceRequest, GeoJsonPoint } from '../../models/place-request';
import { AuthRequest } from '../../models/auth-request';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Place } from '../../models/place';
import { PlacesVisitedPage } from '../places-visited/places-visited';

/**
 * Generated class for the AddPlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html',
})
export class AddPlacePage {

  placeInfo: PlaceRequest;

  pictureData: string;
  picture: QimgImage;

  /**
   * This authentication request object will be updated when the user
   * edits the login form. It will then be sent to the API.
   */
  authRequest: AuthRequest;

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the name or password is incorrect).
   */
  placeCreationError: boolean;

  locationAdded: boolean;

  /**
   * The angular form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private geolocation: Geolocation, private pictureService: PictureProvider, private http: HttpClient, public PlaceEvent: Events, public toastCtrl: ToastController) {
    this.placeInfo = new PlaceRequest();
    this.locationAdded = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
    this.placeInfo.tripId = this.navParams.get("trip").id;
  }

  savePlace($event) {
    // Prevent default HTML form behaviour 
    $event.preventDefault();

    // Don't do anything if the form is invalid
    if (this.form.invalid) {
      return;
    }

    // Hide previous error messages
    this.placeCreationError = false;

    let placeUrl = "https://comem-appmob-2018-2019-d.herokuapp.com/api/places";

    // create a POST request
    // when a place is created, redirect to the user's placelist screen with success message (created sucessfully)

    this.http.post<Place>(placeUrl, this.placeInfo).subscribe(createdPlace => {
      this.PlaceEvent.publish('newPlace', true);
      this.notify("Place added successfully");
      this.navCtrl.pop();
    }, err => {
      console.log(err);
      this.placeCreationError = true;
      this.notify("Place creation failed");
      console.warn(`Place creation failed: ${err.message}`);
    })

  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
      this.placeInfo.pictureUrl = this.picture.url;
      console.log(`Picture url saved ${this.placeInfo.pictureUrl}`);
    }, err => {
      this.notify("Could not take picture");
      console.warn('Could not take picture', err);
    });
    /*const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then(pictureData => {
      this.pictureData = pictureData;
    }).catch(err => {
      console.warn(`Could not take picture because: ${err.message}`);
    });*/
  }

  notify(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
    }).present();
  }
}
