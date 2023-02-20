import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
    // To set the item storing the local storage
  public setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  // To get the item from the local storage
  public getItem(key: string){ 
    return localStorage.getItem(key)
  }

  // To remove the item from the local storage
  public removeItem(key:string) {
    localStorage.removeItem(key);
  }

  // To clear the local storage
  public clear(){
    localStorage.clear(); 
  }

}
