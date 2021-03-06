import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import {first} from 'rxjs/operators'
interface user {
    username: string,
    uid: string
}

@Injectable()
export class UserService {
    private user: user

    constructor(
        private afAuth: AngularFireAuth
    ) {

    }

    setUser(user: user) {
        this.user = user
    }
    getUsername():string{
        return this.user.username
    }
    async isAuthenticated(){
        if(this.user) return true

        const user = await this.afAuth.authState.pipe(first()).toPromise()
        if(user){
            this.setUser({
                username: user.email.split('@')[0],
                uid: user.uid
            })
            return true
        }
        return false
    }
    getUID():string {
        // if (!this.user) {
        //     if (this.afAuth.auth.currentUser) {
        //         const user = this.afAuth.auth.currentUser
        //         this.setUser({
        //             username: user.email.split('@')[0],
        //             uid: user.uid
        //         })
        //         return user.uid
        //     }
        //     else {
        //         throw new Error("User not logged in")

        //     }
        // }
        // else {
        //     return this.user.uid

        // }

        return this.user.uid
    }
}