import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userPosts

  constructor(private afstore: AngularFirestore, private user: UserService, private router: Router) {
    const posts = afstore.doc(`users/${user.getUID()}`)
    this.userPosts = posts.valueChanges()
  }

  ngOnInit() {
  }

  goTo(postID: string) {
    this.router.navigate(['/tabs/post/' + postID])
  }
}
