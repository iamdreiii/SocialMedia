import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from 'src/app/emitters/emitters';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// Authservice and public service is same
export class LoginComponent {
  authenticated = false;
  user: any;
  // form!: FormGroup;
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // this.form = this.formBuilder.group(
    // {
    //   email : "", 
    //   password : ""
    // });
  }
  login() {
    if (this.loginForm.valid) {
      const jsonData = this.loginForm.value;
      const url = 'http://localhost:8000/api/login';
      this.http.post(url, jsonData,{withCredentials: true}).subscribe((response:any) => {
        this.authenticated = true;
        this.user = true;
        localStorage.setItem('token', response.token);
        console.log("Login successful");
        this.router.navigate(['/home']);
        Emitters.authEmitter.emit(true)
      },
      error => {
        this.router.navigate(['/login']);
        Emitters.authEmitter.emit(false)
      }
      );
    }
  }
}
