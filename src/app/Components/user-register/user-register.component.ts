import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  constructor(private user: UsersService) {}

  ngOnInit(): void {}

  registerFrom = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$'
      ),
    ]),
    firstname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z][A-Za-z]{1,15}$'),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.pattern('^[A-Za-z][A-Za-z]{1,15}$'),
    ]),
    mobileNo: new FormControl('', [
      Validators.required,
      Validators.pattern('^([+][0-9]{2})?[0-9]{10}$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}'),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.pattern('^(\\w*\\s*[\\#\\-\\,\\/\\.\\(\\)\\&]*)+'),
    ]),
  });

  get username() {
    return this.registerFrom.get('username');
  }
  get password() {
    return this.registerFrom.get('password');
  }
  get firstname() {
    return this.registerFrom.get('firstname');
  }
  get lastname() {
    return this.registerFrom.get('lastname');
  }
  get mobileNo() {
    return this.registerFrom.get('mobileNo');
  }
  get address() {
    return this.registerFrom.get('address');
  }
  get email() {
    return this.registerFrom.get('email');
  }

  submitRegisterFrom() {
    this.user.postUser(this.registerFrom.value);
  }
}
