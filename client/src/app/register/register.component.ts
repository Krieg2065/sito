import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Data } from 'src/models/redirectData.model';
import { StorageService } from 'src/services/storage.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  url: string = environment.baseUrlServer;
  form!: FormGroup;
  errorMessage!: string;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private router: Router,
    private storage: StorageService
    ) { }

  ngOnInit(): void {
    if(this.storage.getData('id') != null) this.router.navigate(['home']);

    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  submit() {
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
      name: this.form.value.name,
      email: this.form.value.email,
      password: this.form.value.password
    });

    this.http.post<Data>(this.url, '', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: body,
      responseType: "json"
    }).subscribe(data => {
      console.log(data.data);

      if(data.url != null) {
        this.router.navigate([data.url]);
      } else {
        this.errorMessage = data.data;
      }
    })
  }
}