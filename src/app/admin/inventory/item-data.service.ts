import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TableElement } from './tableElement-data.model';
import { stringify } from 'querystring';
import {SHashMap } from './SubjectHashMap';

@Injectable({providedIn: 'root'})
export class ItemService {
  /// to know if the user is authenticated or not
  private tables: TableElement[] = [];
  subjects: SHashMap = {};
  constructor(private http: HttpClient, private router: Router) {}
  private createSubjectIfNecessary(color: string) {
    if (!this.subjects[color]) {
      /// create subject
      console.log('creating', color );
      this.subjects[color] = new Subject<{tables: TableElement[]}>();
    }
  }
  createItem(tableElement: TableElement, color: string) {
    this.createSubjectIfNecessary(color);
    console.log('table element to send to backend', tableElement);
    return this.http.post('http://localhost:3000/api/item/addItem', tableElement).subscribe(() => {
      // this.router.navigate(['/']);
      console.log('success to post ');
      console.log('create element', color);
      this.getItems(color);
    }, error => {
      console.log(error);
      // this.authStatusListener.next(false);
    }); /// return observable
  }
  getItems(color: string) {
    this.createSubjectIfNecessary(color);
    const queryParams = `?color=${color}`;
    this.http
    .get<{message: string, items: TableElement [] }>('http://localhost:3000/api/item' + queryParams).subscribe(response => {
      console.log(response);
      this.tables = response.items;
      console.log('updating subject');
      this.subjects[color].next({tables: [...this.tables]});
    }, error => {
      console.log('error in getItems()', error);
    });
  }
  getItemUpdateListener(color: string) {
    this.createSubjectIfNecessary(color);
    return this.subjects[color].asObservable();
  }
}
