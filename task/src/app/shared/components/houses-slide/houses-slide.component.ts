import { Component, HostListener, Input } from '@angular/core';
import { CarouselModule, CarouselResponsiveOptions } from 'primeng/carousel';
import { AppBase } from '../../base/app-base-component';
import { LangChangeEvent } from '@ngx-translate/core';
import { HouseCardComponent } from '../house-card/house-card.component';

@Component({
  selector: 'property-slide',
  standalone: true,
  imports: [CarouselModule, HouseCardComponent],
  templateUrl: './houses-slide.component.html',
  styleUrl: './houses-slide.component.scss',
})
export class PropertySlideComponent extends AppBase {
  @Input('property') property!: any;
  @Input('displayedCards') numOfVisibleCards: number = 4;

  // HOLDERS
  propertyCards: any[] = this.property;

  // CONFIGURATIONS
  showNavigators: boolean = true;
  showIndicators: boolean = false;
  startPage: number = 0;
  responsiveOptions: CarouselResponsiveOptions[] | undefined;

  /**
   * RETURN NUMBER OF CARDS
   * @param n NUMBER OF CARD
   * @returns
   */
  setIndicators(n: number) {
    return this.numOfVisibleCards > n ? n : this.numOfVisibleCards;
  }

  ngOnInit(): void {
    this.propertyCards = [...this.property];
    this.translateService.onLangChange.subscribe(
      (language: LangChangeEvent) => {
        const slider = [...this.property];
        this.currentLang = language.lang;
        if (language.lang === 'en') {
          this.startPage = 0;
          this.propertyCards = slider;
        } else {
          this.startPage = slider?.length - this.numOfVisibleCards;
          this.propertyCards = slider?.reverse();
        }
      }
    );

    // RESET THE CONFIGs
    if (this.currentLang === 'ar') {
      const slider = [...this.property];
      this.startPage = slider?.length - this.numOfVisibleCards;
      this.propertyCards = slider?.reverse();
    }

    this.responsiveOptions = [
      {
        breakpoint: '1366px',
        numVisible: this.setIndicators(4),
        numScroll: 1,
      },
      {
        breakpoint: '1280px',
        numVisible: this.setIndicators(3),
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: this.setIndicators(2),
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: this.setIndicators(2),
        numScroll: 1,
      },
      {
        breakpoint: '450px',
        numVisible: this.setIndicators(1),
        numScroll: 1,
      },
    ];
  }

  displayIndicators(n: number) {
    return this.property?.length > this.numOfVisibleCards
      ? true
      : this.numOfVisibleCards > n
      ? this.numOfVisibleCards == n
        ? false
        : true
      : false;
  }

    // TRACK WINDOW SIZE
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.toggleIndicators(event.target.innerWidth);
    }
  
    /**
     * TOGGLE INDICATORS DEPEND ON WINDOW WIDTH
     * @param width CURRENT WINDOW WIDTH
     */
    toggleIndicators(width: number) {
      this.showIndicators =
        width >= 1366
          ? this.displayIndicators(4)
          : width >= 1280
            ? this.displayIndicators(3)
            : width >= 991
              ? this.displayIndicators(2)
              : width >= 767
                ? this.displayIndicators(1)
                : true;
    }
}
