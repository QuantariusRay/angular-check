import { Component, inject, Input } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { DataService } from '../../data.service';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    TitleCasePipe,
    RouterLink,
    NgIf
  ],
  template: `
      <div class="todo-grid">
          <div class="grid-headers" data-cy="grid-headers">
              <span>Task Name</span>
              <span>Actions</span>
          </div>
          <ng-container *ngFor="let task of store.data$ | async; let i = index">
              <span [attr.data-cy]="'task' + i">{{ task.text | titlecase }}</span>
              <div class="actions">
                  <button [attr.data-cy]="'task' + i + '-remove'" class="icon-button" (click)="store.remove(task.id)">
                      <span class="material-icons" aria-hidden="false" aria-label="Edit To-Do">delete</span>
                  </button>
                  <a [routerLink]="['/edit', task.id]" [attr.data-cy]="'task' + i + '-edit'" class="icon-button" *ngIf="!preventEdit">
                      <span class="material-icons" aria-hidden="false" aria-label="Edit To-Do">edit</span>
                  </a>
              </div>
          </ng-container>
      </div>
  `,
  selector: 'app-todo-list',
  styles: [`
    .todo-grid {
      display: grid;
      width: 100%;
      grid-template:
        "header header" 24px
        "content content" 1fr / 1fr 1fr;
    }
    .grid-headers {
      grid-area: header;
      display: grid;
      width: 100%;
      grid-template-columns: 1fr 1fr;
    }
    
    .grid-content {
      grid-area: content;
    }
  `]
})
export class TodoListComponent {
  store = inject(DataService);

  // this is strictly for displaying a diff between task 1 and the others
  @Input() preventEdit: boolean = true;
}