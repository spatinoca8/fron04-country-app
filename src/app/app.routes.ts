import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';


export const routes: Routes = [

    {
        path: '',
        component: HomePageComponent
    },
   //lazy loading es una tecnica que permite cargar modulos de manera diferida, es decir, solo cuando se necesitan, lo que mejora el rendimiento de la aplicacion y reduce el tiempo de carga inicial.
   {
       path:'country',
       loadChildren: () => import('./country/country.routes'),
    }, 
    {
        path:'**',
        redirectTo:''
    }
];
