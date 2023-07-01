import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataService, Todo } from '../data.service';
import { Router, RouterLink } from '@angular/router';
import { NavigationService } from '../services/navigation.service';
import { NgIf } from '@angular/common';
import { checkGroupVisibilityConditionalValidator } from '../components/todo-form/conditional-group.validator';

@Component({
  standalone: true,
  selector: 'app-edit-page',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
  ],
  template: `
      <form class="form-group" [formGroup]="editForm">
          <div class="input-container">
              <input placeholder="Update your task name"
                     data-cy="edit-input"
                     class="form-field"
                     formControlName="text"/>
              <ng-container *ngIf="editForm.get('text')?.invalid && 
        editForm.get('text')?.errors && 
        (editForm.get('text')?.dirty || editForm.get('text')?.touched)">
                  <small class="invalid" data-cy="length-error" *ngIf="editForm.get('text')?.hasError('minlength')">Tasks
                      must contain at least 3 characters</small>
                  <small class="invalid" data-cy="required-error" *ngIf="editForm.get('text')?.hasError('required')">You
                      must enter a task.</small>
              </ng-container>

              <input placeholder="Update your task group"
                     data-cy="edit-group-input"
                     class="form-field"
                     formControlName="category"/>

              <a data-cy="cancel-button" routerLink="['/..']">Cancel</a>
              <button data-cy="update-button"
                      class="cool-button"
                      [disabled]="editForm.invalid"
                      (click)="store.edit(this.id, this.editForm.getRawValue()); navigation.back()">
                  Update
              </button>
          </div>
      </form>
  `,
  styles: [],
})
export class EditComponent implements OnInit {
  @Input({ transform: (val: string) => parseInt(val) }) id!: number;
  @Input() allowCategoryEdit = false;

  editForm = this.fb.nonNullable.group({
    text: ['', [Validators.minLength(3), Validators.required]],
    category: ['', [Validators.required]],
  });

  constructor(
    public readonly store: DataService,
    public readonly router: Router,
    public readonly navigation: NavigationService,
    private readonly fb: FormBuilder
  ) {
  }

  ngOnInit() {
    const task = this.store.getTaskById(this.id);
    if (task) {
      this.editForm.controls.text.patchValue(task.text);
      this.editForm.controls.category.patchValue(task.category);
    } else {
      this.router.navigate(['']);
    }
  }


}