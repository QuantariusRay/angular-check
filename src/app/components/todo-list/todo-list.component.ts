import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, TitleCasePipe } from '@angular/common';
import { DataService } from '../../data.service';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    TitleCasePipe,
  ],
  template: `
      <div class="todo-grid">
          <div class="grid-headers" data-cy="grid-headers">
              <span>Task Name</span>
              <span>Actions</span>
          </div>
          <ng-container *ngFor="let task of store.data$ | async; let i = index">
              <span [attr.data-cy]="'task' + i">{{ task.text | titlecase }}</span>
              <div>
                  <button [attr.data-cy]="'task' + i + '-remove'" (click)="store.remove(task.id)">X</button>
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
}