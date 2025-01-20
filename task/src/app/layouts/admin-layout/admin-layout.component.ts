import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminSidebarComponent } from 'src/app/shared/components/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from 'src/app/shared/components/admin-navbar/admin-navbar.component';
import { NgClass } from '@angular/common';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, AdminSidebarComponent, AdminNavbarComponent, NgClass, ToastModule],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

  // FLAGs
  isMenuOpened = true;
  

  toggleMenuEvent(event: boolean){
    this.isMenuOpened = event
  }

}
