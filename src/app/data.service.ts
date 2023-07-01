import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, Observable, of } from 'rxjs';
import { TodoForm } from './components/todo-form/todo-form.component';

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
  category: string;
};

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private initialData$: Todo[] = [];
  private data$ = new BehaviorSubject<Todo[]>([]);
  private queryTerm$ = new BehaviorSubject<string>('');
  private nextId$ = 1;

  public filteredData$ = combineLatest([
    this.data$,
    this.queryTerm$
  ]).pipe(
    map(([data, query]: [Todo[], string]) => data.filter((datum: Todo) => datum.category.includes(query as string)))
  );

  public readonly categories$: Observable<string[]> = this.data$.pipe(
    map(data => data.map(d => d.category)),
    map((categories: string[]) => [...new Set(categories)])
  );

  readonly #defaultTodo: Todo = {
    id: -1,
    text: '',
    completed: false,
    category: ''
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

  updateSearchTerm(searchQuery: string) {
    this.queryTerm$.next(searchQuery);
  }

  public getTaskById(id: number | undefined): Todo | undefined {
    return this.data$.value.find(data => data.id === id);
  }

  public add(todo: TodoForm): void {
    const newTodo: Todo = {
      ...this.#defaultTodo,
      text: todo.text,
      id: this.nextId$++,
      category: todo.category
    };

    this.data$.next([...this.data$.value, newTodo]);
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
