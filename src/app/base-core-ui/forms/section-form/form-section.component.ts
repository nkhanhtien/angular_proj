import { Component, Input, OnInit } from '@angular/core';
import { ComponentData, FormSection } from '../../app.core.shared.interfaces';
@Component({
  selector: 'app-formc-section',
  templateUrl: './form-section.component.html',
})
export class FormSectionComponent implements OnInit {
  compDetailSection?: ComponentData;
  @Input() Sections: FormSection[];

  constructor() {}

  ngOnInit() {
    let selectedDefault = this.Sections.find((d) => d.selectedDefault === true);
    if (selectedDefault !== undefined) {
      this.setSelectedSections(selectedDefault);
      this.compDetailSection = selectedDefault.sectionData;
    }
  }

  clickSection(item: FormSection) {
    this.setSelectedSections(item);

    this.compDetailSection = item.sectionData;
  }

  setSelectedSections(item: FormSection) {
    for (let section of this.Sections) {
      if (section.sectionKey !== item.sectionKey) {
        section.selected = false;
      }
    }
    item.selected = true;
  }
}

/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
