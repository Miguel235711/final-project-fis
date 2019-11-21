import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ItemService } from '../item-data.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {etiqueta: string, id: string},
    public itemService: ItemService,
    private dialogRef: MatDialogRef<UnsubscribeComponent>
  ) {}

  ngOnInit() {
  }
  onUnsubscribe() {
    console.log('onUnsubscribe this.data', this.data);
    this.itemService.unsubscribeItem(this.data.etiqueta, this.data.id);
    this.dialogRef.close();
  }
}
