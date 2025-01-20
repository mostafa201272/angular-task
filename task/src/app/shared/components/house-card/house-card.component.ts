import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';
import { PropertyDto } from './property.interface';
import { GalleriaModule } from 'primeng/galleria';
import { AppBase } from '../../base/app-base-component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'house-card',
  standalone: true,
  imports: [CommonModule, RouterLink, GalleriaModule, TranslateModule],
  templateUrl: './house-card.component.html',
  styleUrl: './house-card.component.scss',
})
export class HouseCardComponent extends AppBase{
  // INPUTs
  @Input('property') property!: PropertyDto;
}
