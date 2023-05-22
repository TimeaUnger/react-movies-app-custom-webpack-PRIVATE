describe('MoviesListPage spec', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1780, 2500);
  });

  it('after clicking on movie tile url should contain the relavant id', () => {
    cy.get('.movieImage').eq(2).click();
    cy.get('.movieTileWrapper')
      .eq(2)
      .invoke('attr', 'data-id')
      .then((id) => {
        console.log(`href is ${id}`);
        cy.url().should('eq', Cypress.config().baseUrl + `/${id}`);
      });
  });

  it('after clicking on genre the url should contain the relavant search params', () => {
    cy.get('.genreItem')
      .eq(2)
      .click()
      .invoke('text')
      .then((genreItem) => {
        const reqUrl = `?filter=${genreItem}&sortBy=release_date&activeGenre=${genreItem}`;
        cy.location('search').should('equal', reqUrl);
      });
  });

  it('after clicking on genre the the clicked genre should be active', () => {
    cy.get('.genreItem').should('have.class', 'active');
    cy.get('.genreItem.active').should('have.length', 1);
  });

  it('after selecting sort the url should contain the relavant selected sort and active genre', () => {
    cy.get('.genreItem')
      .eq(2)
      .click()
      .invoke('text')
      .then((activeGenre) => {
        cy.get('.sortBySelect')
          .select(1)
          .invoke('val')
          .then((sortSelected) => {
            const reqUrl = `?filter=${activeGenre}&sortBy=${sortSelected}&activeGenre=${activeGenre}`;
            cy.location('search').should('equal', reqUrl);
          });
      });
  });

  it('after clicking on movie details search icon url should change back to the root with the previous state of the url search ', () => {
    // select genre
    cy.get('.genreItem').eq(2).click();
    // select movie to show details
    cy.get('.movieImage').eq(2).click();
    // get the current serach params
    cy.location('search').then((prevUrl) => {
      // click on search icon
      cy.get('.movieSearch').click();
      // match url the loaded url with the previous url
      cy.location('search').should('equal', prevUrl);
    });
  });

  it('after searching on a movie the url should conatain the searched movie parameter as value ', () => {
    cy.get('.searchInput input').type('test{enter}');
    cy.location('search').should('equal', '?search=test&searchBy=title&sortBy=release_date&activeGenre=All');
  });
});
