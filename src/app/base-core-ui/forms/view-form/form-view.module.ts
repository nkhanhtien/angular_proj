import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { FormViewComponent } from "./form-view.component";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule,
  ],
  declarations: [FormViewComponent],
  exports: [FormViewComponent],
  bootstrap: [FormViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppFormModule_FormView {}
