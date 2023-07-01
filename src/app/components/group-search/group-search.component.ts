import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-group-search',
  imports: [
    ReactiveFormsModule
  ],
  template: `
      <input class="form-field" 
             data-cy="filter-bar"
             [formControl]="searchQuery"
             placeholder="Filter by Task Group"/>
  `
})
export class GroupSearchComponent implements OnInit {
  store = inject(DataService);
  searchQuery = new FormControl('');

  ngOnInit() {
    this.searchQuery.valueChanges.pipe(
      map(query => this.store.updateSearchTerm(query as string))
    ).subscribe();
  }
}