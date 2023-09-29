import { NgModule } from '@angular/core';
import { AppFormModule_FormBar } from './forms/form-bar/form-bar.module';
import { AppFormModule_FormMaster } from './forms/master-form/form-master.module';
import { AppFormModule_SearchFormDynamic } from './forms/search-form-dynamic/search-form-dynamic.module';
import { AppFormModule_SearchFrom } from './forms/search-form/search-form.module';
import { AppFormModule_FormSection } from './forms/section-form/form-section.module';
import { AppFormModule_SingleFrom } from './forms/single-form/single-form.module';
import { AppFormModule_TabsForm } from './forms/tabs-form/tabs-form.module';
import { AppFormModule_FormView } from './forms/view-form/form-view.module';
import { AppFormModule_WizardFormSection } from './forms/wizard-form/form-wizard-section';

@NgModule({
  exports: [
    AppFormModule_SingleFrom,
    AppFormModule_FormSection,
    AppFormModule_WizardFormSection,
    AppFormModule_FormMaster,
    AppFormModule_SearchFrom,
    AppFormModule_SearchFormDynamic,
    AppFormModule_FormBar,
    AppFormModule_FormView,
    AppFormModule_TabsForm,
  ],
})
export class AppSharedFormsModule {}

/*
Note Sharing:
1. SingleFromModule :
    a. if we input the module in AppModule, we don't need to export it.
    b. as we using ShareModule to import to AppModule we need export it.
2.  @angular/material
    a. We need import&export modules of @angular/material to effect to UI (child components)
3. RouterModule
    a. We need export RouterModule to make routes working.
*/
