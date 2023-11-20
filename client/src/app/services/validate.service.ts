import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


interface RegisterData {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }
//validations du formulaire register
  validateRegister(user: RegisterData) {
    if(user.username == undefined || user.email == undefined  || user.password == undefined) {
        return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isValidLogin(user:User){
    if(user.email==undefined || user.password==undefined)
    {
      return false;
    }else{
      return true;
    }
  }
  isValideUpdate(user:User){

    if (user.username == undefined || user.email == undefined || user.communaute==undefined
      ) {

        return false;
    }else{
      return true;
    }
  }
}
