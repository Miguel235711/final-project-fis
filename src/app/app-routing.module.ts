import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './common/auth/login/login.component';
import { ForgotComponent} from './common/auth/forgot/forgot.component';
import { SignupComponent } from './common/auth/signup/signup.component';
import { NewsfeedComponent } from './common/newsfeed/newsfeed.component';
import { PracticesComponent } from './admin/practices/practices.component';
import { InventoryComponent } from './admin/inventory/inventory.component';
import { MygroupsComponent } from './admin/mygroups/mygroups.component';
import { SearchComponent } from './admin/search/search.component';
import { CheckComponent } from './admin/check/check.component';


const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'forgot' , component: ForgotComponent },
  {path: 'signup' , component: SignupComponent},
  {path: 'NewsFeed', component: NewsfeedComponent},
  {path: 'Practices', component: PracticesComponent},
  {path: 'Inventory', component: InventoryComponent},
  {path: 'MyGroups', component: MygroupsComponent},
  {path: 'Search', component: SearchComponent},
  {path: 'Check', component: CheckComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
