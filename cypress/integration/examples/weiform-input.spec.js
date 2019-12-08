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
  //TEst form submission
  it('assert you can type', () => {
    cy.wait(100)
    const myText = 'Olav Torbjorn';
    cy.get('.new-name').type(myText).should('have.value',myText);
    const myText2 = '9';
    cy.get('.new-age').type(myText2).should('have.value',myText2);
    const myText3 = '9';
    cy.get('.new-experience').type(myText3).should('have.value',myText3);
    //sends the form
    cy.contains('SEND').click()
  });
  // it('assert you can type', () => {
  //   cy.wait(100)
  //   const myText2 = '26';
  //   cy.get('.new-age').type(myText).should('have.value',myText2);
  // });
  // it('assert you can type', () => {
  //   cy.wait(100)
  //   const myText3 = '9';
  //   cy.get('.new-experience').type(myText).should('have.value',myText3);
  // });
  //automate cypress to click send
  // it('finds the content "SEND"', function() {
  //   // cy.visit('/')
  //
  //   cy.contains('SEND').click()
  // });
});
