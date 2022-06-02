import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

export class UserValidators {
  allUsername: any[] = [];
  constructor(private user: UsersService) {}
  getAllUsername() {
    console.log('Hello');

    // this.user.getUser().subscribe((res) => {
    //   console.log(res);
    // });
  }

  static shouldBeUnique(
    control: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise((resolve, reject) => {
      console.log(control.value);
      //   this.user.getUser().subscribe((res) => {
      //     console.log(res);
      //   });
      if (control.value != 'Akshay') {
        resolve({ shouldBeUnique: true });
      } else resolve(null);
    });
  }
}
