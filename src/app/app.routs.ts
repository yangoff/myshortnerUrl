import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RedirectComponent } from './redirect/redirect.component';



export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: ':id', component: RedirectComponent, pathMatch: 'full'}
];
