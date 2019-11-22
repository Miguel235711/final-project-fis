import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, VirtualTimeScheduler } from 'rxjs';
import { TableElement } from './tableElement-data.model';
import { stringify } from 'querystring';
import {SHashMap } from './SubjectHashMap';
import {Filter} from '../inventory/search/filter.model';

@Injectable({providedIn: 'root'})
export class ItemService {
  /// to know if the user is authenticated or not
  private tables: TableElement[] = [];
  filterSubject: Subject<{tables: TableElement[]}> = new Subject<{tables: TableElement[]}>() ;
  subjects: SHashMap = {};
  constructor(private http: HttpClient, private router: Router) {}
  filterDefaultElement: Filter = {
    keyword: undefined,
    color: undefined
  };
  private createSubjectIfNecessary(color: string) {
    if (!this.subjects[color]) {
      /// create subject
      console.log('creating', color );
      this.subjects[color] = new Subject<{tables: TableElement[]}>();
    }
  }
  getItem(id: string) {/// because it works asyncronosly
    return this.http.get<{message: string , item: TableElement}>(
      'http://localhost:3000/api/item/single?id=' + id); /// return our observable
  }
  createItem(tableElement: TableElement, urlType: string) {
    this.createSubjectIfNecessary(tableElement.Etiqueta);
    console.log('table element to send to backend', tableElement);
    return this.http.post<{message: string, item: TableElement}>('http://localhost:3000/api/item/addItem', tableElement)
    .subscribe(responseData => {
      // this.router.navigate(['/']);
      console.log('success to post ');
      console.log('create element', tableElement.Etiqueta);
      console.log('responseData: ' , responseData);
      console.log('table element: ', tableElement);
      if (urlType === 'Search') {
        this.getItemsFiltered(this.filterDefaultElement);
      } else {
        this.getItems(tableElement.Etiqueta);
      }
    }, error => {
      console.log(error);
      // this.authStatusListener.next(false);
    }); /// return observable
  }
  getItems(color: string) {
    this.createSubjectIfNecessary(color);
    const type = 'color';
    const queryParams = `?type=${type}&color=${color}`;
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
  getItemsFiltered(filterElement: Filter) {
    this.filterDefaultElement = filterElement;
    console.log('this.filterDefaultElement', this.filterDefaultElement);
    const type = 'filter';
    const queryParams =
    `?type=${type}&keyword=${filterElement.keyword}&color=${filterElement.color}`;
    console.log('query', queryParams);
    this.http
    .get<{message: string, items: TableElement[]}>('http://localhost:3000/api/item' + queryParams).subscribe(response => {
      this.tables = response.items;
      console.log('update subject');
      this.filterSubject.next({tables: [...this.tables]});
    }, error => {
      console.log('error getItemsFilterd()', error);
    });
  }
  getItemUpdateListener(color: string) {
    this.createSubjectIfNecessary(color);
    return this.subjects[color].asObservable();
  }
  getItemFilterUpdateListener() {
    return this.filterSubject.asObservable();
  }
  updateItem(item: TableElement, originalColor: string, urlType: string ) {
    this.createSubjectIfNecessary(item.Etiqueta);
    this.http
      .put('http://localhost:3000/api/item/?id=' + item._id, item)
      .subscribe(response => {
        console.log(response);
        console.log(item.Etiqueta);
        if (urlType === 'Search') {
          this.getItemsFiltered(this.filterDefaultElement);
        } else {
          this.getItems(item.Etiqueta);
          if (originalColor !== item.Etiqueta) {
            /// especial case when color changed
            this.getItems(originalColor);
          }
        }
      }, error => {
        console.log('error in updatePost()');
      });
  }
  unsubscribeItem(color: string, id: string, urlType: string ) {
    this.createSubjectIfNecessary(color);
    console.log('unsubscribeItem id: ' , id);
    this.http
      .delete('http://localhost:3000/api/item/?id=' + id)
      .subscribe(response => {
        console.log('urlType', urlType);
        if (urlType === 'Check') {
          this.getItems(color);
        } else {
          this.getItemsFiltered(this.filterDefaultElement); /// bug here
        }
      }, error => {
        console.log('error in unsubscribeItem');
      });
  }
}
