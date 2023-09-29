import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { DialogMessageComponent } from "./dialog-message.component";
import { TranslateModule } from "@ngx-translate/core";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [BrowserModule, FormsModule, TranslateModule, MatDialogModule],
  declarations: [DialogMessageComponent],
  exports: [DialogMessageComponent],
  bootstrap: [DialogMessageComponent],
})
export class AppControlModule_DialogMessageControl {}
