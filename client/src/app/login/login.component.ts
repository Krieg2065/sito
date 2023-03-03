import { Component, OnInit ,NgModule} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/services/storage.service';
import { Data } from 'src/models/login.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  passw: string = '';
  url: string = environment.baseUrlServer + "login/data";
  form!: FormGroup;
  data!: any;
  constructor(
    public http: HttpClient,
    private fb: FormBuilder,
    private storage: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if(this.storage.getData('id') != null) this.router.navigate(['home']);

    this.form = this.fb.group({
      email: ["", [Validators.required]],
      password: ["", [Validators.required]]
    });
  }
  submit(): void {
    let body: HttpParams = new HttpParams();
    body = body.appendAll({
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
      if (data.errore != "") {
        console.log(data.errore);
      } else {
        this.data = data.data
        this.storage.saveData('email', data.data.email);
        this.storage.saveData('id', data.data.id.toString());
        this.storage.saveData('username', data.data.username);

        this.router.navigate(['home']);
      }
    });
  }
}