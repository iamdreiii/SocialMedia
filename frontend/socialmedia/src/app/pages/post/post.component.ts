import { Component } from '@angular/core';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Emitters} from '../../emitters/emitters';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  api_url =  "http://localhost:8000/";
  authenticated = false;
  user: any;
  mes = "";
  postForm!: FormGroup;
  constructor(
    private http: HttpClient,
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
        // console.log(res);
        this.postForm.reset();
        swal.fire('Success','Your chika is posted!','success').then(function(){
          location.reload();});
      },
      (err) => {
        swal.fire('Failed','Failed to post!','error')
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
}
