import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MyTripsPage } from '../pages/my-trips/my-trips';
import { SearchTripPage } from '../pages/search-trip/search-trip';
import { HelpPage } from '../pages/help/help';
import { SettingsPage } from '../pages/settings/settings';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(
    private auth: AuthProvider, 
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,  
    ) {

    this.initializeApp();

    this.auth.isAuthenticated().subscribe(authenticated => {
      if (authenticated) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
      
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'HOME', component: HomePage },
      { title: 'MY TRIPS', component: MyTripsPage },
      { title: 'SEARCH FOR A TRIP', component: SearchTripPage },
      { title: 'HELP', component: HelpPage },
      { title: 'SETTINGS', component: SettingsPage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logOut() {
    this.auth.logOut();
  }
}
