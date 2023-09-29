import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { RouterModule } from "@angular/router";
import { AppSharedModule } from "../base-core-ui/app.core.shared.module";
import { ActivitiesViewerComponent } from "./container/activities-viewer/activities-viewer.component";
import { activityRoutes } from "../common/routes";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { ActivityService } from "./services/activity.service";
import { ActivityFilterComponent } from './components/activity-filter/activity-filter.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ActivityDetailComponent } from './container/activity-detail/activity-detail.component';

@NgModule({
    imports: [
        CommonModule,
        AppSharedModule,
        HttpClientModule,
        MatListModule,
        FlexLayoutModule,
        TranslateModule,
        ReactiveFormsModule,
        RouterModule.forChild(activityRoutes)
    ],
    declarations: [
        ActivitiesViewerComponent,
        ActivityFilterComponent,
        ActivityDetailComponent,
    ],
    exports: [ActivitiesViewerComponent],
    providers: [ActivityService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ActivityModule {}