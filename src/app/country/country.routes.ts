import { Routes } from '@angular/router';
import { CountryLayoutComponent } from './layout/country-layout/country-layout.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByContryPageComponent } from './pages/by-contry-page/by-contry-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';


export const countryRoutes: Routes = [

    {
        path: '',
        component: CountryLayoutComponent,
        children: [
            {
                path: 'by-capital',
                component: ByCapitalPageComponent
            },
            {
                path: 'by-country',
                component: ByContryPageComponent
            },
            {
                path: 'by-region',
                component: ByRegionPageComponent
            },
             {
                path: 'by/:code',
                component: ByRegionPageComponent
            },
            {
                path: '**',
                redirectTo: 'by-capital',
            },
        ]
    },
];

export default countryRoutes;