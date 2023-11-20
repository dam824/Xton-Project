import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  //create new post
  createPost(postData: any): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('token')
    });
    return this.http.post<any>(`${this.apiUrl}/posts`, postData, { headers })
  }

  //fetch post
  getPosts(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/posts`);
  }

  //update post
  updatePost(postId: string, postData:any ): Observable<any>{
    const headers = new HttpHeaders({
      Authorization:'Bearer'+ localStorage.getItem('token')
    });
    return this.http.put<any>(`${this.apiUrl}/posts/${postId}`, postData, { headers });
  }

  //delete post
  deletePost(postId: string): Observable<any>{
    const headers = new HttpHeaders({
      Authorization: 'Bearer' + localStorage.getItem('token')
    });
    return this.http.delete<any>(`${this.apiUrl}/posts/${postId}`, { headers })
  }
}
