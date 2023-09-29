import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthErrorInterceptor, AuthJwtInterceptor } from "./auth-interceptor";

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthJwtInterceptor, multi: true },
];
