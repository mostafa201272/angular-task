import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { NgClass, NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AppBase } from 'src/app/shared/base/app-base-component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AvatarModule, ButtonModule, OverlayPanelModule, NgClass, NgIf, RouterLink, RouterLinkActive, AsyncPipe, TranslateModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends AppBase{
  // BASE TRANSLATION POINT
  baseTranslationPoint: string = 'profile.';

  // INPUTS
  @Input() coloredNavbar: boolean = false;
  @Input() showHome: boolean = false;

  
  // AUTHENTICATION
  isLoggedIn$ !: Observable<boolean>
  user$!: Observable<any>;

  constructor(private authService: AuthService){
    super();
    this.isLoggedIn$ = this.authService.checkLoggedIn();
    this.isLoggedIn$
    .pipe(this.takeUntilDestroyed())
    .subscribe({
      next: (data: any) => {
        if(data){
          this.user$ = this.authService.getUser();
        }
      }
    })
  }

  navigateToProfile(){
    this.router.navigate(['/administration/super-admin']);
  }

  logout(){
    this.authService.logout();
  }

}
