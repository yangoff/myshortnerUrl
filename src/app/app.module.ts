import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule } from 'angularfire2';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule,MatInputModule,MatIconModule} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RedirectComponent } from './redirect/redirect.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {ROUTES} from "./app.routs";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES,{preloadingStrategy:PreloadAllModules}),
  ],
  providers: [FormsModule,ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
