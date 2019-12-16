import { Component, OnInit , Input } from '@angular/core';

@Component({
  selector: 'app-image-context-placeholder',
  templateUrl: './image-context-placeholder.component.html',
  styleUrls: ['./image-context-placeholder.component.css']
})
export class ImageContextPlaceholderComponent implements OnInit {

  constructor() { }
  @Input() imgPath = '';
  ngOnInit() {
    if(this.imgPath===''){
      this.imgPath='no image found';
    }
  }
}
