import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-permission-denied-page",
  template: "<div></div>",
})
export class PermissionDeniedPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    window.location.href = "/permission-error.html";
  }
}
