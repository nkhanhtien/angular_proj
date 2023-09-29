import {
  Component,
  Injector,
  Input,
  Output,
  EventEmitter,
  SimpleChange,
  ChangeDetectorRef,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
} from '@angular/material/tree';
import {
  TreeItemFlatNode,
  TreeItemNode,
} from '../../app.core.shared.interfaces';

@Component({
  selector: 'app-ctr-tree-view',
  styleUrls: ['./tree-view.component.css'],
  templateUrl: './tree-view.component.html',
})
export class TreeViewComponent implements OnChanges, AfterViewInit {
  /** Map from flat node to nested node. This helps us finding the nested node to be modified */
  flatNodeMap = new Map<TreeItemFlatNode, TreeItemNode>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<TreeItemNode, TreeItemFlatNode>();

  /** A selected parent node to be inserted */
  selectedParent: TreeItemFlatNode | null = null;

  /** The new item's name */
  newItemName = '';

  treeControl: FlatTreeControl<TreeItemFlatNode>;

  treeFlattener: MatTreeFlattener<TreeItemNode, TreeItemFlatNode>;

  dataSource: MatTreeFlatDataSource<TreeItemNode, TreeItemFlatNode>;

  /** The selection for checklist */
  checklistSelection = new SelectionModel<TreeItemFlatNode>(
    true /* multiple */
  );

  /* For control */
  @Input() TreeData: TreeItemNode[];
  @Input() ViewMode: boolean = false;
  @Input() ViewModePrefix: any[] = ['-', '*', '+', '=>'];

  @Output() ItemCheckChanged = new EventEmitter<any>();

  constructor(injector: Injector, private cdr: ChangeDetectorRef) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );
    this.treeControl = new FlatTreeControl<TreeItemFlatNode>(
      this.getLevel,
      this.isExpandable
    );
    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
    this.TreeData = [];
  }

  ngOnChanges() {
    this.updateTreeLevel(this.TreeData, 0);
    this.dataSource.data = this.TreeData;
  }

  ngAfterViewInit() {
    this.updateTreeLevel(this.TreeData, 0);
    this.dataSource.data = this.TreeData;
    this.cdr.detectChanges();
  }

  getLevel = (node: TreeItemFlatNode) => node.level;

  isExpandable = (node: TreeItemFlatNode) => node.expandable;

  getChildren = (node: TreeItemNode): TreeItemNode[] | undefined =>
    node.children;

  hasChild = (_: number, _nodeData: TreeItemFlatNode) => _nodeData.expandable;

  hasNoContent = (_: number, _nodeData: TreeItemFlatNode) =>
    _nodeData.name === '';

  /**
   * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
   */
  transformer = (node: TreeItemNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.name === node.name
        ? existingNode
        : new TreeItemFlatNode();
    flatNode.name = node.name;
    flatNode.level = level;
    flatNode.expandable = !!node.children && node.children.length > 0;
    flatNode.key = node.key;
    flatNode.selected = node.selected;
    flatNode.indeterminate = node.indeterminate;
    flatNode.customKey = node.customKey;
    flatNode.nameKey = node.nameKey;
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  };

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
  todoItemSelectionToggle(node: TreeItemFlatNode): void {
    this.checklistSelection.toggle(node);
    let selected = node.selected ? true : false;

    const descendants = this.treeControl.getDescendants(node);

    descendants.forEach((item) => {
      item.selected = selected;
      item.indeterminate = false;
    });

    this.checkAllParentsSelection(node);

    this.convertTreeToData();

    this.ItemCheckChanged.emit(node);
  }

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
  todoLeafItemSelectionToggle(node: TreeItemFlatNode): void {
    this.checklistSelection.toggle(node);
    this.checkAllParentsSelection(node);

    this.convertTreeToData();

    this.ItemCheckChanged.emit(node);

    this.updateTreeLevel(this.TreeData, 0);
    this.dataSource.data = this.TreeData;
  }

  /* Checks all the parents when a leaf node is selected/unselected */
  checkAllParentsSelection(node: TreeItemFlatNode): void {
    let parent: TreeItemFlatNode | null = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  /** Check root node checked state and change it accordingly */
  checkRootNodeSelection(node: TreeItemFlatNode): void {
    // [(ngModel)]="node.selected" [(indeterminate)]="node.indeterminate"
    // need configuration for root node as above to make sure the state indeterminate alway change in UI
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    let descAllSelected = true;
    let indeterminate = false;

    descendants.forEach((item) => {
      if (item.selected !== true) {
        descAllSelected = false;
      }

      if (item.selected === true) {
        indeterminate = true;
      }
    });

    if (!descAllSelected && !indeterminate) {
      node.indeterminate = false;
      node.selected = false;
    } else if (descAllSelected) {
      node.indeterminate = false;
      node.selected = true;
    } else {
      node.selected = false;
      node.indeterminate = true;
    }
  }

  /* Get the parent node of a node */
  getParentNode(node: TreeItemFlatNode): TreeItemFlatNode | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  convertTreeToData() {
    let data = this.treeControl.dataNodes;
    this.TreeData.forEach((item) => {
      let rootItem = data.filter((i) => i.key === item.key);
      if (rootItem !== null && rootItem.length > 0) {
        item.indeterminate = rootItem[0].indeterminate;
        item.selected = rootItem[0].selected;
        if (item.children !== undefined && item.children.length > 0) {
          item.children.forEach((child) => this.updateDataForItem(data, child));
        }
      }
    });
  }

  updateDataForItem(rootItems: TreeItemFlatNode[], item: TreeItemNode) {
    let rootItem = rootItems.filter((i) => i.key === item.key);
    if (rootItem !== null && rootItem.length > 0) {
      item.indeterminate = rootItem[0].indeterminate;
      item.selected = rootItem[0].selected;
      if (item.children !== undefined && item.children.length > 0) {
        item.children.forEach((child) =>
          this.updateDataForItem(rootItems, child)
        );
      }
    }
  }

  updateTreeLevel(treeData: TreeItemNode[], level: number) {
    treeData.forEach((treeNode) => {
      treeNode.level = level;
      if (treeNode.children && treeNode.children.length > 0) {
        this.updateTreeLevel(treeNode.children, level + 1);
      }
    });
  }
}
