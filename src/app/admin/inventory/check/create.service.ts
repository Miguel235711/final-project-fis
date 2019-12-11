import { Injectable } from '@angular/core';
import {CreateComponent } from '../create/create.component';
import {UnsubscribeComponent} from '../unsubscribe/unsubscribe.component';
import {MatDialog} from '@angular/material';
import { AuthService } from 'src/app/common/auth/auth-data.service';

@Injectable({providedIn: 'root'})
export class CreateService {
  constructor(private dialog: MatDialog, public authService: AuthService) {}
  onCreate(clickedElement, Etiqueta: string, id: string, urlType: string) {
    console.log('id:' , id);
    const name = clickedElement._elementRef.nativeElement.name;
    console.log('clickedElement: ', clickedElement);
    console.log('etiqueta:', Etiqueta);
    if (name === 'addButton') {
      console.log('addButton identified');
      this.dialog.open(CreateComponent, { data: { title: 'Alta de ITEM' , type: 'create' , etiqueta: Etiqueta , id, urlType}} );
    } else if (name === 'editButton') {
      console.log('edit button identified');
      this.dialog.open(CreateComponent, {data: {title: 'Edición de ITEM', type: 'edit' , etiqueta: Etiqueta , id , urlType } } );
    }
  }
  onDelete(etiqueta: string , id: string, urlType: string) {
    console.log('onDelete color', etiqueta);
    console.log('onDelete id', id);
    this.dialog.open(UnsubscribeComponent, {
      data: {
        title: 'Baja de ITEM' ,
        description: `¿Estás segur${this.authService.getGenreEnding()} de remover el item?`,
        etiqueta,
        id,
        urlType
      }}
    );
  }
  onRecover(id: string) {
    this.dialog.open(UnsubscribeComponent, {
      data: {
        title: 'Restauración de ITEM',
        description: `¿Estás segur${this.authService.getGenreEnding()} de restaurar el item?`,
        id,
        urlType: 'Recovery'
      }}
    );
  }
}
