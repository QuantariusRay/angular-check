import { Component } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { TodoListComponent } from '../components/todo-list/todo-list.component';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';

@Component({
  selector: 'hd-task1',
  standalone: true,
  imports: [
    NgFor,
    AsyncPipe,
    TodoListComponent,
    TodoFormComponent,
  ],
  template: `
      <h1>Task 1</h1>
      <app-todo-form />
      <app-todo-list />
  `
})
export class Task1Component {
}
