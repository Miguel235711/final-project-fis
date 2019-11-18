import { Component, OnInit } from '@angular/core';
import { TableElement } from '../tableElement-data.model';
import {CreateComponent } from '../create/create.component';
import { MatDialog, MatTableModule } from '@angular/material';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  displayedColumns: string[] = ['Unidades', 'Cantidad', 'Nombre', 'Etiqueta' , 'NumBodega', 'NumLab', 'Observaciones', 'PrepaProfe',
  'Editar'];
  dataSource = ELEMENT_DATA;
  constructor(private dialog: MatDialog) {}
  ngOnInit() {
  }
  /*onEdit(eventElement) {
    console.log('onEdit method', eventElement);
  }*/
  onCreate(clickedElement) {
    const name = clickedElement._elementRef.nativeElement.name;
    if (name === 'addButton') {
      console.log('addButton identified');
      this.dialog.open(CreateComponent, { data: { title: 'Alta de ITEM' }} );
    }
  }
}

const ELEMENT_DATA: TableElement[] = [
  {Unidades: '3 frascos', Cantidad: '3 L', Nombre: 'Alcohol', Etiqueta: 'yellow' ,
  NumBodega: 10, NumLab: 5 , Observaciones: '', PrepaProfe: 'Prepa' , Editar: true},
  {Unidades: '2 frascos', Cantidad: '2 L', Nombre: 'Butidieno', Etiqueta: 'yellow',
  NumBodega: 5, NumLab: 2 , Observaciones: '', PrepaProfe: 'Profesional', Editar: true},
  {Unidades: '3 frascos', Cantidad: '3 L', Nombre: 'Nombre1', Etiqueta: 'yellow',
  NumBodega: 7, NumLab: 4 , Observaciones: '', PrepaProfe: 'Prepa', Editar: true},
  {Unidades: '4 frascos', Cantidad: '4 L', Nombre: 'Nombre2', Etiqueta: 'yellow',
  NumBodega: 8, NumLab: 6 , Observaciones: '', PrepaProfe: 'Prepa', Editar: true},

];
