import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ItemService } from '../item-data.service';
import { AuthService } from 'src/app/common/auth/auth-data.service';

@Component({
  selector: 'app-unsubscribe',
  templateUrl: './unsubscribe.component.html',
  styleUrls: ['./unsubscribe.component.css']
})
export class UnsubscribeComponent implements OnInit {
  genreFinish = 'a';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {etiqueta: string, id: string},
    public itemService: ItemService,
    public authService: AuthService
    ,
    private dialogRef: MatDialogRef<UnsubscribeComponent>
  ) {}

  ngOnInit() {
    if (this.authService.getGenre() === 'Hombre') {
      this.genreFinish = 'o';
    }
    console.log('genre', this.authService.getGenre());
  }
  onUnsubscribe() {
    console.log('onUnsubscribe this.data', this.data);
    this.itemService.unsubscribeItem(this.data.etiqueta, this.data.id);
    this.dialogRef.close();
  }
}
