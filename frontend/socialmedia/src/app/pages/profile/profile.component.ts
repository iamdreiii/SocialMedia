import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {Emitters} from '../../emitters/emitters';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  authenticated = false;
  user :any;
  mes = "";
  email!: string;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService, 
  ) {}
  
  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) =>{
        this.authenticated = auth;
      }
     );
    this.getuser();
  }
  
  getuser(): void {
    const url = 'http://localhost:8000/api/user';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(url, { headers }).subscribe(response => {
      Emitters.authEmitter.emit(true);
      this.user = response;
    },
    error => {
      this.mes = 'Log in first';
      Emitters.authEmitter.emit(false);
    });
  }
}
