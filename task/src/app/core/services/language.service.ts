import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';
import { LANGUAGES, DEFAULT_LANGUAGE } from '../../../utilities/pre-defines';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  constructor(
    private _translateService: TranslateService,
    private _storageService: StorageService
  ) {}

  /**
   * Initializes the language settings for the application.
   * This function sets the default language, adds supported languages,
   * and determines the user's preferred language based on their browser settings or stored preference.
   *
   * @remarks
   * The function uses the _translateService from ngx-translate/core to manage translations.
   * It also relies on the StorageService to store and retrieve the user's preferred language.
   *
   * @returns {void}
   */
  initLang() {
    let browserLang;
    this._translateService.addLangs(LANGUAGES);
    if (this._storageService.getStorage('lang')) {
      browserLang = this._storageService.getStorage('lang');
    } else {
      this.setLanguage(DEFAULT_LANGUAGE);
      browserLang = this._translateService.getBrowserLang();
    }
    this._translateService.use(
      browserLang.match(/en|ar/) ? browserLang : DEFAULT_LANGUAGE
    );
    this._translateService.setDefaultLang(DEFAULT_LANGUAGE);

    // SET DOCUMENT DIRECTION
    document.documentElement.setAttribute(
      'dir',
      this._storageService.getStorage('lang') !== DEFAULT_LANGUAGE ? 'rtl' : 'ltr'
    );
  }

  setLanguage(lang: string) {
    this._translateService.use(lang);
    this._storageService.setStorage('lang', lang);
    
    // SET DOCUMENT DIRECTION
    document.documentElement.setAttribute(
      'dir',
      lang !== DEFAULT_LANGUAGE ? 'rtl' : 'ltr'
    );

  }

  /**
   * GET THE CURRENT LANGUAGE
   * @returns
   */
  getCurrentLang() {
    return this._translateService.currentLang;
  }

  /**
   * GET TRANSLATION VALUE WRAPPER
   * @param value
   * @returns
   */
  getTransValue(value: string) {
    return this._translateService.instant(value);
  }
}
