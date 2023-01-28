import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent  implements OnInit{
  user: any;
  authenticated = false;
  cookieValue: any;
   constructor(
    private http: HttpClient,
    private cookieService: CookieService, 
    private router: Router
   ) {
   }
   ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) =>{
        this.authenticated = auth;
      }
     );
     //this.getuser();
   }
   
  refresh() {
    this.http.post('http://localhost:8000/api/refresh', {}).subscribe(data => {
      console.log(data);
    });
    
  }
  getuser(): void {
    const url = 'http://localhost:8000/api/user';
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(url, { headers }).subscribe(response => {
      this.user = response;
    },
    error => {
      this.user = 'Log in first';
    });
  }
  logout() {
    
    return this.http.post('http://localhost:8000/api/logout', {})
      .subscribe(
        data => {
          this.authenticated = false;
          this.user = false;
          localStorage.removeItem('token');
          this.cookieService.delete('refresh_token');
          this.cookieService.deleteAll();
          console.log("Logout successful");
          Emitters.authEmitter.emit(false);
          this.router.navigate(['/login']);
        },
        error => {
          console.log("Error while logging out: ", error);
        }
      );
  }

}
