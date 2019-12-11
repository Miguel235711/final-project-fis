import { Component, OnInit, OnDestroy , Input, ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { TableElement } from '../../tableElement-data.model';
import { CreateService } from '../create.service';
import { ItemService } from '../../item-data.service';
import {Subscription } from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit , OnDestroy {
  displayedColumns: string[] = ['Unidades', 'Cantidad', 'Nombre', 'Etiqueta' , 'NumBodega', 'NumLab', 'Observaciones', 'PrepaProfe'];
  @Input() color: string;
  @Input() urlType: string;
  itemServiceSubs: Subscription;
  itemFilterServiceSubs: Subscription;
  isLoading = true ;
  dataSource;
  constructor(public createService: CreateService, public itemService: ItemService) { }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.isLoading = false ;
    if (this.urlType !== 'Unsubscribe') {
      this.displayedColumns.push('Editar');
      this.displayedColumns.push('Borrar');
    } else if (this.urlType === 'Unsubscribe') {
      this.displayedColumns.push('Restaurar');
    }
    if (this.urlType === 'Unsubscribe') {
      this.itemService.getUnsubscribedItems();
      this.itemFilterServiceSubs = this.itemService.getItemFilterUpdateListener().subscribe((tableData: {tables: TableElement[]}) => {
        console.log('entered to itemFileterServiceSubs Event');
        this.dataSource =  new MatTableDataSource(tableData.tables);
        this.dataSource.sort = this.sort;
      });
    } else {
      console.log('table color: ', this.color);
      if (this.color !== undefined) {
        this.itemService.getItems(this.color);
      }
      this.itemServiceSubs = this.itemService.getItemUpdateListener(this.color).subscribe((tableData: {tables: TableElement[]} ) => {
        console.log('ngOnInit of table', tableData.tables);
        this.dataSource =  new MatTableDataSource(tableData.tables);
        this.dataSource.sort = this.sort;
      });
      this.itemFilterServiceSubs = this.itemService.getItemFilterUpdateListener().subscribe((tableData: {tables: TableElement[]}) => {
        this.dataSource =  new MatTableDataSource(tableData.tables);
        this.dataSource.sort = this.sort;
      });
    }
  }
  ngOnDestroy() {
    if (this.itemServiceSubs) {
      this.itemServiceSubs.unsubscribe();
    }
    if (this.itemFilterServiceSubs) {
      this.itemFilterServiceSubs.unsubscribe();
    }
  }
}

/*let ELEMENT_DATA: TableElement[] = [
  {Unidades: '3 frascos', Cantidad: 3, Nombre: 'Alcohol', Etiqueta: 'yellow' ,
  NumBodega: 10, NumLab: 5 , Observaciones: '', PrepaProfe: 'Prepa' , Editar: true, Borrar: true},
  {Unidades: '2 frascos', Cantidad: 2, Nombre: 'Butidieno', Etiqueta: 'yellow',
  NumBodega: 5, NumLab: 2 , Observaciones: '', PrepaProfe: 'Profesional', Editar: true, Borrar: true},
  {Unidades: '3 frascos', Cantidad: 3, Nombre: 'Nombre1', Etiqueta: 'yellow',
  NumBodega: 7, NumLab: 4 , Observaciones: '', PrepaProfe: 'Prepa', Editar: true, Borrar: true},
  {Unidades: '4 frascos', Cantidad: 4, Nombre: 'Nombre2', Etiqueta: 'yellow',
  NumBodega: 8, NumLab: 6 , Observaciones: '', PrepaProfe: 'Prepa', Editar: true, Borrar: true},

];*/
