import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmationService {

  confirmDeletion(category: string, todo: string): Observable<boolean> {
    return of(confirm(`Are you sure you want to delete ${ category }: ${ todo }`));
  }
}