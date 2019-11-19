import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TableElement } from './tableElement-data.model';

@Injectable({providedIn: 'root'})
export class ItemService {
  /// to know if the user is authenticated or not
  private itemStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) {}
  createItem(tableElement: TableElement) {
    console.log('table element to send to backend', tableElement);
    return this.http.post('http://localhost:3000/api/item/addItem', tableElement).subscribe(() => {
      // this.router.navigate(['/']);
      console.log('success to post ');
    }, error => {
      console.log(error);
      // this.authStatusListener.next(false);
    }); /// return observable
  }
}
