import { afterNextRender, Component, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule],
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');

  constructor() {
    afterNextRender(() => {
      const savedFormData = window.localStorage.getItem('saved-login-form');
      if (savedFormData) {
        const loadedFormData = JSON.parse(savedFormData);
        const savedEmail = loadedFormData.email;
        // this.form().setValue({
        //   email: savedFormData,
        //   password: '',
        // });

        // Throws error as it won't get controls initially.
        // Easy workaround, wait for 1 ms
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
        }, 1);
      }
      this.form()
        .valueChanges?.pipe(debounceTime(1000))
        .subscribe({
          next: (value) => {
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({
                email: value.email,
              })
            );
          },
        });
    });
  }

  onSubmit(formData: NgForm) {
    console.log(formData.form);
    console.log(formData.value.email);
    console.log(formData.value.password);

    formData.form.reset();
  }
}
