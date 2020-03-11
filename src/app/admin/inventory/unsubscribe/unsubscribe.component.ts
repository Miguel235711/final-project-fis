import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ItemService } from '../item-data.service';
import { AuthService } from 'src/app/common/auth/auth-data.service';
import { TableElement } from '../tableElement-data.model';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
  genreFinish = 'a';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {title: string, description: string, etiqueta: string, id: string, urlType: string},
    public itemService: ItemService,
    public authService: AuthService
    ,
    private dialogRef: MatDialogRef<UnsubscribeComponent>
  ) {}

  ngOnInit() {
  }
  onUnsubscribe() {
    console.log('onUnsubscribe this.data', this.data);
    if (this.data.urlType === 'Search' || this.data.urlType === 'Check') {
      this.itemService.unsubscribeItem(this.data.etiqueta, this.data.id, this.data.urlType);
    } else if (this.data.urlType === 'Recovery') {
      /// recover
      this.itemService.recoverItem(this.data.id);
    } else {
      console.log('Error in unsubscribe component, urltype is not valid -> ', this.data.urlType );
    }
    this.dialogRef.close();
  }
}
