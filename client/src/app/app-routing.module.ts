import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilComponent } from './components/profil/profil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { LoginComponent } from './components/login/login.component';

import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
  { path: '', component:HomeComponent},
  { path:'register', component:RegisterComponent},
  { path:'login',component:LoginComponent},
  { path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  { path:'profile',component:ProfilComponent,canActivate:[AuthGuard]},
  { path:'post',component:PostsComponent,canActivate:[AuthGuard]},


  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
