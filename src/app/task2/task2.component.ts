import { Component } from '@angular/core';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';

@Component({
  selector: 'hd-task2',
  standalone: true,
  imports: [
    TodoFormComponent,
    TodoListComponent
  ],
  template: `
      <h1>Task 2</h1>
      <app-todo-form />
      <app-todo-list />
  `,
  styles: [``]
})
export class Task2Component {

}
