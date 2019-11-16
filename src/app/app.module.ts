import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatRadioModule,
  MatMenuModule,
  MatSelectModule,
  MatOptionModule,
  MatTableModule,
  MatIconModule
} from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForgotComponent } from './auth/forgot/forgot.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { PracticesComponent } from './practices/practices.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MygroupsComponent } from './mygroups/mygroups.component';
import { SearchComponent } from './search/search.component';
import { CheckComponent } from './check/check.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ForgotComponent,
    SignupComponent,
    NewsfeedComponent,
    PracticesComponent,
    InventoryComponent,
    MygroupsComponent,
    SearchComponent,
    CheckComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatMenuModule,
    MatSelectModule,
    MatOptionModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
