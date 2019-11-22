import { Component, OnInit, NgModule } from '@angular/core';
import {TableElement} from '../tableElement-data.model';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  constructor() { }
  tableElements: TableElement[] = [];
  ngOnInit() {
  }
  onExcelPicked(event: Event) {

  }

}
