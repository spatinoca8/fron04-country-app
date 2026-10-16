import { Component, computed, input } from '@angular/core';
import { Country } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-country-page-information',
  imports: [DecimalPipe],
  templateUrl: './country-page-information.component.html'
})
export class CountryPageInformationComponent {

  country =input.required<Country>();
  currentDate = computed(()=>{
    return new Date().getFullYear();
  })
}
