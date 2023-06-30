import { Component, Input, OnInit } from '@angular/core';
import { DataService, Todo } from '../../data.service';
import {
  FormBuilder, FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe, NgIf } from '@angular/common';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { checkGroupVisibilityConditionalValidator } from './conditional-group.validator';

export type TodoForm = Pick<Todo, 'text' | 'category'>

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    DropdownComponent,
    AsyncPipe
  ],
  template: `
      <form class="form-group" [formGroup]="taskForm">
          <div class="input-container">
              <input formControlName="text"
                     placeholder="Create a task to do"
                     data-cy="task-input"
                     class="form-field"/>
              <ng-container *ngIf="taskForm.get('text')?.invalid && 
                taskForm.get('text')?.errors && 
                (taskForm.get('text')?.dirty || taskForm.get('text')?.touched)">
                  <small class="invalid" data-cy="length-error" *ngIf="taskForm.get('text')?.hasError('minlength')">Tasks must contain at least 3 characters</small>
                  <small class="invalid" data-cy="required-error" *ngIf="taskForm.get('text')?.hasError('required')">You must enter a task.</small>
              </ng-container>
              <ng-container *ngIf="showCategories">
                <app-dropdown formControlName="category" [categoryOptions]="store.categories$ | async"/>
              </ng-container>
          </div>
          <div class="submit-container">
            <button type="submit"
                    class="cool-button"
                    data-cy="submit-button"
                    [disabled]="!taskForm.valid"
                    (click)="store.add(taskForm.getRawValue()); taskForm.reset()">
                <span class="cool-button-text">Submit</span>
            </button>
          </div>
      </form>
  `,
  selector: 'app-todo-form',
  styles: [`
    .submit-container {
      width: 100%;
      margin: 8px auto;
    }
  `]
})
export class TodoFormComponent implements OnInit {
  taskForm!: FormGroup;
  // specifically introduced in task3. Should not be shown in task 1 or 2.
  @Input() showCategories: boolean = false;

  constructor(private readonly fb: FormBuilder, public store: DataService) {
  }

  ngOnInit() {
    this.taskForm = this.fb.nonNullable.group({
      text: ['', [
        Validators.minLength(3),
        Validators.required
      ]
      ],
      category: ['', [
        checkGroupVisibilityConditionalValidator(this.showCategories)
      ]]
    });
  }
}