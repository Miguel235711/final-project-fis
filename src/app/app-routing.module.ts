import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ForgotComponent} from './forgot/forgot.component';
import { SignupComponent } from './signup/signup.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { PracticesComponent } from './practices/practices.component';
import { InventoryComponent } from './inventory/inventory.component';
import { MygroupsComponent } from './mygroups/mygroups.component';


const routes: Routes = [
  {path: '', component: LoginComponent },
  {path: 'forgot' , component: ForgotComponent },
  {path: 'signup' , component: SignupComponent},
  {path: 'NewsFeed', component: NewsfeedComponent},
  {path: 'Practices', component: PracticesComponent},
  {path: 'Inventory', component: InventoryComponent},
  {path: 'MyGroups', component: MygroupsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
