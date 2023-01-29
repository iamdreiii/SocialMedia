import {Component} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Emitters} from '../../emitters/emitters';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  api_url =  "http://localhost:8000/";
  authenticated = false;
  user: any;
  mes = "";
  postForm!: FormGroup;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService, 
    private formBuilder: FormBuilder,
    private router : Router
  ) {
    //this.getuser();
  }

  ngOnInit(): void {
    this.getuser();
    this.postForm = this.formBuilder.group({
      email : '',
      content: '' 
    });   
    Emitters.authEmitter.subscribe(
      (auth: boolean) =>{
        this.authenticated = auth;
      }
     );
  }
  post(): void {
      this.http.post('http://localhost:8000/api/post', this.postForm.getRawValue())
      .subscribe(res => {
        console.log(res);
        // $('#postForm').modal('hide');
        this.router.navigate(['/home']);
        console.log('POSTED');
      });
     // console.log('POSTED');
  }
  getuser(): void {
    const url = 'http://localhost:8000/api/user';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(url, { headers }).subscribe(res => {
      Emitters.authEmitter.emit(true);
      this.user = res;
    },
    error => {
      this.mes = 'Log in first';
      Emitters.authEmitter.emit(false);
    });
  }
}
