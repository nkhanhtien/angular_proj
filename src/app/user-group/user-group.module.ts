import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
import { AppSharedModule } from "../base-core-ui/app.core.shared.module";
import { userGroupRoutes } from "../common/routes";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { UserGroupService } from "./services/user-group.service";
import { ReactiveFormsModule } from "@angular/forms";
import { TagViewerComponent } from './container/tag-viewer/tag-viewer.component';
import { TagDialogComponent } from './component/tag-dialog/tag-dialog.component';
import { DialogConfirmComponent } from './component/dialog-confirm/dialog-confirm.component';

@NgModule({
    imports: [
        CommonModule,
        AppSharedModule,
        HttpClientModule,
        MatListModule,
        FlexLayoutModule,
        TranslateModule,
        ReactiveFormsModule,
        RouterModule.forChild(userGroupRoutes)
    ],
    declarations: [
        TagViewerComponent,
        TagDialogComponent,
        DialogConfirmComponent,
    ],
    exports: [TagViewerComponent],
    providers: [UserGroupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UserGroupModule {}