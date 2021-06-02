import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListsComponent } from './lists.component';
import { SelectionsComponent } from './selections/selections.component';


const routes: Routes = [{
  path: '',
  component: ListsComponent
}, {
  path: 'selection',
  component: SelectionsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListsRoutingModule { }
