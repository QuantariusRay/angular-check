import { Component, inject } from '@angular/core';
import { DataService } from '../../data.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  template: `
      <form class="form-group" [formGroup]="taskForm">
          <div class="input-container">
              <input formControlName="newTask"
                     data-cy="task-input"
                     class="form-field"/>
              <ng-container *ngIf="taskForm.get('newTask')?.invalid && 
        taskForm.get('newTask')?.errors && 
        (taskForm.get('newTask')?.dirty || taskForm.get('newTask')?.touched)">
                  <small class="invalid" data-cy="length-error" *ngIf="taskForm.get('newTask')?.hasError('minlength')">Tasks must contain at least 3 characters</small>
                  <small class="invalid" data-cy="required-error" *ngIf="taskForm.get('newTask')?.hasError('required')">You must enter a task.</small>
              </ng-container>
          </div>
          <button type="submit"
                  class="cool-button"
                  data-cy="submit-button"
                  [disabled]="!taskForm.valid || !taskForm.controls.newTask.value"
                  (click)="store.add(taskForm.controls.newTask.value); taskForm.reset()">
              <span class="cool-button-text">Submit</span>
          </button>
      </form>
  `,
  selector: 'app-todo-form',
  styles: [`
    .form-group {
      display: flex;
      align-items: center;
    }

    .form-field {
      width: 25rem;
      height: 24px;
      color: #333;
      vertical-align: middle;
      background-color: #fff;
      border: 1px solid #ccc;
      padding: 8px 12px;
      font-size: 14px;
      line-height: 1.42857;
    }

    .form-field.ng-invalid.ng-touched {
      border-color: red;
    }
    
    .input-container {
      display: flex;
      flex-direction: column;
    }
    
    .invalid {
      color: red;
    }
  `]
})
export class TodoFormComponent {
  store = inject(DataService);
  taskForm = new FormGroup({
    newTask: new FormControl<string>('', [
      Validators.minLength(3),
      Validators.required
    ])
  });
}