import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyTripsPage } from '../pages/my-trips/my-trips';
import { SearchTripPage } from '../pages/search-trip/search-trip';
import { HelpPage } from '../pages/help/help';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthProvider } from '../providers/auth/auth';
import { AddPlacePage } from '../pages/add-place/add-place';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { PlacesVisitedPage } from '../pages/places-visited/places-visited';
import { CreateTripPage } from '../pages/create-trip/create-trip';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CreateUserPage } from '../pages/create-user/create-user';
import { AuthInterceptorProvider } from '../providers/auth-interceptor/auth-interceptor';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MyTripsPage,
    SearchTripPage,
    HelpPage,
    SettingsPage,
    LoginPage,
    AddPlacePage,
    PlacesVisitedPage,
    CreateTripPage,
    CreateUserPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    LeafletModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MyTripsPage,
    SearchTripPage,
    HelpPage,
    SettingsPage,
    LoginPage,
    AddPlacePage,
    PlacesVisitedPage,
    CreateTripPage,
    CreateUserPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorProvider, multi: true }
  ]
})

export class AppModule {}
