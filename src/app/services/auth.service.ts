import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {SnackbarService} from "./snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: BehaviorSubject<firebase.User | null> = new BehaviorSubject<firebase.User | null>(null)
  constructor(
    private ofAuth: AngularFireAuth,
    private router: Router,
    private snackService: SnackbarService,
  ) { }

  async singIn(){
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.ofAuth.signInWithPopup(googleAuthProvider)
      .then((res) => {
        this.user$.next(res.user);
        this.snackService.openSnackBar(`Welcome ${this.user$.value?.displayName}`)
      })
  }

  singOut(){
    this.snackService.openSnackBar(`Good bye ${this.user$.value?.displayName}`)
    this.user$.next(null);
    this.router.navigateByUrl('/login').then(()=> this.ofAuth.signOut());
  }
}
