import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private http:HttpClient,
    private router: Router
    ) {}

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        first_name: '',
        last_name: '', 
        email: '', 
        password: '',
        password_confirm: ''
      });
  }
  submit(): void {
    // console.log(this.form.getRawValue());
    this.http.post('http://localhost:8000/api/register', this.form.getRawValue())
    .subscribe(res => {
      // console.log(res);
      this.router.navigate(['/login']);
    });
  }
}
