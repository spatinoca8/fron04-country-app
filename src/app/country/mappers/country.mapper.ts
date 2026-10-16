import { RESTCountry } from './../interfaces/RESTCountry.interface';
import { Country } from "../interfaces/country.interface";
import { CountryListItem } from "../interfaces/RESTCountry.interface";
import { Subject } from 'rxjs';

export class CountryMapper {
  static mapRESTCountryToCountry(restCountry: CountryListItem): Country {
    return {
      code: restCountry.codes.alpha_2,
      flagEmogi: restCountry.flag.emoji,
      flagUrl: restCountry.flag.url_png,
      nameCommon: restCountry.names.translations['spa'].common ?? 'No tiene nombre en español',
      capitalName: restCountry.capitals[0]?.name || '',
      population: restCountry.population,
      region:restCountry.region,
      subRegion:restCountry.subregion
    };
  }

  static mapRESTCountriesToCountries(restCountries:CountryListItem[]): Country[] {
    return restCountries.map(this.mapRESTCountryToCountry);
  }
}