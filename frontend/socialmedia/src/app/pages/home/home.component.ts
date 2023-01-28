import {Component} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Emitters} from '../../emitters/emitters';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  api_url =  "http://localhost:8000/";
  authenticated = false;
  message = "";
  mes: any;
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user', { withCredentials : true }).subscribe(
      (res: any) => {
        this.message = `Hi ${res.id}`;
        Emitters.authEmitter.emit(true);
      }
      // ,
      // err => {
      //   this.message = 'You are not logged in';
      //   Emitters.authEmitter.emit(false);
      // }
    );
  }
  
}
