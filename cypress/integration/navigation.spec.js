/// <reference types="cypress" />

describe("Navigation Testing", () => {
    const textSearched = 'sports';
    before(() => {
        cy.visit(`/?page=1&search=${textSearched}`);
    });

    beforeEach(() => {
        cy.intercept('GET', '/svc/search/v2/*', { fixture: 'articles.json' }).as('searchArticles');
    });

    it("Input value is setted from the url", () => {
        cy.getById(`input-search`).should('have.value', textSearched);
    });

    it("Param search in URL change when input search change", () => {
        cy.intercept('GET', '/svc/search/v2/*', { fixture: 'articles.json' }).as('searchArticles');
        const newTextSearched = 'football';
        cy.getById(`input-search`).clear().type(newTextSearched);
        cy.url().should('include', `search=${newTextSearched}`);
    });

    it("Param page in URL change when click next page button", () => {
        cy.getById('pagination').get('button:last-child').click();
        cy.url().should('include', `page=2`);
    });

    it("Click an article go to detail page", () => {
        cy.get(`section > article:first-child`).click();
        cy.url().should('include', '/detail').should('include', 'web_url=');
    });

});
