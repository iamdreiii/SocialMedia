import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { PublicService } from './services/public.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private httpOptions: any;
  title = 'socialmedia';
  msg: any;
  constructor(private pService: PublicService,
    private http: HttpClient,
    
    ) {
      this.httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };
  }
  ngOnInit(): void {
     //this.showMessage();
     console.log(this.showtoken());
  }
  showtoken() {
    this.http.post('http://localhost:8000/api/refresh', Request).subscribe(
      data => {
        console.log(data);
      }
      // ,
      // err => {
      //   console.log(err);
      // }
    );
  }
  showMessage() {
    this.pService.getMessage().subscribe(data => {
      this.msg = data,
        console.log(this.msg);
    });
  }
}
