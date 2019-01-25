import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, ToastOptions } from 'ionic-angular';
import { Place } from '../../models/place';
import { HttpClient } from '@angular/common/http';
import { config } from '../../app/config';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { QimgImage } from '../../models/qimg-image';
import { PictureProvider } from '../../providers/picture/picture';
import { PlaceRequest, GeoJsonPoint } from '../../models/place-request';



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

  placeInfo: PlaceRequest;
  pictureData: string;
  picture: QimgImage;
  /**
   * The trips API url
   */
  apiUrl = config.apiUrl+'api/places/';

  /**
   * If true, it means that the authentication API has return a failed response
   * (probably because the ressource is incorrect).
   */
  placeUpdateError: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private geolocation: Geolocation, private camera: Camera, private pictureService: PictureProvider, public toastCtrl: ToastController) {
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

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
      this.placeInfo.pictureUrl = this.picture.url;
      console.log(`Picture url saved ${this.placeInfo.pictureUrl}`);
    }, err => {
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

  addLocation() {
    const geolocationPromise = this.geolocation.getCurrentPosition();
    geolocationPromise.then(position => {
      const coords = position.coords;
      this.placeInfo.location = new GeoJsonPoint();
      this.placeInfo.location.type = "Point";
      this.placeInfo.location.coordinates = [coords.longitude, coords.latitude];
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);

    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
  }
}
