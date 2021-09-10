import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  destroyed$: Subject<boolean> = new Subject<boolean>();
  constructor(private authService: AuthService, private router: Router) { }


  async ngOnInit(): Promise<void> {
    this.authService.user$.pipe(
      takeUntil(this.destroyed$)
    ).subscribe((user) => {
      if (user)
        this.router.navigateByUrl('/posts')
    })
  }

  async singIn(): Promise<void>{
    this.authService.singIn();
  }

  async singOut(): Promise<void>{
    this.authService.singOut();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(false);
    this.destroyed$.unsubscribe();
  }

}
