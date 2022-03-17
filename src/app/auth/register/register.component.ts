import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  errors$ = this.authService.getRegisterErrors();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {

    if(!form.valid) {
      return;
    }

    this.authService
    .register(form.value.username, form.value.email, form.value.password);

  }



}
