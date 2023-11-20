import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule, routes } from './app-routing.module';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token.interceptor.service';
import { AuthGuard } from './guard/auth.guard';
import { HttpClientModule }  from '@angular/common/http';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PostsComponent } from './components/posts/posts.component';
import { ProfilComponent } from './components/profil/profil.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';


@
NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PostsComponent,
    ProfilComponent,
    DashboardComponent,
    DashboardHeaderComponent,

  ],


  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  //injectiond de dépendance
  providers: [
    ValidateService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})

export class AppModule {}
