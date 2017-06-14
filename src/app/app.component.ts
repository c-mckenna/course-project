import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  loadedFeature = 'recipes';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyD2zqT0LCtSQT3mkOzevoWySkOr0lRntBA',
      authDomain: 'ng-recipe-book-c56da.firebaseapp.com',
    });
  }

  onNavigate(feature) {
    this.loadedFeature = feature;
  }

}
