describe('Task 4 page', () => {
  beforeEach(() => {
    cy.visit('/task4');
  });

  it('should allow a user to search for tasks by group', () => {
    cy.get('[data-cy="task-input"]').type('literature');
    cy.get('[data-cy="task-category"]').type('test');
    cy.get('[data-cy="submit-button"]').click();

    cy.get('[data-cy="task-input"]').type('geometry');
    cy.get('[data-cy="task-category"]').type('exam');
    cy.get('[data-cy="submit-button"]').click();

    cy.log('Search for the second entered, the first should be removed from the list');
    cy.get('[data-cy="filter-bar"]').type('exam');
    cy.get('[data-cy="task0"]').should('have.text', 'Geometry')
  });
});