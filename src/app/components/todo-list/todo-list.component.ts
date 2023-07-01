import { Component, HostBinding, inject, Input } from '@angular/core';
import { AsyncPipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { DataService } from '../../data.service';
import { RouterLink } from '@angular/router';
import { GroupSearchComponent } from '../group-search/group-search.component';

@Component({
  standalone: true,
  imports: [
    AsyncPipe,
    NgFor,
    TitleCasePipe,
    RouterLink,
    NgIf,
    GroupSearchComponent
  ],
  template: `
      <app-group-search *ngIf="displayGroupData" />
      <div class="todo-grid">
          <div class="grid-headers" data-cy="grid-headers">
              <span>Task Name</span>
              <span *ngIf="displayGroupData">Task Group</span>
              <span>Actions</span>
          </div>
        <div class="grid-content" data-cy="task-list">
          <ng-container *ngFor="let task of store.filteredData$ | async; let i = index">
            <span [attr.data-cy]="'task' + i">{{ task.text | titlecase }}</span>
            <span *ngIf="displayGroupData">{{ task.category }}</span>
            <div class="actions">
                <a [routerLink]="['/edit', task.id]" [attr.data-cy]="'task' + i + '-edit'" class="icon-button" *ngIf="!preventEdit">
                    <span class="material-icons" aria-hidden="false" aria-label="Edit To-Do">edit</span>
                </a>
                <button [attr.data-cy]="'task' + i + '-remove'" class="icon-button" (click)="store.remove(task.id)">
                    <span class="material-icons" aria-hidden="false" aria-label="Edit To-Do">delete</span>
                </button>
            </div>
          </ng-container>
        </div>
          
      </div>
  `,
  selector: 'app-todo-list',
  styles: [`
    .todo-grid {
      display: grid;
      width: 100%;
      grid-template:
        "header header header" 24px
        "content content content" 1fr;
      grid-auto-columns: 300px;
    }
    
    .grid-headers {
      grid-area: header;
      display: flex;
      width: 100%;
      
      > * {
        flex: 1;
      }
    }
    
    .grid-content {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-area: content;
    }
    
    :host(.group-grid) {
      .grid-content {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  `]
})
export class TodoListComponent {
  store = inject(DataService);

  // this is strictly for displaying a diff between task 1 and the others
  @Input() preventEdit: boolean = true;

  // this is strictly for task 4 and 5 and showing grid columns
  @HostBinding('class.group-grid')
  @Input() displayGroupData: boolean = false;
}