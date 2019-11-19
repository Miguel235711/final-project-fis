import { Component, OnInit } from '@angular/core';
import { CreateService } from './create.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  constructor(public createService: CreateService) {}
  ngOnInit() {
  }
  /*onEdit(eventElement) {
    console.log('onEdit method', eventElement);
  }*/
}
