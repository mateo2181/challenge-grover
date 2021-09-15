/// <reference types="cypress" />

describe("Integration Testing", () => {
    before(() => {
        cy.visit("/");
    });

    beforeEach(() => {
        cy.intercept('GET', '/svc/search/v2/*', { fixture: 'articles.json' }).as('searchArticles');
    });

    it("Display Input to search articles", () => {
        cy.getById(`input-search`).should('have.length', 1);
    });

    it("Call endpoint to search articles when input search is typed", () => {
        cy.intercept('GET', '/svc/search/v2/*', { fixture: 'articles.json' }).as('searchArticles');
        const textSearched = 'sports';
        cy.getById(`input-search`).type(textSearched);
        cy.wait('@searchArticles').its('request.url').should('include', `q=${textSearched}`)

    });

});
