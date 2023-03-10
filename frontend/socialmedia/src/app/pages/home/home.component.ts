import {Component} from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Emitters} from '../../emitters/emitters';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormBuilder, FormControlName, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  
  api_url =  "http://localhost:8000/";
  authenticated = false;
  user: any;
  posts: any;
  mes = "";
  postForm!: FormGroup;
  delform!: FormGroup;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService, 
    private formBuilder: FormBuilder,
    private router : Router
    
  ) {
    //this.getuser();
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      email : '',
      content: '' 
    });  
    this.delform = this.formBuilder.group({
      id : "" 
    });   
    Emitters.authEmitter.subscribe(
      (auth: boolean) =>{
        this.authenticated = auth;
      }
     );
    this.getuser();
    this.getuserPost();
  }
  post(): void {
      this.http.post('http://localhost:8000/api/post', this.postForm.getRawValue())
      .subscribe(res => {
        // console.log(res);
        //this.postForm.reset();
        this.router.navigate(['/home']);
       
        swal.fire('Success','Your chika is posted!','success')
      },
      (err) => {
        swal.fire('Failed','Failed to post!','error')
      }
      );
     // console.log('POSTED');
  }
  deletepost(id: number): void {
    console.log(id);
    this.http.delete('http://localhost:8000/api/deletepost/'+ id)
    .subscribe(res => {
      
      //this.postForm.reset();
      this.router.navigate(['/home']);
     
      swal.fire('Success','Your chika is deleted!','success')
      location.reload();
    },
    (err) => {
      swal.fire('Failed','Failed to delete!','error')
    }
    );
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
  getuserPost(): void {
    this.http.get('http://localhost:8000/api/userpost').subscribe(res => {
    this.posts = res;
    },
    error => {
      
    });
    }
  
}
