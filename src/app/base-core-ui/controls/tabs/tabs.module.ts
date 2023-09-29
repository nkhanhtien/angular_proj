import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TabsControlComponent } from './tabs.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [BrowserModule, FormsModule, TranslateModule, MatTabsModule],
  declarations: [TabsControlComponent],
  exports: [TabsControlComponent],
  bootstrap: [TabsControlComponent],
})
export class AppControlModule_TabsControl {}
