import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item-data.service';
import { Subscription } from 'rxjs';
import {Filter } from './filter.model';
import {TableElement } from '../tableElement-data.model';
import {ColorElement} from '../color-data.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public itemService: ItemService) { }
  itemServiceSubs: Subscription = new Subscription();
  reactives = ['Volátiles', 'Sales', 'Ácidos', 'Otros'];
  materials = ['Vidrio', 'Otros'];
  furnitures = ['Mobiliario'];
  keyword: string;
  color: string;
  colors: ColorElement[] = [
    {value: 'yellow', viewValue: 'yellow'},
    {value: 'green', viewValue: 'green'},
    {value: 'cyan', viewValue: 'cyan'},
    {value: 'blue', viewValue: 'blue'},
    {value: 'orange', viewValue: 'orange'},
    {value: 'gray', viewValue: 'gray'},
    {value: 'white', viewValue: 'white'}
  ];
  ngOnInit() {
    const filterElement: Filter = {
      keyword: '',
      color: ''
    };
    this.itemService.getItemsFiltered(filterElement);
  }
  onSearch() {
    console.log('keyword', this.keyword);
    console.log('reactivo', this.color);
    const filterElement: Filter = {
      keyword: this.keyword,
      color: this.color
    };
    this.itemService.getItemsFiltered(filterElement);
  }
}
