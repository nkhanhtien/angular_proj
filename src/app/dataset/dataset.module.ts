import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { AppSharedModule } from "../base-core-ui/app.core.shared.module";
import { MatListModule } from "@angular/material/list";
import { FlexLayoutModule } from "@angular/flex-layout";
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DatasetService } from "./services/dataset.service";
import { DatasetViewerComponent } from './container/dataset-viewer/dataset-viewer.component';
import { datasetRoutes } from "../common/routes";
import { CreateDatasetComponent } from './container/create-dataset/create-dataset.component';

@NgModule({
    imports: [
        CommonModule,
        AppSharedModule,
        HttpClientModule,
        MatListModule,
        FlexLayoutModule,
        TranslateModule,
        ReactiveFormsModule,
        RouterModule.forChild(datasetRoutes)
    ],
    declarations: [
        DatasetViewerComponent,
        CreateDatasetComponent
    ],
    exports: [DatasetViewerComponent],
    providers: [DatasetService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class DatasetModule {}