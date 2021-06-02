import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ListService} from 'src/app/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SelectionModel} from '@angular/cdk/collections';

import { Store, select } from '@ngrx/store';
import { listUpdate, selectionUpdate } from 'src/app/core/actions/list.actions';
import { listData, selectList } from 'src/app/core/reducers/list.reducer';

export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, AfterViewInit {

  dataSource!: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<UserData>(true, []);

  displayedColumns: string[] = ['select','firstName', 'lastName', 'email'];
  isLoadingResults = false;
  pageData = {
    'pageSize': 5,
    'pageIndex' : 0
  }
  totalResults = 100;
  listArray: UserData[] = [];
  query: string = '';

  constructor( private _listService: ListService, private store: Store<listData>) {
  }

  ngOnInit(): void {
    this.getList();
    this.store.pipe(select(selectList)).subscribe((res: any) => {
      this.listArray = res.list || res;
      this.dataSource = new MatTableDataSource(this.listArray);
      this.dataSource.paginator = this.paginator;

      // load more data initially
      setTimeout(()=>this.checkPagination(), 200);
    });

  }

  ngAfterViewInit() {
    this.paginator.page.subscribe(res =>{
      this.checkPagination();
    })
  }

  checkPagination() {
    if(this.paginator && !this.paginator.hasNextPage()) {
      this.getList();
    }
  }

  getList() {
    this._listService.getList(this.query, this.pageData.pageSize, this.pageData.pageIndex + 1).subscribe((res: any)=> {
      this.store.dispatch(new listUpdate({ list: [ ...this.listArray, ...res.data] }));
      this.pageData.pageIndex += 1
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.query = filterValue.trim().toLowerCase();
    this.pageData.pageIndex = 0;
    this.store.dispatch(new listUpdate({ list: [] }))
    this.getList();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: UserData): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.email + '1'}`;
  }

  addSelections() {
    const params = { 'selections': this.selection.selected }
    this._listService.addSelection(params).subscribe(res=> {
      this.selection.clear();
    })
  }

}
