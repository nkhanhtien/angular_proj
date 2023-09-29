import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { MatTreeModule } from "@angular/material/tree";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { TreeViewComponent } from "./tree-view.component";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
  declarations: [TreeViewComponent],
  exports: [TreeViewComponent],
  bootstrap: [TreeViewComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppControlModule_TreeViewControl {}
