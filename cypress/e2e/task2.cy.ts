describe('Task 2 page', () => {
  beforeEach(() => {
    cy.visit('/task2');
  });

  // this is the only new feature added in task2, so this should be the only thing tested in an e2e manner
  it('allows a user to edit a task', () => {
    cy.get('[data-cy="task-input"]').type('test');
    cy.get('[data-cy="submit-button"]').click();

    cy.log('The lines in the list created in task 1 should contain a clickable element for \'edit\'');
    cy.get('[data-cy="task0-edit"]').click();

    cy.log('when the \'edit\' element is clicked, an edit screen is opened for the appropriate task/thing/todo');
    cy.url().should('include', '/edit/1');

    cy.log('the edit screen should have a form with an element that contains current task/thing/todo value');
    cy.get('[data-cy="edit-input"]').as('task-input').should('have.value', 'test');
    cy.get('@task-input').type('er');
    cy.get('[data-cy="update-button"]').click();

    cy.log('after the todo is saved, the user is taken back to the list of todos');
    cy.get('[data-cy="task0"]').should('have.text', 'Tester');
    cy.url().should('include', '/task2');
  });
});
