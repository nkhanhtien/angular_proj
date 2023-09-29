import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";
import { CheckBoxListComponent } from "./check-box-list.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatCheckboxModule,
    MatListModule,
    TranslateModule,
  ],
  declarations: [CheckBoxListComponent],
  exports: [CheckBoxListComponent],
  bootstrap: [CheckBoxListComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_CheckBoxListControl {}
