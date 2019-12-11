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
  MatIconModule,
  MatGridListModule,
  MatProgressBarModule
} from '@angular/material';

import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './common/auth/login/login.component';
import { HeaderComponent } from './common/header/header.component';
import { ForgotComponent } from './common/auth/forgot/forgot.component';
import { SignupComponent } from './common/auth/signup/signup.component';
import { NewsfeedComponent } from './common/newsfeed/newsfeed.component';
import { PracticesComponent } from './admin/practices/practices.component';
import { MygroupsComponent } from './admin/mygroups/mygroups.component';
import { SearchComponent } from './admin/inventory/search/search.component';
import { CheckComponent } from './admin/inventory/check/check.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './common/error/error.component';
import { SuccessInterceptor } from './success-interceptor';
import { CreateComponent } from './admin/inventory/create/create.component';
import { TableComponent } from './admin/inventory/check/table/table.component';
import { AuthInterceptor } from './common/auth/auth-interceptor';
import { UnsubscribeComponent } from './admin/inventory/unsubscribe/unsubscribe.component';
import { AuthGuard } from './common/auth/auth.guard';
import { RecoveryComponent } from './admin/inventory/recovery/recovery.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ForgotComponent,
    SignupComponent,
    NewsfeedComponent,
    PracticesComponent,
    MygroupsComponent,
    SearchComponent,
    CheckComponent,
    ErrorComponent,
    CreateComponent,
    TableComponent,
    UnsubscribeComponent,
    RecoveryComponent,
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
    MatIconModule,
    MatGridListModule,
    FlexLayoutModule,
    MatProgressBarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SuccessInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    [AuthGuard]
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, CreateComponent, UnsubscribeComponent]
})
export class AppModule { }
