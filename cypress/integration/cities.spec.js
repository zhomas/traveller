/// <reference types="cypress" />

describe('cities search', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('displays all cities by default', () => {
    cy.get('[data-cy="items-grid"]').children().should('have.length.above', 10)
  })

  it('refines results based on search', () => {
    cy.get('[data-cy="home-searchbox"]').type('london')
    cy.get('form').submit()
    cy.get('[data-cy="items-grid"]').children().should('have.length', 1)
  })
})

describe('wishlist', () => {
  it('adds a city to the wishlist', () => {
    cy.visit('/wish-list')
    cy.get('[data-cy="items-grid"]').children().should('have.length', 0)
    cy.visit('/')
    cy.get('[data-cy="london"]').find('button').contains('Wishlist').click()
    cy.visit('/wish-list')
    cy.get('[data-cy="items-grid"]').children().should('have.length', 1)
  })

  it('removes a city from the wishlist', () => {
    cy.visit('/wish-list')
    cy.get('[data-cy="items-grid"]').children().should('have.length', 1)
    cy.visit('/')
    cy.get('[data-cy="london"]').find('button').contains('Wishlist').click()
    cy.visit('/wish-list')
    cy.get('[data-cy="items-grid"]').children().should('have.length', 0)
  })
})

describe('visited', () => {
  it('adds a city to the visited list', () => {
    cy.visit('/visited')
    cy.get('[data-cy="items-grid"]').children().should('have.length', 0)
    cy.visit('/')
    cy.get('[data-cy="london"]').find('button').contains('Visited').click()
    cy.visit('/visited')
    cy.get('[data-cy="items-grid"]').children().should('have.length', 1)
  })

  it('removes a city from the visited list', () => {
    cy.visit('/visited')
    cy.get('[data-cy="items-grid"]').children().should('have.length', 1)
    cy.visit('/')
    cy.get('[data-cy="london"]').find('button').contains('Visited').click()
    cy.visit('/visited')
    cy.get('[data-cy="items-grid"]').children().should('have.length', 0)
  })
})
