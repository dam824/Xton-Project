import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { environment } from '../environnments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl: string = environment.apiBaseUrl;
  private authToken: any;
  private user: any;


  constructor(private http: HttpClient) { }

  //post request register user
  register(username:string, email:string, communityName:string, password:string): Observable<any>{
    const body: any = {
      username,
      email,
      communityName,
      password
    };
    return this.http.post<any>(this.apiUrl + 'auth/register', body);
  }

  //post request to login an existing user
  login(email:string, password:string): Observable<any>{
    const body:any = {
      email,
      password
    };
    return this.http.post<any>(this.apiUrl+ 'auth/login', body);
  }



  //GET request to get currently logged in user
  getCurrentUser(): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('token')
    });
    return this.http.get<any>(this.apiUrl+'users/current', { headers });
  }

  //Put request to update currently user logged
  updadeCurrentUser(username: string, email:string, communityName: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization:'Bearer'+localStorage.getItem('token')
    });
    const body:any = {
      username,
      email,
      communityName
    };
    return this.http.put<any>(this.apiUrl + 'users/current', body, { headers });
  }

  //Delete user
  deleteCurrentUser(): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('token')
    });
    return this.http.delete<any>(this.apiUrl + 'users/current', { headers });
  }

  //token
  storeUserData(token: string, user: any): void{
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(): string {
    const token = localStorage.getItem('id_token') || '';
    this.authToken = token;
    return token;
  }

  //check if user is logged in
  isLoggedIn(): boolean {
    // Vérifie si un token existe dans le localStorage et renvoie true s'il est non nul.
    return !!localStorage.getItem('token') !==null;
  }

  //logs the user out by removing token from local storage
  logout(): void {
    localStorage.removeItem('token');
  }


}
