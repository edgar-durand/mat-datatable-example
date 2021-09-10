import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {SnackbarService} from "../services/snackbar.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(
  private ofAuth: AngularFireAuth,
  private snackService: SnackbarService,
  private router: Router,
) {
}
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const user = JSON.parse(<string>localStorage.getItem('user'))?.uid ?
      JSON.parse(<string>localStorage.getItem('user')) :
      await this.ofAuth.currentUser;
    const isAuthenticated = !!user
    if (!isAuthenticated) {
      this.snackService.openSnackBar('You must authenticate first to have access');
      this.router.navigateByUrl('/login');
    }

    return isAuthenticated;
  }

}
