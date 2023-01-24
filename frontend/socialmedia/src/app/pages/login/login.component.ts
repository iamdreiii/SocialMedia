import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { PublicService } from '../../services/public.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
// Authservice and public service is same
export class LoginComponent  implements OnInit {

  myform!: FormGroup;
  constructor() {}

  ngOnInit(): void {
      this.myform = new FormGroup({
        email: new FormControl(''),
        password: new FormControl('')
      });
  }
  onSubmit() {
     console.warn(this.myform.value);
  }
}
