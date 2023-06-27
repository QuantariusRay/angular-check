describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/task1');
  });

  it('allows a user to add several tasks to a task list', () => {
    cy.log('I want to enter things/tasks I must do, one at a time, so as to compile a list of todos')
    cy.get('[data-cy="task-input"]').type('test');
    cy.get('[data-cy="submit-button"]').click();

    cy.log('After a task/thing/todo is created, it should appear in a list on the screen');
    cy.get('[data-cy="task0"]').should('have.text', 'Test');
  });

  it('should allow a user to remove a task from the task list', () => {
    cy.log('I want to enter things/tasks I must do, one at a time, so as to compile a list of todos')
    cy.get('[data-cy="task-input"]').as('input').type('test');
    cy.get('[data-cy="submit-button"]').as('submit').click();
    cy.get('@input').type('second test');
    cy.get('@submit').click();

    cy.log('After a task/thing/todo is created, it should appear in a list on the screen');
    cy.get('[data-cy="task1-remove"]').as('remove-1').should('be.visible');
    cy.log('Each task/thing/todo in the list should appear on its own line with a clickable "x"')
    cy.log('When clicked the corresponding task/thing/todo is removed from the list in real time');
    cy.get('@remove-1').click();
    cy.get('[data-cy="task1"]').should('not.exist');
  });
})