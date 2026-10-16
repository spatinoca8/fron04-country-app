import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountrySearchComponent } from '../../components/country-search/country-search.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Country } from '../../interfaces/country.interface';
import {  of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-by-contry-page',
  imports: [CountrySearchComponent, CountryListComponent],
  templateUrl: './by-contry-page.component.html',
  styles: ``
})
export class ByContryPageComponent {
countries = signal<Country[]>([]);



private readonly countryService = inject(CountryService);

activatedRoute = inject(ActivatedRoute);
router=inject(Router);
queryParam = this.activatedRoute.snapshot.queryParamMap.get('query')??'';
query = signal(this.queryParam);
countryResource = rxResource({
  // es recomendale que el request sea un objeto 
  request:()=>({query:this.query()}),
  loader:({request})=>{
    if(!request.query) return of([]);
     this.router.navigate(['/country/by-country'],
    { queryParams:{
      query:request.query
    }})
    return  this.countryService.searchByCountry(request.query);
  }
});
}
