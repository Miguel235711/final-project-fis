import { Injectable } from '@angular/core';
import {CreateComponent } from '../create/create.component';
import {MatDialog} from '@angular/material';

@Injectable({providedIn: 'root'})
export class CreateService {
  constructor(private dialog: MatDialog) {}
  onCreate(clickedElement, Etiqueta: string, id: string) {
    console.log('id:' , id);
    const name = clickedElement._elementRef.nativeElement.name;
    console.log('clickedElement: ', clickedElement);
    console.log('etiqueta:', Etiqueta);
    if (name === 'addButton') {
      console.log('addButton identified');
      this.dialog.open(CreateComponent, { data: { title: 'Alta de ITEM' , type: 'create' , etiqueta: Etiqueta , id }} );
    } else if (name === 'editButton') {
      console.log('edit button identified');
      this.dialog.open(CreateComponent, {data: {title: 'Edición de ITEM', type: 'edit' , etiqueta: Etiqueta , id } } );
    }
  }
}
