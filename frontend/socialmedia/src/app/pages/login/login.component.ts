import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// Authservice and public service is same
export class LoginComponent {
  authenticated = false;
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
        this.router.navigate(['/']);
        this.authenticated = true;
        //console.log(response);
        localStorage.setItem('token', response.token);
      },
      error => {
        this.router.navigate(['/login']);
        //console.log(error);
      }
      );
    }
  }
  // login(): void {
  //   console.log(this.form.getRawValue());
  //   this.http.post('http://localhost:8000/api/login', this.form.getRawValue(), { 
  //     withCredentials: true
  //   }).subscribe((res: any) => {this.router.navigate(['/']),console.log(res)});
  // }
}
