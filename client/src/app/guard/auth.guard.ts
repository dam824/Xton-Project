import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'

})


// security routes access
export class AuthGuard{

   constructor(private authService: AuthService,private route:Router)
   {

   }

   canActivate(): boolean{

   	if(this.authService.isLoggedIn()){
        return true;
   	}else{

        this.route.navigate(['login']);
        return false;
   	}

   }
}
