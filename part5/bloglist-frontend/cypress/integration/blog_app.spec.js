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
      cy.createBlog({ title: 'title1', author: 'author1', url: 'www.url1.com', likes: 7 })
      cy.createBlog({ title: 'title2', author: 'author2', url: 'www.url2.com', likes: 9 })
      cy.createBlog({ title: 'title3', author: 'author3', url: 'www.url3.com', likes: 13 })
    })

    it('a new note can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('a new blog')
      cy.get('#author').type('Stevenson')
      cy.get('#url').type('www.stevenson.com')
      cy.get('#create-btn').click()

      cy.contains('a new blog Stevenson')
    })

    it('a user can like a blog', function() {
      cy.contains('title2')
        .contains('view')
        .click()

      cy.get('#likes')
        .contains('9')

      cy.contains('title2')
        .get('#likeBtn')
        .click()

      cy.get('#likes')
        .contains('10')
    })

    it('a user can delete a blog', function() {
      cy.get('#title2').should('exist')

      cy.contains('title2')
        .contains('view')
        .click()

      cy.contains('title2')
        .get('#deleteBtn')
        .click()

      cy.get('#title2').should('not.exist')
    })

    it('other user cannot delete blog', function() {
      const user = {
        name: "Tom",
        username: "Tom",
        password: "sekret",
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.login({ username: 'Tom', password: 'sekret' })

      cy.contains('title2')
        .contains('view')
        .click()
      
      cy.get('#deleteBtn').should('not.exist')
    })

    it('blogs is sorted by likes descending', function() {
      let prev = 100
      cy.get('#blog-list>div').then(blogs => {
        for (let i = 0; i < blogs.length; i++) {
          cy.wrap(blogs[i]).get('#viewBtn').click()
          cy.wrap(blogs[i])
            .find('.likes')
            .then(el => {
              const currentLike = parseInt(el.text())
              expect(prev).to.be.greaterThan(currentLike)
              prev = currentLike
            })
        }
      })
    })
  })
})