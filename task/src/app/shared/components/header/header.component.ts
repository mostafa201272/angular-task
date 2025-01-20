import { Component, Input } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavBarComponent, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  // INPUTs
  @Input() coloredNavbar: boolean = false;
  @Input() fullScreen: boolean = false;
  @Input() coloredOverlay: boolean = true;
  @Input() headerBackground: string = "/assets/images/home_header_background.jpg";

}
