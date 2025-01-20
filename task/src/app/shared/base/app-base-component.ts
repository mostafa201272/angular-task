import { DatePipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { StorageService } from 'src/app/core/services/storage.service';
import {
  GLOBAL_TABLE_TIME_FORMATE,
  REGEX_FORMATS,
} from 'src/utilities/pre-defines';
import { MODULES_ROUTES } from 'src/utilities/routers';
import * as XLSX from 'xlsx';

@Component({
  template: '',
  providers: [DialogService]
})
export abstract class AppBase implements OnDestroy {
  // DEPENDENCE
  translateService = inject(TranslateService);
  httpService = inject(HttpService);
  formBuilder = inject(FormBuilder);
  languageService = inject(LanguageService);
  datePipe = inject(DatePipe);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  messageService = inject(MessageService);
  dialogService = inject(DialogService);
  storageService = inject(StorageService);

  // SUBSCRIPTION HANDLER
  protected unsubscribeAll: Subject<void> = new Subject<void>();

  // LANGUAGE
  currentLang: string = this.languageService.getCurrentLang();

  // MODULES ROUTERS HOLDER
  protected MODULES_ROUTERS = MODULES_ROUTES;

  // REGEX HOLDER
  REGEX = REGEX_FORMATS;

  // FOR FORMS
  isSubmit = false;
  form!: FormGroup;

  constructor() {
    this.translateService.onLangChange
      .pipe(this.takeUntilDestroyed())
      .subscribe({
        next: (currentLang: any) => {
          this.currentLang = currentLang.lang;
          this.refresh();
        }
      });
  }

  // REFRESH
  refresh(): void {}

  // LOAD FORM CONTROLS
  loadForm(controls: { [key: string]: any }): void {
    this.form = this.formBuilder.group(controls);
  }

  // GET FORM CONTROL
  getFormControl(
    controlName: string,
    form: FormGroup = this.form
  ): AbstractControl | null {
    return form.get(controlName);
  }

  // REMOVE FORM CONTROL
  removeFormControl(controlName: string, form: FormGroup = this.form): void {
    form.removeControl(controlName);
  }

  // GET FORM GROUP
  getFormGroup(groupName: string, form: FormGroup = this.form): FormGroup {
    return form.get(groupName) as FormGroup;
  }

  // ON SUBMIT FORM
  onSubmit(): void {}

  /**
   * Transforms a date string into a formatted date and time string using the Angular DatePipe.
   *
   * @param {string} date - The date string to be transformed.
   * @returns {string} The transformed date and time string.
   */
  transformTableDate(date: string): string {
    return this.datePipe.transform(date, GLOBAL_TABLE_TIME_FORMATE) || date;
  }

  /**
   * TRANSFORM DATE TO CUSTOM FORMATE
   * @param date
   * @param formate
   * @returns
   */
  transformDate(date: string, formate: string) {
    return this.datePipe.transform(date, formate);
  }

  /**
   * GENERATE HIJRI DATE
   *
   * @param {any} date - The date string to be transformed.
   * @returns {string} The transformed date and time string.
   */
  generateHijriDate(date: any): string {
    return date
      ? `${date?.toString().slice(6, 8)}/${date?.toString().slice(4, 6)}/${date?.toString().slice(0, 4)}`
      : '';
  }

  /**
   * RETURN OBJECT WITHOUT NULLABLE DATA
   * @param data
   * @returns
   */
  objectFilledKeys(data: any) {
    return Object.entries(data)
      .filter(
        ([key, value]) => value !== null && value !== undefined && value !== ''
      )
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  }

  /**
   * Checks if all provided objects are equal by comparing their keys and values.
   * If only one object is provided, it returns true.
   *
   * @param {...{ [key: string]: any }} objects - The objects to compare.
   * @returns {boolean} - Returns true if all objects are equal, false otherwise.
   */
  checkObjectsEqual(...objects: { [key: string]: any }[]): boolean {
    // ONE OBJECT DETECTED
    if (objects.length < 2) {
      return true;
    }

    // SPREAD THE OBJECTS AND GET THE FIRST OBJECT
    const [firstObject, ...restObjects] = objects;

    // HELPER METHOD TO COMPARE TWO OBJECTS
    const compareTwoObjects = (
      obj1: { [key: string]: any },
      obj2: { [key: string]: any }
    ): boolean => {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      // CHECK THE NUMBER OF KEYS IS DIFFERENT
      if (keys1.length !== keys2.length) {
        return false;
      }

      // CHECK THE VALUES OF KEYS ARE EQUAL OR NOT.
      for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }

      // ALL KEYS ARE EQUAL AND ALL VALUES ARE EQUAL, SO THE OBJECTS ARE EQUAL.
      return true;
    };

    // COMPARE 1ST OBJECT WITH ALL OBJECTS
    for (const obj of restObjects) {
      if (!compareTwoObjects(firstObject, obj)) {
        return false;
      }
    }

    // ALL OBJECTS ARE EQUAL
    return true;
  }

  /**
   * DEEP CLONE
   * @param array
   * @returns
   */
  deepClone<T>(array: T[]): T[] {
    return JSON.parse(JSON.stringify(array));
  }

   
  /**
   * CREATE AND DOWNLOAD EXCEL FILE
   */
  createAndDownloadExcelFile(
    data: any,
    sheet_name = 'sheet',
    file_name = 'book.xlsx'
  ) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheet_name);
    XLSX.writeFile(workbook, file_name);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  // OPERATOR TO UNSUBSCRIBE FROM OBSERVABLE WHEN COMPONENT IS DESTROYED
  protected takeUntilDestroyed(): ReturnType<typeof takeUntil> {
    return takeUntil(this.unsubscribeAll);
  }
}
