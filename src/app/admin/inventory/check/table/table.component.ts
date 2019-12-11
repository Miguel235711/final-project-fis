import { Component, OnInit , Input } from '@angular/core';
import { TableElement } from '../../tableElement-data.model';
import { CreateService } from '../create.service';
import { ItemService } from '../../item-data.service';
import {Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['Unidades', 'Cantidad', 'Nombre', 'Etiqueta' , 'NumBodega', 'NumLab', 'Observaciones', 'PrepaProfe'];
  ELEMENT_DATA: TableElement[];
  @Input() color: string;
  @Input() urlType: string;
  itemServiceSubs: Subscription;
  itemFilterServiceSubs: Subscription;
  isLoading = true ;
  constructor(public createService: CreateService, public itemService: ItemService) { }
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
        this.ELEMENT_DATA = tableData.tables;
      });
    } else {
      console.log('table color: ', this.color);
      if (this.color !== undefined) {
        this.itemService.getItems(this.color);
      }
      this.itemServiceSubs = this.itemService.getItemUpdateListener(this.color).subscribe((tableData: {tables: TableElement[]} ) => {
        console.log('ngOnInit of table', tableData.tables);
        this.ELEMENT_DATA = tableData.tables;
      });
      this.itemFilterServiceSubs = this.itemService.getItemFilterUpdateListener().subscribe((tableData: {tables: TableElement[]}) => {
        this.ELEMENT_DATA = tableData.tables;
      });
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
