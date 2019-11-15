import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }
  reactives = ['Volátiles','Sales','Ácidos','Otros']
  materials = ['Vidrio','Otros']
  furnitures = ['Mobiliario']
  ngOnInit() {
  }

}
