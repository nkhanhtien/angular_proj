import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TextBoxMaskComponent } from './text-box-mask.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskDirective, NgxMaskPipe, IConfig, provideNgxMask } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    TranslateModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask(maskConfig)],
  declarations: [TextBoxMaskComponent],
  exports: [TextBoxMaskComponent],
  bootstrap: [TextBoxMaskComponent],
})
export class AppControlModule_TextBoxMaskControl {}
