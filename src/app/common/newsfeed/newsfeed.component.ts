import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-data.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  genreSuffix = 'a';
  constructor(public authService: AuthService) { }
  ngOnInit() {
    if (this.authService.getGenre() === 'Hombre'){
      this.genreSuffix = 'o';
    }
    if (this.authService.getGenre() === 'Otro'){
      this.genreSuffix = 'o(a)';
    }
  }

}
