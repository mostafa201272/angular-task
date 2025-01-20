import { Component } from '@angular/core';
import { ProfileComponent } from '../../../layouts/components/profile/profile.component';
import { AppBase } from '../../base/app-base-component';
import { TranslateModule } from '@ngx-translate/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'admin-navbar',
  standalone: true,
  imports: [ProfileComponent, TranslateModule, InputTextModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.scss'
})
export class AdminNavbarComponent extends AppBase{
  switchLanguage(){
    this.languageService.setLanguage(this.currentLang === "ar"? 'en': 'ar')
  }
}
