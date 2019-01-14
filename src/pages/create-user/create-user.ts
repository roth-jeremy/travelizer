import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import {NgForm} from '@angular/forms';

import { AuthRequest } from '../../models/auth-request';
import {RegisterRequest} from "../../models/register-request";
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CreateUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-user',
  templateUrl: 'create-user.html',
})

  
export class CreateUserPage {

  /**
   * If true, it means that the register API has return a failed response
   * (probably because the name or password is invalid).
   */
  registerError: boolean;

  /**
   * If true, the username with which the user is trying to register 
   * already exists
   */
  nameExists: boolean;

  registerCredentials: RegisterRequest;

  /**
   * The login form.
   */
  @ViewChild(NgForm)
  form: NgForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, public RegisterEvent: Events) {
    this.registerCredentials = new RegisterRequest();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateUserPage');
  }

  register($event) {
    // Prevent default HTML form behaviour 
    $event.preventDefault();

    // Don't do anything if the form is invalid
    if (this.form.invalid) {
      return;
    }

    // Hide any previous error message
    this.registerError = false;
    this.nameExists = false;

    let userUrl = "https://comem-appmob-2018-2019-d.herokuapp.com/api/users";

    // create a POST request
    // when a user is created, redirect to login screen with success message (created sucessfully)

    this.http.post<User>(userUrl, this.registerCredentials).subscribe(createdUser => {
      this.RegisterEvent.publish('registration', true);
      this.navCtrl.push(LoginPage, {user: createdUser});
    }, err => {
      console.log(err);
      if (err.error.errors.name.kind == "unique") {
        this.nameExists = true;
      }
      this.registerError = true;
      console.warn(`Registration failed: ${err.message}`);
    })
  }

}
