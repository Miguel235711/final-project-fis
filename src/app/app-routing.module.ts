import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './common/auth/login/login.component';
import { ForgotComponent} from './common/auth/forgot/forgot.component';
import { SignupComponent } from './common/auth/signup/signup.component';
import { NewsfeedComponent } from './common/newsfeed/newsfeed.component';
import { PracticesComponent } from './admin/practices/practices.component';
import { ExcelComponent } from './admin/inventory/excel/excel.component';
import { MygroupsComponent } from './admin/mygroups/mygroups.component';
import { SearchComponent } from './admin/inventory/search/search.component';
import { CheckComponent } from './admin/inventory/check/check.component';
import {AuthGuard} from './common/auth/auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'forgot' , component: ForgotComponent, canActivate: [AuthGuard]},
  {path: 'signup' , component: SignupComponent},
  {path: 'NewsFeed', component: NewsfeedComponent, canActivate: [AuthGuard]},
  {path: 'Practices', component: PracticesComponent, canActivate: [AuthGuard]},
  {path: 'Inventory', component: ExcelComponent, canActivate: [AuthGuard]},
  {path: 'MyGroups', component: MygroupsComponent, canActivate: [AuthGuard]},
  {path: 'Search', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'Check', component: CheckComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
