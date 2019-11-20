import { Component, OnInit, Inject} from '@angular/core';
import { ColorElement } from '../color-data.model';
import { TableElement } from '../tableElement-data.model';
import { MAT_DIALOG_DATA } from '@angular/material';
import {ItemService } from '../item-data.service';
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
    Editar: true,
    Borrar: true,
    _id: null
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, type: string, etiqueta: string}, public itemService: ItemService) {}
  ngOnInit() {
    this.createForm.Etiqueta = this.data.etiqueta;
  }
  onSave() {
    if ( this.data.type === 'create') {
      /// creating element
      /// check if any element is null
      console.log('create onSave()');
      if (!(this.createForm.Cantidad !== null && this.createForm.Cantidad >= 0) || !this.createForm.Editar || !this.createForm.Etiqueta
        || !this.createForm.Nombre || !(this.createForm.NumBodega !== null && this.createForm.NumBodega >= 0) ||
        !(this.createForm.NumLab !== null && this.createForm.NumLab >= 0)
        || !this.createForm.Observaciones || !this.createForm.PrepaProfe || !this.createForm.Unidades) {
          console.log('no valid');
          return;
        }
      /// submit data
      this.itemService.createItem(this.createForm, this.createForm.Etiqueta);
      /// update front end
    } else if (this.data.type === 'edit') {
      console.log('edit onSave()');
    }
  }
}
