import { Component, Input } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule, AsyncPipe],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {

  constructor(private translationService: TranslateService) {}

  // BREADCRUMB ITEMS
  @Input() items: MenuItem[] = [];
  @Input() root !: string;

  // TRANSLATION
  breadcrumbItems$ = new BehaviorSubject<MenuItem[]>([]);

  // ROOT POINT
  breadCrumbRoot: MenuItem | undefined;

  ngOnInit() {
    // SET ROOT POINT TO HOME
    this.breadCrumbRoot = {
      icon: PrimeIcons.HOME,
      routerLink: this.root || '/',
      title: this.translationService.instant('home')
    };

    // DETECT LANGUAGE CHANGES
    this.translationService.onLangChange.subscribe(() => {
      this.updateBreadcrumb();
    });

    // SET INIT. VALUES
    this.updateBreadcrumb();
  }

  private updateBreadcrumb(): void {
    // RE-TRANSLATE VALUES
    const translatedItems = this.items.map((item) => ({
      ...item,
      label: this.translationService.instant(`admin.menu.${item?.label}` || ''),
      title: item?.title
        ? this.translationService.instant(`admin.menu.${item?.title}` || '')
        : this.translationService.instant(`admin.menu.${item?.label}` || '')
    }));
    this.breadcrumbItems$.next(translatedItems);
  }
}
