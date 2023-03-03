import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
   
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = environment.baseUrlServer + 'all';
    
  constructor(private httpClient: HttpClient) { }
   
  getPosts(){
    return this.httpClient.get(this.url);
  }
   
}