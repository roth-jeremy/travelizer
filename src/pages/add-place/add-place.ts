import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { QimgImage } from '../../models/qimg-image';
import { PictureProvider } from '../../providers/picture/picture';

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
  pictureData: string;
  picture: QimgImage;
  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, private geolocation: Geolocation, private pictureService: PictureProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPlacePage');
  }

  takePicture() {
    this.pictureService.takeAndUploadPicture().subscribe(picture => {
      this.picture = picture;
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
      console.log(`User is at ${coords.longitude}, ${coords.latitude}`);
    }).catch(err => {
      console.warn(`Could not retrieve user position because: ${err.message}`);
    });
  }

}
