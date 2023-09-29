import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  constructor() {}

  saveSession(key: string, value: any) {
    sessionStorage.setItem(key, value.toString());
  }

  getSession(key: string) {
    return sessionStorage.getItem(key);
  }

  removeSession(key: string) {
    sessionStorage.removeItem(key);
  }
}
