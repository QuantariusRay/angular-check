describe('Task 3 page', () => {
  beforeEach(() => {
    cy.visit('/task3');
  });

  it('should allow a user to create a To-Do with a task', () => {
    cy.get('[data-cy="task-input"]').type('test');
    cy.get('[data-cy="submit-button"]').as('submit').should('be.disabled');

    cy.get('[data-cy="task-category"]').type('test');
    cy.get('[data-cy="submit-button"]').click();

    cy.get('[data-cy="task0"]').should('be.visible').and('have.text', 'Test');
  });

  it('should allow a user to pick a task group from a previously created task group', () => {
    cy.log('create a task category with the name test');
    cy.get('[data-cy="task-input"]').as('input').type('test');
    cy.get('[data-cy="task-category"]').as('category').type('test');
    cy.get('[data-cy="submit-button"]').as('submit').click();

    cy.log('create a second task and select the existing test category');
    cy.get('@input').type('second test');
    cy.log('The component isn\'t leveraging a select, so we can\'t easily select the option here.')
    cy.get('[data-cy="task-categories"]')
      .invoke('show')
      .should('be.visible')
      .find('option')
      .should('have.length', 1);

    cy.get('@category').type('test');
    cy.get('@submit').click();

    cy.log('Confirm the options are only displaying unique values');
    cy.get('@input').type('third test');

    cy.get('[data-cy="task-categories"]')
      .invoke('show')
      .should('be.visible')
      .find('option')
      .should('have.length', 1);
  });
});