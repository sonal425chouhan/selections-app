import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(
    private _router: Router,
    private _http: HttpClient,
    private toastr: MatSnackBar,
  ) { }

  private formatErrors(error: any) {
    this.toastr.open('Error!!', 'X', {
      duration: 3000
    });
    return throwError(error);
  }

  get(path: string, body: object = {}): Observable<any> {
    const url = `${environment.url}${path}`;
    let httpParams = new HttpParams();

    return this._http
      .get(url, { params: httpParams })
      .pipe(
        catchError(this.formatErrors.bind(this))
    );
  }

  put(path: string, body: object = {}): Observable<any> {
    const url = `${environment.url}${path}`;
    return this._http
      .put(url, body, { observe: 'response' })
      .pipe(
        catchError(this.formatErrors.bind(this))
      );
  }

  patch(path: string, body: object = {}): Observable<any> {
    const url = `${environment.url}${path}`;
    return this._http
      .patch(url, body, { observe: 'response' })
      .pipe(
        catchError(this.formatErrors.bind(this))
      );
  }

  post(path: string, body: object = {}): Observable<any> {
    const url = `${environment.url}${path}`;
    return this._http
      .post(url, body, { observe: 'response' })
      .pipe(
        catchError(this.formatErrors.bind(this))
      );
  }


  delete(path: string, body: object = {}): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: {...body},
      observe: 'response' as 'response'
    };
    const url = `${environment.url}${path}`;
    return this._http
      .delete(url, httpOptions)
      .pipe(
        catchError(this.formatErrors.bind(this))
      );
  }
}
