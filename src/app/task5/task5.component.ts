import { Component } from '@angular/core';
import { TodoFormComponent } from '../components/todo-form/todo-form.component';
import { TodoListComponent } from '../components/todo-list/todo-list.component';

@Component({
  selector: 'hd-task5',
  standalone: true,
  imports: [
    TodoFormComponent,
    TodoListComponent
  ],
  template: `
      <h1>Task 5</h1>
      <app-todo-form [showCategories]="true"/>
      <app-todo-list [preventEdit]="false" [displayGroupData]="true"/>
  `,
})
export class Task5Component {

}
