import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { AppSharedModule } from "../base-core-ui/app.core.shared.module";
import { MatListModule } from "@angular/material/list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { userRoutes } from "../common/routes";
import { UserService } from "./services/user.service";
import { CreateUserComponent } from './container/create-user/create-user.component';
import { UserManagementComponent } from "./container/user-management/user-management.component";

@NgModule({
    imports: [
        CommonModule,
        AppSharedModule,
        HttpClientModule,
        MatListModule,
        FlexLayoutModule,
        TranslateModule,
        ReactiveFormsModule,
        RouterModule.forChild(userRoutes)
    ],
    declarations: [
        UserManagementComponent,
        CreateUserComponent,
    ],
    exports: [UserManagementComponent],
    providers: [UserService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class UserModule {}