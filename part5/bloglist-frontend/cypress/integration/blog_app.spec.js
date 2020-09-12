describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: "Lewis",
      username: "admin",
      password: "sekret",
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('admin logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('admin')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy
        .get('.errorMessage')
        .should('contain', 'Username or password is invalid!')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'admin', password: 'sekret' })
    })

    it('a new note can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a new blog')
      cy.get('#author').type('Stevenson')
      cy.get('#url').type('www.stevenson.com')
      cy.get('#create-btn').click()

      cy.contains('a new blog Stevenson')
    })
  })
})