import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  displayedColumns: string[] = ['Unidades', 'Cantidad', 'Nombre', 'Etiqueta' , 'NumBodega', 'NumLab', 'Observaciones', 'PrepaProfe',
  'Editar'];
  dataSource = ELEMENT_DATA;
  constructor() { }
  ngOnInit() {
  }

}
export interface PeriodicElement {
  Unidades: string;
  Cantidad: string;
  Nombre: string;
  Etiqueta: string;
  NumBodega: number;
  NumLab: number;
  Observaciones: string;
  PrepaProfe: string;
  Editar: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Unidades: '3 frascos', Cantidad: '3 L', Nombre: 'Alcohol', Etiqueta: 'yellow' ,
  NumBodega: 10, NumLab: 5 , Observaciones: '', PrepaProfe: 'Prepa' , Editar: true},
  {Unidades: '2 frascos', Cantidad: '2 L', Nombre: 'Butidieno', Etiqueta: 'yellow',
  NumBodega: 5, NumLab: 2 , Observaciones: '', PrepaProfe: 'Profesional', Editar: true},
  {Unidades: '3 frascos', Cantidad: '3 L', Nombre: 'Nombre1', Etiqueta: 'yellow',
  NumBodega: 7, NumLab: 4 , Observaciones: '', PrepaProfe: 'Prepa', Editar: true},
  {Unidades: '4 frascos', Cantidad: '4 L', Nombre: 'Nombre2', Etiqueta: 'yellow',
  NumBodega: 8, NumLab: 6 , Observaciones: '', PrepaProfe: 'Prepa', Editar: true},

];
