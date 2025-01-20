import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-visitors-layout',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, ToastModule],
  templateUrl: './visitors-layout.component.html',
  styleUrl: './visitors-layout.component.scss'
})
export class VisitorsLayoutComponent {

}
