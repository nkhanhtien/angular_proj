import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AutoCompleteTextBoxComponent } from "./auto-complete-text-box.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  declarations: [AutoCompleteTextBoxComponent],
  exports: [AutoCompleteTextBoxComponent],
  bootstrap: [AutoCompleteTextBoxComponent],
})
export class AppControlModule_AutoCompleteTextBoxControl {}
