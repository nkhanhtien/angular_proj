import { Route } from "@angular/router";
export interface ClientRoute extends Route {
  name: string;
  mainNav?: boolean;
  children?: ClientRoute[];
  parent?: string;
}

export declare type ClientRouterConfig = ClientRoute[];
