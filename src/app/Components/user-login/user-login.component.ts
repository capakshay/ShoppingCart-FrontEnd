import { NotificationService } from './../../services/notification.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { UserValidators } from './user.validators';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {
  valid!: boolean;
  invalid!: boolean;
  response: any;

  constructor(
    private dialog: MatDialog,
    private userService: UsersService,
    private router: Router,
    private notifyService: NotificationService,
    public dialogRef: MatDialogRef<UserLoginComponent>
  ) {}

  ngOnInit(): void {}

  // ischeck = true;

  form = new FormGroup({
    username: new FormControl(
      '',
      Validators.required
      // [Validators.required, Validators.minLength(6)]
      // UserValidators.shouldBeUnique
    ),
    password: new FormControl('', [
      Validators.required,
      // Validators.pattern(
      //   '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$'
      // ),
    ]),
  });

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  openRegister() {
    const dialogRegister = this.dialog.open(UserRegisterComponent, {
      width: '500px',
      height: '700px',
    });
    dialogRegister.afterClosed().subscribe(() => {});
  }

  login() {
    let data = this.form.value;

    this.userService.checkLogin(data).subscribe((res) => {
      var obj = JSON.stringify(res);
      var json = JSON.parse(obj);

      if (!json) {
        this.invalid = true;
        console.log(this.invalid);
        this.valid = false;
        this.notifyService.showError(
          `${data.username} is not Register User`,
          `Invalid Username`
        );
        this.notifyService.showInfo('', `New User Login First`);
      } else {
        if (json.data.role === 'role_user') {
          this.valid = true;
          this.invalid = false;
          this.router.navigate(['/']);
          this.notifyService.showSuccess(
            '',
            `${localStorage.getItem('name')} Login Succesfully`
          );
          this.dialogRef.close(json);
        } else if (json.data.role === 'role_admin') {
          this.valid = true;
          this.invalid = false;
          this.notifyService.showSuccess('Admin Login Succesfully', '');
          this.dialogRef.close(json);
        }
      }
    });
  }
}
