
import { Component, OnInit } from '@angular/core';
import { Observable, merge, of } from 'rxjs';
import { Subject } from 'rxjs';
import {  delay, mergeMap } from 'rxjs/operators';

interface Weather {
  city: string;
  temperature: number;
  humidity: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  displayWeather: Weather[] = [];
  citySubjects$ = new Subject<string>();

  ngOnInit() {
    this.citySubjects$.pipe(mergeMap((city)=> {
      return this.getWeather(city).pipe(delay(1000));
    })).subscribe((weather: Weather) => {
      this.displayWeather.push(weather);
    })
  }

  submitCity(city: string) {
    this.citySubjects$.next(city);
  }

  getWeather(city: string): Observable<Weather> {
    const weatherDataMap: { [key: string]: Weather } = {
      seattle: {
        city: 'Seattle',
        temperature: 73,
        humidity: 41,
      },
      'new york city': {
        city: 'New York City',
        temperature: 73,
        humidity: 41,
      },
      'los angeles': {
        city: 'Los Angeles',
        temperature: 73,
        humidity: 41,
      },
    };

    return of(weatherDataMap[city]);
  }
}
