import { DropdownComponent } from './dropdown.component';

describe('Dropdown Component Tests', () => {
  beforeEach(() => {
    cy.mount(DropdownComponent, {
      imports: [
        DropdownComponent
      ]
    });
  });

  it('should validate that the control is invalid if no value exist', () => {
    cy.get('[data-cy="task-category"]').as('input').type('test');
    cy.get('@input').type('{backspace}{backspace}{backspace}{backspace}');
    cy.get('[data-cy="required-error"]').should('be.visible');
  });
})