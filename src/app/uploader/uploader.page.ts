import { Component, OnInit, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../user.service';
import { firestore } from 'firebase/app';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  imageURL: string
  desc: string
  busy: boolean = false
  @ViewChild('fileButton') fileButton

  constructor(
    public http: Http,
    public afstore: AngularFirestore,
    public user: UserService,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
  }
  
 async createPost() {
    this.busy = true
    const image = this.imageURL
    const desc = this.desc


    /// Update is used to update document
    this.afstore.doc(`users/${this.user.getUID()}`).update({
      posts: firestore.FieldValue.arrayUnion(image)
    })
      .then(function () {
        console.log("Document successfully updated!");
      })
      .catch(function (err) {
        console.dir(err)
      });
      
      this.afstore.doc(`posts/${image}`).set({
        desc,
        author: this.user.getUsername(),
        likes:[]
      })
      this.busy = false
      this.imageURL = ""
      this.desc=""

      const alert = await this.alertController.create({
        header:'Done',
        message: 'Your post was created!',
        buttons:['Cool!']
      })

      await alert.present()

      this.router.navigate(['/tabs/feed'])
  }

  uploadFile(){
    this.fileButton.nativeElement.click()
  }


  fileChanges(event) {
    this.busy = true
    const files = event.target.files

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE', '1')
    data.append('UPLOADCARE_PUB_KEY', '272075d6f2ad22070b4b')

    this.http.post('https://upload.uploadcare.com/base/', data)
      .subscribe(event => {
        this.imageURL = event.json().file
        this.busy = false
      })
  }
}
//272075d6f2ad22070b4b