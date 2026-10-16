import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, signal } from '@angular/core';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountrySearchComponent } from '../../components/country-search/country-search.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';


@Component({
  selector: 'app-by-capital-page',
  imports: [CountrySearchComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
  
})
export class ByCapitalPageComponent {

private readonly countryService = inject(CountryService);

activatedRoute = inject(ActivatedRoute);
router=inject(Router);
queryParam = this.activatedRoute.snapshot.queryParamMap.get('query')??'';
query = signal(this.queryParam);
// asi se solucionaria con promesas
// countryResource = resource({
//   // es recomendale que el request sea un objeto 
//   request:()=>({query:this.query()}),
//   loader:async({request})=>{
//     if(!request.query) return [];
//     return await firstValueFrom(this.countryService.searchByCapital(request.query));
//   }
// });

countryResource = rxResource({
//   // es recomendale que el request sea un objeto 
   request:()=>({query:this.query()}),
   loader:({request})=>{
    console.log({query:this.query()})
     if(!request.query) return of([]);
     this.router.navigate(['/country/by-capital'],
    { queryParams:{
      query:request.query
    }

     })
    return this.countryService.searchByCapital(request.query);
  }
});

// isLoading= signal(false);
// isError = signal<string | null>(null);
// countries = signal<Country[]>([]);


// onSearch(value: string) {
//   if(this.isLoading()) return;
//   this.isLoading.set(true);
//   this.isError.set(null);
//   this.countryService.searchByCapital(value).subscribe({
//     next: (response) => {
//       this.countries.set(response);
//       this.isLoading.set(false);
//     },
//     error: () => {
//       this.isLoading.set(false);
//       this.countries.set([]);
//       this.isError.set('Error al cargar los países.');
      
//     }
//   });
// }
}
