import { Component } from '@angular/core';
import { PostService } from 'src/services/post.service';
import { StorageService } from 'src/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts:any;
   
  constructor(private service:PostService, private storage: StorageService,private router: Router) {}
   
  ngOnInit() {
    if (this.storage.getData('username') == null) {
      console.log("Devi essere loggato");
      this.router.navigate(['login']);
    } else {
      this.service.getPosts()
        .subscribe(response => {
          this.posts = response;
        });
    }
  }
}
