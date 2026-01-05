import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

function mustIncludeQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }
  return {
    doesNotContainQuestionMark: true,
  };
}

function isEmailUnique(control: AbstractControl) {
  if (control.value !== 'test?@email.com') {
    return of(null);
  }
  return of({
    emailNotUnique: true,
  });
}
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.required,
        mustIncludeQuestionMark,
        isEmailUnique,
      ],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  onSubmit() {
    console.log(this.form);
    const emailValue = this.form.controls.email.value;
    const passwordValue = this.form.value.password;
    console.log(emailValue, passwordValue);
  }

  isInvalidEmail() {
    return this.form.controls.email.touched && this.form.controls.email.invalid;
  }

  isInvalidPassword() {
    return false;
  }
}
