import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { TextBoxPasswordControlComponent } from "./text-box-password.component";
import { TranslateModule } from "@ngx-translate/core";
@NgModule({
  imports: [BrowserModule, FormsModule, TranslateModule],
  declarations: [TextBoxPasswordControlComponent],
  exports: [TextBoxPasswordControlComponent],
  bootstrap: [TextBoxPasswordControlComponent],
})
export class AppControlModule_TextBoxPasswordControl {}
