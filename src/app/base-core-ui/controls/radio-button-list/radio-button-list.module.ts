import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatRadioModule } from "@angular/material/radio";
import { TranslateModule } from "@ngx-translate/core";
import { RadioButtonListComponent } from "./radio-button-list.component";

@NgModule({
  imports: [BrowserModule, FormsModule, MatRadioModule, TranslateModule],
  declarations: [RadioButtonListComponent],
  exports: [RadioButtonListComponent],
  bootstrap: [RadioButtonListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_RadioButtonListControl {}
