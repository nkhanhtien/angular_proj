import { Component, OnInit } from "@angular/core";
@Component({
  selector: "app-not-found-page",
  template: "<div></div>",
})
export class NotFoundPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    window.location.href = "/not-found.html";
  }
}
