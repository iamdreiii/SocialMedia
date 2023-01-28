import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TestComponent } from './components/test/test.component';
import { FriendlistComponent } from './pages/friendlist/friendlist.component';
const routes: Routes = [
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'profile', component:ProfileComponent},
  {path:'friends', component:FriendlistComponent},
  {path:'test', component:TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
