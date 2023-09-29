import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { errorRoutes } from '../common/routes';
import { AppSharedModule } from '../base-core-ui/app.core.shared.module';
import { NotFoundPageComponent } from './containers/not-found-page/not-found-page.component';

@NgModule({
  imports: [
    CommonModule,
    AppSharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    RouterModule.forChild(errorRoutes),
  ],
  declarations: [NotFoundPageComponent],
  exports: [NotFoundPageComponent],
})
export class ErrorModule {}
