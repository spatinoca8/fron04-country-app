import { Country } from './../interfaces/country.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CountrySearchResponse } from '../interfaces/RESTCountry.interface';
import { CountryMapper } from '../mappers/country.mapper';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { Region } from '../interfaces/region.type';
const API_URL = 'https://api.restcountries.com/countries/v5';
const Token = 'rc_live_52dfea3f70ea450f8221b510636aab7c';
@Injectable({
  providedIn: 'root'
})

export class CountryService {

  private readonly http = inject(HttpClient);
  private  queryCacheCapital= new Map<string,Country[]>();
  private  queryCacheCountry = new Map<string,Country[]>();
  private queryCacheRegion= new Map<Region,Country[]>();
  private readonly headers = {
    Authorization: `Bearer ${Token}`
  };

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();
    // validanco si ya se hizo una consulta previa para no volverla a enviar 
    if(this.queryCacheCapital.has(query))
    {
        return of(this.queryCacheCapital.get(query!) ?? []);
    }
    console.log(`llegando al servidor por ${query}`)
    const params = new HttpParams()
      .set('q', query.toLowerCase())
    return this.http.get<CountrySearchResponse>(`${API_URL}/capitals`, { headers: this.headers, params })
      // esto es de rxjs
      .pipe(
        map((response) => CountryMapper.mapRESTCountriesToCountries(response.data.objects)),
        // aca se llena el map para almacenar clave valor 
        tap((countries)=> this.queryCacheCapital.set(query,countries)),
        // Retorna un observable con error
        catchError((error) => {
          console.error('Error al buscar países por capital:', error);
          return throwError(() => new Error('Error al buscar países por capital'));


        }));




  }

  searchByCountry(query: string): Observable<Country[]> {
    query = query.toLocaleLowerCase();

     if(this.queryCacheCountry.has(query))
    {
        return of(this.queryCacheCountry.get(query!) ?? []);
    }

     console.log(`llegando al servidor desde paises  por ${query}`)
    const params = new HttpParams()
      .set('q', query.toLowerCase())
    return this.http.get<CountrySearchResponse>(`${API_URL}/name`, { headers: this.headers, params })
      // esto es de rxjs
      .pipe(
        map((response) => CountryMapper.mapRESTCountriesToCountries(response.data.objects)),
        tap((countries)=> this.queryCacheCountry.set(query,countries)),
        delay(1000),
        // Retorna un observable con error
        catchError((error) => {
          console.error('Error al buscar países por pais:', error);
          return throwError(() => new Error('Error al buscar países por pais'));


        }));




  }

   searchByAphaCode(query: string): Observable<Country |undefined > {
    query = query.toLocaleLowerCase();
    return this.http.get<CountrySearchResponse>(`${API_URL}/codes.alpha_2/${query}`, { headers: this.headers })
      // esto es de rxjs
      .pipe(
        map((response) => CountryMapper.mapRESTCountriesToCountries(response.data.objects).at(0)),
       delay(1000),
        // Retorna un observable con error
        catchError((error) => {
          console.error('Error al buscar países por pais:', error);
          return throwError(() => new Error('No se encontro el pais con el codigo: ' + query));


        })
      );




  }

  searchByRegion(region: Region): Observable<Country[]> {
   

     if(this.queryCacheRegion.has(region))
    {
        return of(this.queryCacheRegion.get(region!) ?? []);
    }

     console.log(`llegando al servidor desde paises  por ${region}`)
 
    return this.http.get<CountrySearchResponse>(`${API_URL}/region/${region}`, { headers: this.headers })
      // esto es de rxjs
      .pipe(
        map((response) => CountryMapper.mapRESTCountriesToCountries(response.data.objects)),
        tap((countries)=> this.queryCacheRegion.set(region,countries)),
        delay(1000),
        // Retorna un observable con error
        catchError((error) => {
          console.error('Error al buscar países por pais:', error);
          return throwError(() => new Error('Error al buscar países por pais'));


        }));




  }

}

