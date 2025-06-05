import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  inputTemperature = 0;
  originalTemperature = 0;
  displayTemperatureText = '';
  isCelsius = false;
  isTouched = false;
  temperature$ = new Subject<number>();

  ngOnInit() {
    this.temperature$.subscribe((temperature) => {
      if(this.isCelsius) {
        this.displayTemperatureText = temperature.toString() + '°C';
      }
      else{
        this.displayTemperatureText = temperature.toString() + '°F';
      }
      this.inputTemperature = temperature;
      this.isTouched = true;

    });
  }

  setTemperature() {
    this.originalTemperature = this.inputTemperature;
    this.isCelsius = false;
    this.temperature$.next(this.inputTemperature);
  }

  setInputTemperature(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.inputTemperature = parseInt(input);
  }

  convertToCelsius() {
    this.isCelsius = true;
    const celsiusTemperature = ((this.inputTemperature - 32) * 5) / 9;
    this.temperature$.next(celsiusTemperature);
  }

  convertToFahrenheit() {
    this.isCelsius = false;
    const fahrenheitTemperature = (this.inputTemperature * 9) / 5 + 32;
    this.temperature$.next(fahrenheitTemperature);
  }
}
