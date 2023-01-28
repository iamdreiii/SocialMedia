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
  }
  showMessage() {
    this.pService.getMessage().subscribe(data => {
      this.msg = data,
        console.log(this.msg);
    });
  }
}
