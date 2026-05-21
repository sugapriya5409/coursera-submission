describe("Cypress Mini Shop UI Testing - using fixtures and env variables", () => {

    beforeEach(()=>{

        cy.login(Cypress.env("email"), Cypress.env("password")); //using env variables
        cy.url().should("include","dashboard");

    });

    it("Add New Products using fixture files",()=>{

        cy.fixture("ProductDetails").each((details)=>{ // using fixture file to add multiple products
                cy.addNewProducts(details.ProductName,details.ProductPrice,details.ProductCategory);
        });

    });

});