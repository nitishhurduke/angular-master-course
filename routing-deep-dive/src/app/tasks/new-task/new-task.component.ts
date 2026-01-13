import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  isSubmitted = false;
  private tasksService = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.isSubmitted = true;
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true, // Will not go back to the form on 'back' browser button pressed
    });
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component: NewTaskComponent
) => {
  if (component.isSubmitted) {
    return true;
  }
  if (
    component.enteredDate() ||
    component.enteredSummary() ||
    component.enteredTitle()
  ) {
    return window.confirm(
      'Do you want to leave the page? You will loose entered data'
    );
  } else {
    return true;
  }
};
