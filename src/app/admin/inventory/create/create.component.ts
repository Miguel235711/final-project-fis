import { Component, OnInit, Inject, Input} from '@angular/core';
import { ColorElement } from '../color-data.model';
import { TableElement } from '../tableElement-data.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {ItemService } from '../item-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import {UnsubscribeComponent} from '../unsubscribe/unsubscribe.component';
@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  displayedColumns: string[] = ['Unidades', 'Cantidad', 'Nombre', 'Etiqueta' , 'NumBodega', 'NumLab', 'Observaciones', 'PrepaProfe',
  'Editar'];
  levels: string[] = ['Prepa', 'Profe'];
  colors: ColorElement[] = [
    {value: 'yellow', viewValue: 'yellow', categoryMeaning: 'Volátiles'},
    {value: 'green', viewValue: 'green', categoryMeaning: 'Sales'},
    {value: 'cyan', viewValue: 'cyan', categoryMeaning: 'Ácidos'},
    {value: 'pink', viewValue: 'pink', categoryMeaning: 'Otros Reactivos'},
    {value: 'blue', viewValue: 'blue', categoryMeaning: 'Vidrio'},
    {value: 'orange', viewValue: 'orange', categoryMeaning: 'Otros Materiales'},
    {value: 'gray', viewValue: 'gray', categoryMeaning: 'Mobiliario'}
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
    Restaurar: true,
    _id: null
  };
  originalColor = '';
  constructor(
  @Inject(MAT_DIALOG_DATA) public data: {title: string, type: string, etiqueta: string, id: string, urlType: string},
  public itemService: ItemService,
  private dialogRef: MatDialogRef<UnsubscribeComponent>
  ) {}
  ngOnInit() {
    this.createForm.Etiqueta = this.data.etiqueta;
    if (this.data.type === 'edit') {
      this.itemService.getItem(this.data.id).subscribe(response => {
        // console.log('editing the item: ', response);
        this.originalColor = response.item.Etiqueta;
        this.createForm = response.item;
        /// console.log('createForm ' , this.createForm);
      });
    }
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
      this.itemService.createItem(this.createForm, this.data.urlType);
      /// update front end
    } else if (this.data.type === 'edit') {
      console.log('edit onSave()');
      this.itemService.updateItem(this.createForm, this.originalColor, this.data.urlType);
    }
    this.dialogRef.close();
  }
}
