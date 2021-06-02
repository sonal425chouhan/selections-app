import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  exports: [],
  providers: [{
    provide: HTTP_INTERCEPTORS}]
})
export class CoreModule { }
