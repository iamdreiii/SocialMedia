import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Emitters} from '../../emitters/emitters';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  api =  "http://localhost:8000/";
  authenticated = false;
  message = "";
  mes: any;
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
   this.getUser();
  }
  getUser(): void {
    this.http.get(this.api + 'api/user', {
      withCredentials: true
    }).subscribe(
      (data: any) => {
        this.message = `Logged In as ${data.id}`;
        Emitters.authEmitter.emit(true);
        this.mes = data,
        console.log(this.mes);
      },
      err => {
        this.message = 'Please Log in first';
        Emitters.authEmitter.emit(false);
        this.mes = err,
        console.log(this.mes);
      }
    );
  }
}
