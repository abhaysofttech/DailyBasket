import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore'

import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string = "";
  password: string = "";
  cpassword: string = "";
  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public afstore: AngularFirestore,
    public user: UserService
  ) { }

  ngOnInit() {
  }

  async register() {
    const { username, password, cpassword } = this

    if (password !== cpassword) {
      this.showAlert("Error!", "Password doesn't match");
      return console.error("Password not match")
    }
    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(username + '@gmail.com', password)
      console.log(res);

      this.afstore.doc(`users/${res.user.uid}`).set({
        username
      })
      this.user.setUser({
        username,
        uid:res.user.uid
      })

      this.showAlert("Success!", "Welcome to Daily Basket!!!....");
      this.router.navigate(['/tabs']);
    }
    catch (error) {
      console.dir(error);
      this.showAlert("Error!", error.message);
    }

  }

  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    })
    await alert.present()
  }

}
