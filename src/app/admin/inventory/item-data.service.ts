import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TableElement } from './tableElement-data.model';
import { stringify } from 'querystring';

@Injectable({providedIn: 'root'})
export class ItemService {
  /// to know if the user is authenticated or not
  private tables: TableElement[] = [];
  private itemStatusListener = new Subject<{tables: TableElement[]}>();
  constructor(private http: HttpClient, private router: Router) {}
  createItem(tableElement: TableElement) {
    console.log('table element to send to backend', tableElement);
    return this.http.post('http://localhost:3000/api/item/addItem', tableElement).subscribe(() => {
      // this.router.navigate(['/']);
      console.log('success to post ');
      this.getItems();
    }, error => {
      console.log(error);
      // this.authStatusListener.next(false);
    }); /// return observable
  }
  getItems() {
    this.http
    .get<{message: string, items: TableElement [] }>('http://localhost:3000/api/item', {}).subscribe(response => {
      console.log(response);
      this.tables = response.items;
      console.log('updating subject');
      this.itemStatusListener.next({tables: [...this.tables]});
    }, error => {
      console.log('error in getItems()', error);
    });
  }
  getItemUpdateListener() {
    return this.itemStatusListener.asObservable();
  }
}
