describe('Bloglist app', function() {

  beforeEach(function(){
    window.localStorage.removeItem('loggedUser')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'vitorbalestro',
      name: 'Vitor Balestro',
      password: '123456'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login page is opened', function() {
    cy.contains('Login')
    cy.contains('username')
    cy.contains('password')

  })

  describe('Login', function() {
    
    it('succeds with correct credentials', function() {
      cy.get('#username').type('vitorbalestro',{force: true})
      cy.get('#password').type('123456', {force: true})
      cy.contains('login').click({force: true})
      cy.contains('Vitor Balestro logged in')
      
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('vitorbalestro',{force: true})
      cy.get('#password').type('wrong', {force: true})
      cy.contains('login').click({force: true})

      cy.contains('Wrong credentials')

      cy.get('#notification').contains('Wrong credentials')
      cy.get('#notification').should('have.css','color','rgb(255, 0, 0)')
    
    })

    describe('Logout', function() {

      it('logout button works', function() {
        cy.get('#username').type('vitorbalestro',{force: true})
        cy.get('#password').type('123456', {force: true})
        cy.contains('login').click({force: true})

        cy.contains('logout').click({force: true})
  
        cy.contains('Login')
  
      })
    })


})

  describe('when logged in', function() {

    beforeEach(function() {
      cy.get('input:first').type('vitorbalestro', {force: true})
      cy.get('input:last').type('123456', {force: true})
      cy.contains('login').click({force: true})    
    }) 
  

    it('a new blog can be created', function() {
      cy.contains('create new blog').click({force: true})
      cy.get('#blogtitle').type('creating blog with cypress', {force: true})
      cy.get('#blogauthor').type('some author', {force: true})
      cy.get('#blogurl').type('http://someurl.com', {force: true})
      cy.get('#create-button').click({force: true})
      cy.contains('creating blog with cypress')
    })

    

  })

  describe('when there is at least one blog in the list', function(){
    
    beforeEach(function(){
      cy.get('input:first').type('vitorbalestro', {force: true})
      cy.get('input:last').type('123456', {force: true})
      cy.contains('login').click({force: true}) 

      cy.get('#blogtitle').type('creating blog with cypress', {force: true})
      cy.get('#blogauthor').type('some author', {force: true})
      cy.get('#blogurl').type('http://someurl.com', {force: true})
      cy.get('#create-button').click({force: true})
    })
    
    it('view button displays author and url', function(){
      cy.get('#viewButton').click({force: true})
      cy.contains('some author')
      cy.contains('http://someurl.com')
    })

    it('like button works', function() {
      cy.get('#viewButton').click({force: true})
      cy.get('#likeButton').click({force: true})

      cy.contains('likes 1')

      cy.get('#likeButton').click({force: true})

      cy.contains('likes 2')
    })

    it('the user who created a blog can delete it', function() {
      cy.get('#viewButton').click({force: true})
      cy.get('#deleteButton').click({force: true})
      cy.on('window:confirm',function(ConfirmAlertText) // for Confirm-type alert
      {
        expect(ConfirmAlertText).eql(`Remove blog 'creating blog with cypress' by 'some author'`)
   
      })
      cy.on('window:confirm', () => true)
      cy.contains('creating blog with cypress').should('not.exist')

    })

    it('another user cannot see remove button', function() {
      const user = {
        username: 'anotheruser',
        name: 'Another user',
        password: '123456'
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)

      cy.contains('logout').click({force: true})

      cy.get('#username').type('anotheruser',{force: true})
      cy.get('#password').type('123456', {force: true})
      cy.contains('login').click({force: true})    

      cy.get('#viewButton').click({force: true})
      cy.contains('remove').should('not.exist')
      cy.get('#deleteButton').should('not.exist')
    })

    it('blogs are ordered by number of likes', function() {

      cy.get('#viewButton').click({force:true})
      cy.get('#deleteButton').click({force:true})

      cy.on('window:confirm',function(ConfirmAlertText) // for Confirm-type alert
      {
        expect(ConfirmAlertText).eql(`Remove blog 'creating blog with cypress' by 'some author'`)
   
      })
      cy.on('window:confirm', () => true)

      

      cy.get('#blogtitle').type('Blog with 1 like', {force: true})
      cy.get('#blogauthor').type('some author', {force: true})
      cy.get('#blogurl').type('http://someurl.com', {force: true})
      cy.get('#create-button').click({force: true})

      cy.get('#viewButton').click({force: true})
      cy.get('#likeButton').click({force: true})
      
      cy.contains('create new blog').click({force: true})

      cy.get('#blogtitle').type('Blog with 2 likes', {force: true})
      cy.get('#blogauthor').type('some author', {force: true})
      cy.get('#blogurl').type('http://someurl.com', {force: true})
      cy.get('#create-button').click({force: true})

      cy.get('#viewButton').click({force:true})
      cy.get('#hideButton').click({force:true})

      cy.get('#likeButton').click({force:true})
      cy.contains('likes 1')
      cy.get('#likeButton').click({force:true})
      cy.contains('likes 2')
    
      cy.get('#hideButton').click({force:true})
      
      cy.contains('create new blog').click({force: true})

      cy.get('#blogtitle').type('Blog with 3 likes', {force: true})
      cy.get('#blogauthor').type('some author', {force: true})
      cy.get('#blogurl').type('http://someurl.com', {force: true})
      cy.get('#create-button').click({force: true})

      cy.get('.blog').eq(2).contains('Blog with 3 likes')

      cy.get('.blog').eq(2).within(() => {
        cy.get('#viewButton').click({force: true})
        cy.get('#likeButton').click({force:true})
        
      })

      cy.contains('likes 1')
      cy.get('#likeButton').click({force:true})
      cy.contains('likes 2')
      cy.get('#likeButton').click({force:true})
      cy.contains('likes 3')

      cy.get('#hideButton').click({force: true})

      cy.get('.blog').eq(0).contains('Blog with 3 likes')
      cy.get('.blog').eq(1).contains('Blog with 2 likes')
      cy.get('.blog').eq(2).contains('Blog with 1 like')

    })
  })

})