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
                     placeholder="Create a task to do"
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