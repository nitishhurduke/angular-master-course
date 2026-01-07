import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';

import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  userName: string = '';
  private usersService = inject(UsersService);
  private desrtoyRef = inject(DestroyRef);
  private activatedRoute = inject(ActivatedRoute);
  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name
  // );

  ngOnInit(): void {
    console.log(this.activatedRoute);

    const subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const userId = paramMap.get('userId');
        this.userName =
          this.usersService.users.find((u) => u.id === userId)?.name || '';
      },
    });

    this.desrtoyRef.onDestroy(() => subscription.unsubscribe());
  }
}
