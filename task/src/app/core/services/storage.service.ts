import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE_PREFIX } from '../../../utilities/pre-defines';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor(private router: Router) {}

  /*
   * Event emitter for listening to changes in local storage.
   * Emits an object containing the key and the new value when an item is added, updated, or removed.
   * */
  listeners: BehaviorSubject<{ [key: string]: any }> = new BehaviorSubject<{
    [key: string]: any;
  }>({});

  /*
   * read certain item from the session storage or from the cachedSession and
   * parse the item to json if the item is a stringified object.
   * @param  {key} The key of the property to be detected
   * @returns {Object} the returned object holds the value for the detected property
   * */
  public getStorage = (key: string) => {
    try {
      return JSON.parse(
        localStorage.getItem(`${LOCAL_STORAGE_PREFIX}.${key}`) as string
      );
    } catch (error) {
      return localStorage.getItem(`${LOCAL_STORAGE_PREFIX}.${key}`);
    }
  };

  /*
   * add/set item to browser local storage
   * @param {key} the identifier for the local storage item
   * @param {value} the value of local storage item
   * */
  public setStorage = (key: string, value: any) => {
    const newKey = `${LOCAL_STORAGE_PREFIX}.${key}`;
    if (!value) return;
    if (typeof value === 'object') {
      localStorage.setItem(newKey, JSON.stringify(value));
    } else {
      localStorage.setItem(newKey, String(value));
    }
    this.listeners.next({
      ...this.listeners.value,
      [newKey]: value,
    });
  };

  /*
   * remove item from browser local storage
   * @param {key} the identifier for the local storage item
   * */
  public removeStorageItem = (key: string) => {
    localStorage.removeItem(`${LOCAL_STORAGE_PREFIX}.${key}`);
  };

  /*
   * clear all the localStorage items and the cachedSession items
   */
  public empty = () => {
    localStorage.clear();
  };
}
