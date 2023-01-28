import {Component} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Emitters} from '../../emitters/emitters';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  api_url =  "http://localhost:8000/";
  authenticated = false;
  user :  any;
  mes = "";
  email!: string;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService, 
  ) {}

  ngOnInit(): void {
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
