import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NonfoundComponent } from '../../../shared/component/nonfound/nonfound.component';
import { CountryPageInformationComponent } from './country-page-information/country-page-information.component';


@Component({
  selector: 'app-country-page',
  imports: [NonfoundComponent, CountryPageInformationComponent],
  templateUrl: './country-page.component.html',
  styles: ``
})
export class CountryPageComponent {
 countryCode = inject(ActivatedRoute).snapshot.paramMap.get('code');
 countryService = inject(CountryService)
 
 countryResource = rxResource({

  request:()=>({code:this.countryCode}),
  loader:({request})=>{
    return this.countryService.searchByAphaCode(request.code??'');
  }
 })
}
