import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { TextViewComponent } from "./text-view.component";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  imports: [BrowserModule, FormsModule, TranslateModule],
  declarations: [TextViewComponent],
  exports: [TextViewComponent],
  bootstrap: [TextViewComponent],
})
export class AppControlModule_TextViewControl {}
