import { Component, Inject, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

export class RegisterComponent implements OnInit {


  username!: string;
  email!: string;
  password!: string;
  communaute!: string

  constructor(private validateService: ValidateService,
  	          private authService: AuthService,
              private router: Router,


            ) {}

  ngOnInit(): void {

  }

  registerUser(): void{

  	 const user={
  	 	username:this.username,
  	 	email:this.email,
  	 	password:this.password
  	 };

  	if(!this.validateService.validateRegister(user)) {
      alert('Veuillez entrer tous les champs');
      return ;
    }


    if(!this.validateService.validateEmail(user.email)) {
    alert('Entrez une adresse mail valide');
      return ;
    }


     this.authService.register(this.username, this.email, this.communaute, this.password).subscribe((data :any) => {
    if(data.success) {
      alert('Votre compte a été crée et vous pouvez vous connecter');
      this.router.navigate(['/login']);
    } else {
      alert(data.msg)
      this.router.navigate(['/register']);
    }
  });



  }



}

/* export class RegisterComponent {
    username!: string;
    email!: string;
    password!: string;
    communaute!: string;

    constructor(
      private authService: AuthService,
      private validateService: ValidateService,
      private router: Router,
      private http: HttpClient

    ){}

    onRegisterSubmit(): void{
      const user = {
        username : this.username,
        email: this.email,
        password: this.password,
        communaute: this.communaute,
      };

      //required field
      if(!this.validateService.validateRegister(user)){
        console.log('remplissez tous les champs');
        return ;
      }

      //validate email
     if(!this.validateService.validateEmail(user.email)){
      console.error('entrez un email valide');
      return;
     }

     //register user
     this.authService.register(user.username, user.email,user.password,user.communaute).subscribe(data=> {
      if (data.success){
        console.log('you are now register and you can log in');
        this.router.navigate(['/login']);
      }else{
        console.error('quelque chose s est mal passé');
        this.router.navigate(['/register']);
      }
     });
    }

} */
