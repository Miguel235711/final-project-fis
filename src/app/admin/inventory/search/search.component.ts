import { Component, OnInit, Input } from '@angular/core';
import { ItemService } from '../item-data.service';
import { Subscription } from 'rxjs';
import {Filter } from './filter.model';
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
  @Input() title = 'Buscar elemento';
  @Input() urlType = 'Search';
  @Input() initialCriteria='';
  keyword: string;
  color: string;
  colors: ColorElement[] = [
    {value: 'yellow', viewValue: 'yellow', categoryMeaning: 'Volátiles'},
    {value: 'green', viewValue: 'green', categoryMeaning: 'Sales'},
    {value: 'cyan', viewValue: 'cyan', categoryMeaning: 'Ácidos'},
    {value: 'pink', viewValue: 'pink', categoryMeaning: 'Otros Reactivos'},
    {value: 'blue', viewValue: 'blue', categoryMeaning: 'Vidrio'},
    {value: 'orange', viewValue: 'orange', categoryMeaning: 'Otros Materiales'},
    {value: 'gray', viewValue: 'gray', categoryMeaning: 'Mobiliario'},
    {value: 'white', viewValue: 'white', categoryMeaning: 'Todas'}
  ];
  ngOnInit() {
    const filterElement: Filter = {
      keyword: '',
      color: '',
      Activo: this.urlType !== 'Unsubscribe'
    };
    if(this.initialCriteria!=='none'){
      this.itemService.getItemsFiltered(filterElement);
    }
    console.log('urlType in search component: ', this.urlType);
  }
  onSearch() {
    console.log('keyword', this.keyword);
    console.log('reactivo', this.color);
    const filterElement: Filter = {
      keyword: this.keyword,
      color: this.color,
      Activo: this.urlType !== 'Unsubscribe'
    };
    this.itemService.getItemsFiltered(filterElement);
  }
}
