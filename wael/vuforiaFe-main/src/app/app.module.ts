import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { GalleryComponent } from './gallery/gallery.component';
import {AuthGuard} from "./auth.guard";
import {AuthServiceService} from "./auth-service.service";
import { MainpageComponent } from './mainpage/mainpage.component';
import { JobformComponent } from './jobform/jobform.component';
import { HeaderComponent } from './header/header.component';
import {Services} from './services';
import {MatGridListModule} from "@angular/material/grid-list";

export function tokenGetter(): any {
  console.log("tokenGetter called");
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GalleryComponent,
    MainpageComponent,
    JobformComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatGridListModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // Add this import here
    JwtModule.forRoot({
      config: {
         tokenGetter,
        allowedDomains: ['localhost:7003'],
        disallowedRoutes: ['localhost:7003/api/auth']
      }
    })

  ],
  providers: [AuthServiceService,

    AuthGuard, Services],
  bootstrap: [AppComponent]
})
export class AppModule { }
