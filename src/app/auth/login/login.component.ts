import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errors$ = this.authService.getLoginErrors();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    if(!form.valid) {
      return;
    }

    this.authService
    .login(form.value.email, form.value.password);

  }

}
