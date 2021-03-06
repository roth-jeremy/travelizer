import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddPlacePage } from '../add-place/add-place';
import { Nav } from 'ionic-angular';
import { latLng, MapOptions, marker, Marker, tileLayer } from 'leaflet';
import { Trip } from '../../models/trip';
import { Place } from '../../models/place';
import { HttpClient } from '@angular/common/http';
import { PlaceRequest, GeoJsonPoint } from '../../models/place-request';
import { EditPlacePage } from '../edit-place/edit-place';


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
  mapOptions: MapOptions;
  mapMarkers: Marker[];

  trip : Trip;
  places : Place[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private  nav:Nav, private http: HttpClient) {
    const tileLayerUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tileLayerOptions = { maxZoom: 18 };
    this.mapOptions = {
      layers: [
        tileLayer(tileLayerUrl, tileLayerOptions)
      ],
      zoom: 13,
      center: latLng(46.778186, 6.641524)
    };
    this.mapMarkers = [
      /*marker([ 46.778186, 6.641524 ]).bindTooltip("Test Label",{
        permanent: true, 
        direction: 'left'
    }).bindPopup('<b>Hello world!</b><br>I am a popup.<img src="" alt =""/>').openPopup(),
      marker([ 46.780796, 6.647395 ]),
      marker([ 46.784992, 6.652267 ])*/
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacesVisitedPage');
    this.trip = this.navParams.get('trip');
  }

  ionViewDidEnter() {
    this.listPlaces(this.trip);
    
  }
  
  AddPlace(trip: Trip) {
    this.nav.push(AddPlacePage, {
      trip: trip
    });
  }

  listPlaces(trip: Trip) {
    let placesURL = 'https://comem-appmob-2018-2019-d.herokuapp.com/api/places';

    this.http.get<Place[]>(placesURL, {
      params:{
        trip: trip.id
      }
    }).subscribe(placesList => {
      this.places = placesList;
      if(this.places.length > 0) this.populateMap();
    });
  }

  
  populateMap() {
    var loca = JSON.stringify(this.places[0].location);
    loca = loca.replace('{"coordinates":[', '');
    loca = loca.replace('],"type":"Point"}', '');
    var res = loca.split(",");
    var p1 = parseFloat(res[0]);
    var p2 = parseFloat(res[1]);
    console.log(this.places[0]);
    console.log(p1);
    console.log(p2);
    this.mapMarkers = [marker([p2, p1]).bindTooltip(this.places[0].name, {
      permanent: true,
      direction: 'left'
    }).bindPopup('<b>' + this.places[0].name + '</b><br>' + this.places[0].description + '.<img src="' + this.places[0].pictureUrl + '" alt =""/>').openPopup()];
  }

  editPlace(place:Place) {
    this.navCtrl.push(EditPlacePage, {
      place: place
    });
  }
}
