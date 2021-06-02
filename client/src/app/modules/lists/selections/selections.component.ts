import { Component, OnInit, ViewChild } from '@angular/core';
import { ListService} from 'src/app/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Store, select } from '@ngrx/store';

import { listUpdate, selectionUpdate } from 'src/app/core/actions/list.actions';
import { selectionData, selectSelection } from 'src/app/core/reducers/selection.reducer';

export interface SelectionData {
  firstName: string;
  lastName: string;
  email: string;
}

@Component({
  selector: 'app-selections',
  templateUrl: './selections.component.html',
  styleUrls: ['./selections.component.scss']
})
export class SelectionsComponent implements OnInit {

  dataSource!: MatTableDataSource<SelectionData>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['firstName', 'lastName', 'email'];
  pageSize = 10;
  totalResults = 0;
  listArray: SelectionData[] = []

  constructor( private _listService: ListService, private store: Store<selectionData>) { }

  ngOnInit(): void {
    this.getList();
    this.store.pipe(select(selectSelection)).subscribe((res: any) => {
      this.listArray = res.selection || res;
      this.totalResults = this.listArray.length;
      this.dataSource = new MatTableDataSource(this.listArray);
    });
  }

  getList() {
    this._listService.getSelection().subscribe(res=> {
      this.listArray = res.data;
      this.store.dispatch(new selectionUpdate({ selection: res.data }));
    })
  }

}
