import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { MessageService } from 'primeng/api';

import { routes } from './app.routes';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { HttpBackend } from '@angular/common/http';
import {
  provideAnimations,
  provideNoopAnimations,
} from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DatePipe } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { AuthTokenInterceptor } from './core/interceptors/auth-token.interceptor';

export function HttpLoaderFactory(httpBackend: HttpBackend) {
  return new MultiTranslateHttpLoader(httpBackend, [
    '/assets/i18n/common/',
    '/assets/i18n/modules/visitors/home/',
    '/assets/i18n/modules/admin/menu/',
    '/assets/i18n/modules/admin/visitors/',
  ]);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideAnimations(),
    provideNoopAnimations(),
    provideHttpClient(withInterceptors([AuthTokenInterceptor])),
    DatePipe,
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpBackend],
        },
      })
    ),
    MessageService,
    DialogService
  ],
};
