import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

import { ListsComponent } from './lists.component';
import { ListsRoutingModule } from './lists-routing.module';
import { SelectionsComponent } from './selections/selections.component';

@NgModule({
  declarations: [ListsComponent, SelectionsComponent],
  imports: [
    CommonModule,
    ListsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule
  ]
})
export class ListsModule { }
