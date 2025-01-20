import { Component, HostListener, Input } from '@angular/core';
import { ProfileComponent } from '../../../layouts/components/profile/profile.component';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { AppBase } from '../../base/app-base-component';
import { IsRtlDirective } from '../../directives';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    ProfileComponent,
    InlineSVGModule,
    TranslateModule,
    SidebarModule,
    IsRtlDirective
  ],
  providers: [
    IsRtlDirective
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent extends AppBase {
  // INPUTs
  @Input() coloredNavbar: boolean = false;

  // FLAGs
  coloredNavBar: boolean = this.coloredNavbar;
  showSideMenu: boolean = false
  navBarScrolled: boolean = false

  constructor(private isRtlDirective: IsRtlDirective){
    super()
    this.checkTheNavbarPosition()
  }

  displaySideMenu(){
    this.showSideMenu = true
  }

  switchLanguage(){
    this.languageService.setLanguage(this.currentLang === "ar"? 'en': 'ar')
  }

  isRtl(){
    return this.isRtlDirective.isRtl()
  }

  @HostListener('window:scroll', [])
  checkTheNavbarPosition(){
    this.navBarScrolled = window.scrollY > 100
  }
}
