import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ctr-loading-page',
  templateUrl: './loading-page.component.html',
})
export class LoadingPageComponent {
  @Input() Height = '90vh';
  @Input() Width = '90vw';
  constructor() {}
}
