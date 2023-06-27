import { NavigationComponent } from './navigation.component';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { routes } from '../../app.routes';

describe('Navigation Component', () => {

  beforeEach(() => {
    cy.mount(NavigationComponent, {
      imports: [
        NavigationComponent
      ],
      providers: [provideRouter(routes)]
    }).then(() => {
      const router = TestBed.inject(Router);
      cy.stub(router, 'navigate').as('navigate');
    });
  });

  it('should render with a list of 5 task anchors', () => {
    cy.get('[data-cy="nav-list"]').find('a').should('have.length', 5);
  });

  it('should route to a Task page and set the url to new style', () => {
    cy.get('a').contains('Task 1').as('task1route').click();
    cy.get('@task1route').should('have.class', 'styled')
      .and('have.attr', 'routerlinkactive', 'styled');
  });
})
