import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MenuComponent } from './menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule, TranslateModule],
  declarations: [MenuComponent, MenuItemComponent],
  exports: [MenuComponent, MenuItemComponent],
  bootstrap: [MenuComponent],
})
export class MenuModule {}
