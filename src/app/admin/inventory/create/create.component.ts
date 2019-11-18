import { Component, OnInit , Inject } from '@angular/core';
import {MAT_DIALOG_DATA } from '@angular/material';
import { ColorElement } from '../color-data.model';

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
  selectedColor = '';
  onChange(value) {
    console.log(value.target.value);
    this.selectedColor = value;
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string}) {}
  ngOnInit() {
  }

}
