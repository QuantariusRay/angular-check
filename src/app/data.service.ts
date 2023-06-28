import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  initialData$: Todo[] = [];
  data$ = new BehaviorSubject<Todo[]>([]);
  nextId$ = 1;

  readonly #defaultTodo: Todo = {
    id: -1,
    text: '',
    completed: false,
  };

  constructor() {
    this.initialize();
  }

  public resetData(): void {
    this.initialize();
  }

  public getData(): Observable<Todo[]> {
    return this.data$.asObservable();
  }

  public getTaskById(id: number | undefined): Todo | undefined {
    return this.data$.value.find(data => data.id === id);
  }

  public add(todo: string | null): Observable<Todo> {
    if (!todo) {
      return EMPTY;
    }

    const newTodo = { ...this.#defaultTodo, text: todo, id: this.nextId$++ };
    this.data$.next([...this.data$.value, newTodo]);
    return of(newTodo);
  }

  public remove(id: number): Observable<void> {
    this.data$.next(this.data$.value.filter((t) => t.id !== id));
    return of();
  }

  public edit(id: number | undefined, newText: string): Observable<void> {
    if (!id || !newText) {
      return of();
    }

    const todo = this.data$.value.find(data => data.id === id);

    if (todo) {
     todo.text = newText;
    }

    return of();
  }

  private initialize() {
    this.nextId$ = this.initialData$.length + 1;
    this.data$.next(this.initialData$);
  }
}
