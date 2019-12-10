import { Component, OnInit , Input } from '@angular/core';
import { TableElement } from '../../tableElement-data.model';
import { ItemService } from '../../item-data.service';
import {Subscription } from 'rxjs';
import { CreateService } from '../../check/create.service';

@Component({
  selector: 'app-recovery-table',
  templateUrl: './recovery-table.component.html',
  styleUrls: ['./recovery-table.component.css']
})
export class RecoveryTableComponent implements OnInit {
  displayedColumns: string[] = [
  'Unidades', 'Cantidad', 'Nombre', 'Etiqueta' , 'NumBodega', 'NumLab', 'Observaciones', 'PrepaProfe', 'Restaurar'
  ];
  ELEMENT_DATA: TableElement[];
  itemFilterServiceSubs: Subscription;
  constructor(public itemService: ItemService, public createService: CreateService) { }
  ngOnInit() {
    this.itemService.getUnsubscribedItems();
    this.itemFilterServiceSubs = this.itemService.getItemFilterUpdateListener().subscribe((tableData: {tables: TableElement[]}) => {
      this.ELEMENT_DATA = tableData.tables;
    });
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
