describe('MoviesListPage spec', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1780, 2500);
  });

  it('add movie returns the added movie details shown up in the header', () => {
    cy.get('.addMovie').click();

    // all the input fields has to be filled out for the form validation
    cy.get('.multiSelectDropDown').type('{enter}');
    cy.get('#movieTitle').type('test cypress added movie');
    cy.get('#movieReleaseDate').type('2002-01-01');
    cy.get('#movieUrl').type('https://image.tmdb.org/t/p/w500/bOtgcOIFBCUFdY2a737Na6gWQ0X.jpg');
    cy.get('#movieRating').type('5');
    cy.get('#movieRuntime').type('125');
    cy.get('#movieOverview').type('Some details about the movie');
    cy.get('.movieFormSubmitBtn').click();

    cy.get('.movieDetailsTitle').contains('test cypress added movie');
    cy.get('.movieDetailsOverview').contains('Some details about the movie');
  });

  it('edit movie returns the edited movie details shown up in the header', () => {
    cy.get('.searchInput input').type('test cypress added movie{enter}');
    cy.get('.movieTileWrapper #navButton').click();
    cy.get('#editMovie').click();
    cy.get('#movieTitle').type('{selectall}{backspace}').type('test cypress edited movie');
    cy.get('.movieFormSubmitBtn').click();

    cy.get('.movieDetailsTitle').contains('test cypress edited movie');
  });

  it('after delete movie redirects to the search header page', () => {
    cy.get('.searchInput input').type('test cypress edited movie{enter}');
    cy.get('.movieTileWrapper #navButton').click();
    cy.get('#deleteMovie').click();
    cy.get('.movieFormSubmitBtn').click();

    cy.get('.searchWrapper').should('be.visible');
  });

  it('test input fields validation', () => {
    cy.get('.addMovie').click();
    cy.get('.movieFormSubmitBtn').click();
    cy.get('.inputRow').find('span.formValidationError').its('length').should('eq', 7);
  });
});
