import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService, Todo } from '../data.service';
import { Router, RouterLink } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-edit-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  template: `
    <form class="form-group" [formGroup]="editForm">
      <div class="input-container">
          <input placeholder="Update your task name" 
                 data-cy="edit-input"
                 class="form-field"
                 formControlName="taskToEdit"/>
          <ng-container *ngIf="editForm.get('taskToEdit')?.invalid && 
        editForm.get('taskToEdit')?.errors && 
        (editForm.get('taskToEdit')?.dirty || editForm.get('taskToEdit')?.touched)">
              <small class="invalid" data-cy="length-error" *ngIf="editForm.get('taskToEdit')?.hasError('minlength')">Tasks must contain at least 3 characters</small>
              <small class="invalid" data-cy="required-error" *ngIf="editForm.get('taskToEdit')?.hasError('required')">You must enter a task.</small>
          </ng-container>
          <a data-cy="cancel-button" routerLink="['/..']">Cancel</a>
          <button data-cy="update-button" 
                  class="cool-button"
                  [disabled]="editForm.invalid"
                  (click)="store.edit(this.id, this.editForm.controls.taskToEdit.value!); navigation.back()">
              Update
          </button>
      </div>
    </form>
  `,
  styles: [],
})
export class EditComponent implements OnInit {
  @Input({ transform: (val: string) => parseInt(val) }) id!: number;

  store = inject(DataService);
  router = inject(Router);
  navigation = inject(NavigationService);

  editForm = new FormGroup({
    taskToEdit: new FormControl<string>('', [Validators.minLength(3), Validators.required])
  });

  ngOnInit() {
    const task: Todo | undefined = this.store.getTaskById(this.id);
    if (task) {
      this.editForm.controls.taskToEdit.patchValue(task.text);
    } else {
      this.router.navigate(['']);
    }

  }



}