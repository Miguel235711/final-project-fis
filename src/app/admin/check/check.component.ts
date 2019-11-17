import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  displayedColumns: string[] = ['Unidades', 'Cantidad', 'Nombre', 'NumBodega', 'NumLab', 'Observaciones', 'PrepaProfe'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
export interface PeriodicElement {
  Unidades: string;
  Cantidad: string;
  Nombre: string;
  NumBodega: number;
  NumLab: number;
  Observaciones: string;
  PrepaProfe: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {Unidades: '3 frascos', Cantidad: '3 L', Nombre: 'Alcohol', NumBodega: 10, NumLab: 5 , Observaciones: '', PrepaProfe:'Prepa'},
  {Unidades: '2 frascos', Cantidad: '2 L', Nombre: 'Butidieno', NumBodega: 5, NumLab: 2 , Observaciones: '', PrepaProfe:'Profesional'},
  {Unidades: '3 frascos', Cantidad: '3 L', Nombre: 'Nombre1', NumBodega: 7, NumLab: 4 , Observaciones: '', PrepaProfe:'Prepa'},
  {Unidades: '4 frascos', Cantidad: '4 L', Nombre: 'Nombre2', NumBodega: 8, NumLab: 6 , Observaciones: '', PrepaProfe:'Prepa'},
  
];
