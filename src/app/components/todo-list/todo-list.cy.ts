import { TodoListComponent } from './todo-list.component';
import { TestBed } from '@angular/core/testing';
import { DataService, Todo } from '../../data.service';
import { BehaviorSubject } from 'rxjs';

describe('To-do List Component', () => {

  it('should have two columns with column headers indicating name and actions', () => {
    cy.mount(TodoListComponent, {
      imports: [
        TodoListComponent
      ]
    });

    cy.get('[data-cy="grid-headers"]').as('headers').find('span').should('have.length', 2);
    cy.get('@headers').find('span').first().should('have.text', 'Task Name');
    cy.get('@headers').find('span').eq(1).should('have.text', 'Actions');
  });

  it('should populate data for a task\'s name and provide actions to delete the task', () => {
    cy.mount(TodoListComponent, {
      imports: [
        TodoListComponent
      ]
    }).then(() => {
      const data = TestBed.inject(DataService);
      data.data$ = new BehaviorSubject<Todo[]>([
        { id: 0, text: 'test', completed: false },
        { id: 1, text: 'example', completed: false },
      ]);
      cy.stub(data, 'remove').as('removeAction');
    });

    cy.log('text values should be title case even though the value in the store is "test"')
    cy.get('[data-cy="task0"]').should('have.text', 'Test');
    cy.get('[data-cy="task0-remove"]').click();
    cy.get('@removeAction').should('have.been.calledOnceWith', 0);
  });
});
