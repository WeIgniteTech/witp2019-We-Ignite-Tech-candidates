/// <reference types="Cypress" />

describe('The Home Page', function () {
  it('logs in programmatically without using the UI', function () {

    // destructuring assignment of the this.currentUser object
    const candidateObject = [
      {
        "fields": { "name": "Cypress Hill", "age": 18, "experience": 1 }
      }
    ]

    // programmatically log us in without needing the UI
    cy.request('POST', '/api/candidates',
      candidateObject
      ).then((response) => {
      // response.body is automatically serialized into JSON
      expect(response.body).to.have.property('status', 200)
    })
    // now that we're logged in, we can visit
    // any kind of restricted route!
    cy.request('/api/listcandidates')
      .then((response) => {
      expect(response.status).to.eq(200)
      expect(response).to.have.property('headers')
      expect(response).to.have.property('duration')
      expect(response).to.have.property('body')
      expect(response.body).to.have.property('length')
      var records2 =response.body.length
      expect(records2).to.equal(35)
    })
    // our auth cookie should be present
    // cy.getCookie('your-session-cookie').should('exist')

    // UI should reflect this user being logged in
    // cy.get('name').should('contain', 'Cypress Hill')
  })
})
