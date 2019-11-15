import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ForgotComponent} from './auth/forgot/forgot.component';
import { SignupComponent } from './auth/signup/signup.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { PracticesComponent } from './practices/practices.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MygroupsComponent } from './mygroups/mygroups.component';
import { SearchComponent } from './search/search.component';
import { CheckComponent } from './check/check.component';


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
