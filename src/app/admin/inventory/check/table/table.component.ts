import { Component, OnInit } from '@angular/core';
import { TableElement } from '../../tableElement-data.model';
import { CreateService } from '../create.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['Unidades', 'Cantidad', 'Nombre', 'Etiqueta' , 'NumBodega', 'NumLab', 'Observaciones', 'PrepaProfe',
  'Editar'];
  dataSource = ELEMENT_DATA;
  constructor(public createService: CreateService) { }
  ngOnInit() {
  }
}

const ELEMENT_DATA: TableElement[] = [
  {Unidades: '3 frascos', Cantidad: 3, Nombre: 'Alcohol', Etiqueta: 'yellow' ,
  NumBodega: 10, NumLab: 5 , Observaciones: '', PrepaProfe: 'Prepa' , Editar: true},
  {Unidades: '2 frascos', Cantidad: 2, Nombre: 'Butidieno', Etiqueta: 'yellow',
  NumBodega: 5, NumLab: 2 , Observaciones: '', PrepaProfe: 'Profesional', Editar: true},
  {Unidades: '3 frascos', Cantidad: 3, Nombre: 'Nombre1', Etiqueta: 'yellow',
  NumBodega: 7, NumLab: 4 , Observaciones: '', PrepaProfe: 'Prepa', Editar: true},
  {Unidades: '4 frascos', Cantidad: 4, Nombre: 'Nombre2', Etiqueta: 'yellow',
  NumBodega: 8, NumLab: 6 , Observaciones: '', PrepaProfe: 'Prepa', Editar: true},

];
