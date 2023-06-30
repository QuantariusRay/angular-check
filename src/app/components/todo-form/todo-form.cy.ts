import { TodoFormComponent } from './todo-form.component';

describe('To-do Form Component', () => {

  describe('With task-category hidden', () => {
    beforeEach(() => {
      cy.mount(TodoFormComponent, {
        imports: [
          TodoFormComponent
        ]
      });
    });

    it('should not allow a user to submit without typing at least 3 characters', () => {
      cy.get('[data-cy="submit-button"]').as('submit-button').should('be.disabled');
      cy.get('[data-cy="task-input"]').type('te');
      cy.get('[data-cy="length-error"]').should('be.visible');
      cy.get('@submit-button').should('be.disabled');
    });

    it('should allow a user to submit form and clear form after 3 characters are entered', () => {
      cy.get('[data-cy="submit-button"]').as('submit-button').should('be.disabled');
      cy.get('[data-cy="task-input"]').type('test');
      cy.get('[data-cy="length-error"]').should('not.exist');
      cy.get('@submit-button').should('not.be.disabled').click();
      cy.get('[data-cy="task-input"]').should('have.text', '');
    });

    it('should show a required error if a user interacts with the form and provide no text', () => {
      cy.get('[data-cy="task-input"]').as('input').type('test');
      cy.get('@input').type('{backspace}{backspace}{backspace}{backspace}');
      cy.get('[data-cy="required-error"]').should('be.visible');
    });
  });

  describe('With task-category visible', () => {
    beforeEach(() => {
      cy.mount<TodoFormComponent>(TodoFormComponent, {
        imports: [
          TodoFormComponent
        ],
        componentProperties: {
          showCategories: true
        }
      });
    });

    it('should not allow a user to submit without both controls being valid', () => {
      cy.get('[data-cy="submit-button"]').as('submit-button').should('be.disabled');
      cy.get('[data-cy="task-input"]').type('test');
      cy.get('@submit-button').should('be.disabled');
      cy.get('[data-cy="task-category"]').type('test')
      cy.get('@submit-button').should('not.be.disabled');
    });
  });
})
