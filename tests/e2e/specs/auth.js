describe('Auth page e2e', () => {

  it('should visit auth page', () => {
    cy.visit("/auth").then(() => {
      cy.url().should("include", "/auth");
    });
    cy.contains('h1', 'Sign up')
    cy.contains('Already have an account?Login')
  })

  it('should visit login form', () => {
    cy.get('[data-cy="LoginToggleForm"]').click()
    cy.contains('h1', 'Log in')
  })

  it('should login user', () => {
    cy.get('[data-cy="LoginEmailTextField"]').type('hadi@bambank.com');
    cy.get('[data-cy="LoginPasswordTextField"]').type('password');
    cy.get('[data-cy="LoginButton"]').click()
  })

  it('should visit home page after login', () => {
    cy.url().should("include", "/");
    cy.contains('Email: hadi@bambank.com')
  })
})
