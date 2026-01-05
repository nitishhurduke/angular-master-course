import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

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

let initialEmailValue = '';
const savedFormData = window.localStorage.getItem('saved-login-form');
if (savedFormData) {
  const loadedData = JSON.parse(savedFormData);
  initialEmailValue = loadedData.email;
}
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule],
})
export class LoginComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
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

  ngOnInit(): void {
    const subscription = this.form.valueChanges
      .pipe(debounceTime(600))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: value.email })
          );
        },
      });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

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
