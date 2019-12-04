// this test will fill in the form and submit it

describe('Form input', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  // check we are focused on the text input
  it('test of focus on the form', () => {
    // cy.visit('/');
    cy.focused().should('have.class','new-name');
  });
  //automate cypress to type for you, and the text filed holds that value
  it('assert you can type', () => {
    cy.wait(1000)
    const myText = 'Olav Torbjorn';
    // cy.visit('/');
    cy.get('.new-name').type(myText).should('have.value',myText);
  });
  //automate cypress to click send
  it('finds the content "SEND"', function() {
    // cy.visit('/')

    cy.contains('SEND').click()
  });
});
