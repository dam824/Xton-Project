import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email!: string;
  password!: string;

  constructor(private authService: AuthService,
    private validateService: ValidateService,
    private router: Router) { }

  ngOnInit(): void {
  }

  loginUser(): void {
    const user = {
      email: this.email,
      password: this.password
    };

    // Validation de l'email et du mot de passe
    if(!this.validateService.validateEmail(user.email)) {
      alert('Veuillez entrer une adresse e-mail valide');
      return;
    }

    if(!user.password) {
      alert('Veuillez entrer un mot de passe');
      return;
    }


 // Appel au service AuthService pour se connecter
    this.authService.login(user.email, user.password).subscribe((data: any) => {
      console.log(data);
      if(data.token) {
        this.authService.storeUserData(data.token, user);
        alert('Vous êtes maintenant connecté');
        this.router.navigate(['/dashboard']).catch(err => console.error('erreur de navigation' , err));
      } else {
        alert('Échec de la connexion : ' + data.msg);
      }
    });
  }



}
