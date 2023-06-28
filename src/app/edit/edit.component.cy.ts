import { EditComponent } from './edit.component';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../app.routes';
import { TestBed } from '@angular/core/testing';
import { DataService, Todo } from '../data.service';
import { BehaviorSubject } from 'rxjs';

describe('Edit Component', () => {
  beforeEach(() => {
    cy.mount(EditComponent, {
      imports: [
        EditComponent
      ],
      providers: [provideRouter(routes)],
      componentProperties: {
        id: 1
      }
    }).then(() => {
      const router = TestBed.inject(Router);
      const state = TestBed.inject(DataService);

      cy.stub(state, 'getTaskById').callsFake(() => ({ id: 1, text: 'Test', completed: false }));
      cy.stub(router, 'navigate').as('navigate');
    });
  });

  it('should not allow a user to submit without typing at least 3 characters', () => {
    cy.get('[data-cy="update-button"]').as('update-button');
    cy.get('[data-cy="edit-input"]').type('{backspace}{backspace}');
    cy.get('[data-cy="length-error"]').should('be.visible');
    cy.get('@update-button').should('be.disabled');
  });

  it('should allow a user to update task and route back as long as 3 characters are entered', () => {
    cy.get('[data-cy="update-button"]').as('update-button').should('not.be.disabled');
    cy.get('[data-cy="edit-input"]').type('er');
    cy.get('@update-button').should('not.be.disabled').click();
  });

  it('should show a required error if a user interacts with the form and provide no text', () => {
    cy.get('[data-cy="edit-input"]').as('input').type('{backspace}{backspace}{backspace}{backspace}');
    cy.get('[data-cy="required-error"]').should('be.visible');
  });
});
