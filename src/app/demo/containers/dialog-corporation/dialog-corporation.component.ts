import { Component, Injector, OnInit } from '@angular/core';
import { PageDataInfo } from '../../../base-core-ui/app.core.shared.interfaces';
import {
  ColumnDefine,
  CommonBaseComponent,
  ControlBase,
  GridDefine,
  TextBoxControlBase,
} from '../../../base-core-ui/app.core.shared.models';
import { DemoService } from '../../services/demo.service';

@Component({
  selector: 'app-dialog-corporation',
  templateUrl: './dialog-corporation.component.html',
})
export class DialogCorporationComponent
  extends CommonBaseComponent
  implements OnInit
{
  searchControls: any[];
  gridDefinitions: GridDefine = new GridDefine();
  dbDataSource: any[];
  dataSource: any[];
  selectedItem: any;
  pageInfo: PageDataInfo = {
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
  };

  constructor(injector: Injector, private demoService: DemoService) {
    super(injector);
    this.searchControls = this.getSearchControls();
    this.gridDefinitions = this.getGridDefinitions();
  }

  ngOnInit(): void {
    this.dbDataSource = this.demoService.getListOfCorporations();
    this.dataSource = this.demoService.getListOfCorporations();

    this.pageInfo.total =
      this.dataSource.length / (this.pageInfo.pageSize ?? 1);
  }

  onSubmitSearchForm(event: any) {
    // Fake api searching
    const search = event.search ? event.search.trim().toUpperCase() : '';
    const newDataSource = this.dbDataSource.filter((item) => {
      for (const key in item) {
        if (item[key].toUpperCase().indexOf(search) >= 0) return true;
      }
      return false;
    });
    this.dataSource = newDataSource;
    this.pageInfo.total =
      this.dataSource.length / (this.pageInfo.pageSize ?? 1);
  }

  getSearchControls() {
    const controls: ControlBase<any>[] = [];

    controls.push(
      new TextBoxControlBase({
        key: 'search',
        placeholder: 'Search corporation name',
        label: 'Corporation Name',
        isDefault: true,
        order: 1,
      })
    );

    return controls;
  }

  getGridDefinitions() {
    const columnDefines: ColumnDefine[] = [
      new ColumnDefine({ columnDef: 'id', header: 'ID', isVisible: true }),
      new ColumnDefine({
        columnDef: 'name',
        header: 'Corporation Name',
        isVisible: true,
      }),
    ];

    const displayedColumns = ['select', 'id', 'name'];

    let gridDefinitions: GridDefine = {
      columns: columnDefines,
      displayedColumns: displayedColumns,
      showSearchHeader: true,
      showNonePrimaryAction: false,
      rowActions: [],
    };
    return gridDefinitions;
  }

  onChangeSelection(selectedItems: any) {
    this.selectedItem = selectedItems.added[0];
  }

  onClose() {
    this.OnComponentActions.emit({
      dialogAction: 'Close',
      action: 'Canncel',
    });
  }

  onSelect() {
    this.OnComponentActions.emit({
      dialogAction: 'Close',
      action: 'Save',
      id: this.selectedItem.id,
    });
  }
}
