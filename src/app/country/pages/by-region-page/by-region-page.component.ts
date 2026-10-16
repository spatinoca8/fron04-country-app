import { Region } from './../../interfaces/region.type';
import { Component, computed, inject, linkedSignal, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { Country } from '../../interfaces/country.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

function validateQueryParam(queryParam:string):Region
{
  queryParam = queryParam.toLocaleLowerCase();
   const validRegions:Record<string,Region>={
      'africa':'Africa',
    'americas':'Americas',
    'asia':'Asia', 
    'europe':'Europe',
    'oceania':'Oceania',
    'antarctic':'Antarctic',
   }
   return validRegions[queryParam] ??''
}

@Component({
  selector: 'app-by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
 countryService = inject(CountryService)
   countries = signal<Country[]>([]);
   
    public regions:Region[]=[
       'Africa',
    'Americas',
    'Asia', 
    'Europe',
    'Oceania',
    'Antarctic',
    ];

    activatedRoute = inject(ActivatedRoute);
router=inject(Router);
queryParam = this.activatedRoute.snapshot.queryParamMap.get('region')??'';
    selectedRegion = linkedSignal<Region>(()=>validateQueryParam(this.queryParam));
   
 
 countryResource = rxResource({

  request:()=>({region:this.selectedRegion()}),
  loader:({request})=>{
    if(!request.region) return of([])
      this.router.navigate(['/country/by-region'],
    { queryParams:{
      region:request.region
    }})
    return this.countryService.searchByRegion(request.region! ?? null);
  }
 })
}
