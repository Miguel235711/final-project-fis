import { Component, OnInit , Inject } from '@angular/core';
import {MAT_DIALOG_DATA } from '@angular/material';
import { ColorElement } from '../color-data.model';
import { TableElement } from '../tableElement-data.model';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  displayedColumns: string[] = ['Unidades', 'Cantidad', 'Nombre', 'Etiqueta' , 'NumBodega', 'NumLab', 'Observaciones', 'PrepaProfe',
  'Editar'];
  levels: string[] = ['Prepa', 'Profe'];
  colors: ColorElement[] = [
    {value: 'yellow', viewValue: 'yellow'},
    {value: 'green', viewValue: 'green'},
    {value: 'cyan', viewValue: 'cyan'},
    {value: 'blue', viewValue: 'blue'},
    {value: 'orange', viewValue: 'orange'},
    {value: 'gray', viewValue: 'gray'}
  ];
  createForm: TableElement = {
    Unidades: '',
    Cantidad: 0 ,
    Nombre: '' ,
    Etiqueta: '' ,
    NumBodega: 0,
    NumLab: 0 ,
    Observaciones: '' ,
    PrepaProfe: '',
    Editar: true
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, type: string}) {}
  ngOnInit() {
  }
  onSave() {
    if (this.data.type === 'create') {
      /// creating element
      /// check if any element is null
      if (!(this.createForm.Cantidad !== null && this.createForm.Cantidad >= 0) || !this.createForm.Editar || !this.createForm.Etiqueta
        || !this.createForm.Nombre || !(this.createForm.NumBodega !== null && this.createForm.NumBodega >= 0) ||
        !(this.createForm.NumLab !== null && this.createForm.NumLab >= 0)
        || !this.createForm.Observaciones || !this.createForm.PrepaProfe || !this.createForm.Unidades) {
          console.log('no valid');
          return;
        }
      /// submit data
    }
  }
}
