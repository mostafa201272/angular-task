import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/services/http.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AUTH_ROUTES } from 'src/utilities/apis-endpoints/auth-routes';
import { StorageService } from 'src/app/core/services/storage.service';
import { TOKEN } from 'src/utilities/pre-defines';
import { Router } from '@angular/router';
import { MODULES_ROUTES } from 'src/utilities/routers';
import { ROLES_REDIRECTION } from '../enums/roles-redirection';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // AUTHENTICATION USER
  private user: BehaviorSubject<any> = new BehaviorSubject(null);
  private token: string | null = null;
  private isLoggedIn : BehaviorSubject<boolean> = new BehaviorSubject(false);
  private triggerURL !: string

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
  ) {
    this.loginUser()
    this.triggerURL = location.pathname
  }

  loginUser(): void{
    this.token = this.getToken()
    if(this.token){
      this.loadUserData()
    }
  }

  setToken(token: string): void {
    if(token){
      this.token = token;
      this.storageService.setStorage(TOKEN, token);
      this.loadUserData();
    }
  }

  getToken(): string | null {
    return this.token || this.storageService.getStorage(TOKEN);
  }

  getUser(): Observable<any> {
    return this.user.asObservable();
  }

  loadUserData(): void {
    this.httpService.getData(AUTH_ROUTES.PROFILE).subscribe({
      next: (data: any) => {
        this.user.next(data);
        this.isLoggedIn.next(true);
        this.redirectUser(data?.role)
      },
    });
  }

  redirectUser(role: keyof typeof ROLES_REDIRECTION){
    if(this.triggerURL === MODULES_ROUTES.auth.login.route){
      this.router.navigate([ROLES_REDIRECTION[role]]);
    }else{
      this.router.navigate([this.triggerURL]);
    }
  }

  logout(): void {
    this.user.next(null);
    this.isLoggedIn.next(false);
    this.token = null
    this.storageService.removeStorageItem(TOKEN);
    this.triggerURL = MODULES_ROUTES.visitors.route;
    this.router.navigate([MODULES_ROUTES.visitors.route]);
  }

  checkLoggedIn(): Observable<any> {
    return this.isLoggedIn.asObservable();
  }
}
