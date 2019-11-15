import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  dataSource = ['1', '2', '3'];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  constructor() { }

  ngOnInit() {
  }

}
