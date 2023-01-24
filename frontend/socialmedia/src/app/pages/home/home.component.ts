import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  message = '';
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
        console.log(res);
        this.message = `Logged In as ${res.first_name}`;
        Emitters.authEmitter.emit(true);
      },
      err => {
        console.log(err);
        this.message = 'Not Logged In';
        Emitters.authEmitter.emit(false);
      }
    );
  }
}
