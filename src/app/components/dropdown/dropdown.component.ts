import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidationErrors,
  Validator, Validators,
} from '@angular/forms';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dropdown',
  template: `
    <label class="dropdown-label">Add a Task Group:
      <input [formControl]="todoCategory"
             data-cy="task-category"
             list="categories"
             (blur)="onTouched()"
             class="form-field"/>
        <ng-container *ngIf="todoCategory.invalid && 
                todoCategory.errors && todoCategory.dirty || todoCategory.touched">
            <small class="invalid" data-cy="required-error" *ngIf="todoCategory.hasError('required')">You must enter a Task Group.</small>
        </ng-container>
    </label>
    <datalist id="categories" data-cy="task-categories">
      <ng-container *ngFor="let option of categoryOptions; let i = index">
          <option [attr.data-cy]="'option-' + i" [value]="option">{{ option | titlecase }}</option>
      </ng-container>
    </datalist>
    
  `,
  styles: [`
    .dropdown-label {
      display: flex;
      flex-direction: column;
      
      input {
        margin-bottom: 0;
      }
    }
  `],
  imports: [
    NgFor,
    NgIf,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DropdownComponent,
      multi: true,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor, Validator {
  @Input({ required: true }) categoryOptions: string[] | null = [];
  todoCategory = new FormControl<string>('', [Validators.required]);

  onTouched!: () => void;
  onChanged!: (tenderer: string) => void;

  registerOnChange(onChanged: (string: string | null) => void): void {
    this.todoCategory.valueChanges.subscribe((val) => {
      onChanged(val);});
  }

  registerOnTouched(touched: () => void): void {
    this.onTouched = touched;
    this.todoCategory.statusChanges.subscribe(() => {
      this.onTouched();
    });
  }

  writeValue(category: string): void {
    this.todoCategory.patchValue(category);
  }

  validate(): ValidationErrors | null {
    return this.todoCategory?.invalid ? { invalid: true } : null;
  }
}