describe("Cypress Mini Shop UI Testing - using session", () => {

    beforeEach(() => {
        cy.session("Store Login Session", () => {
            cy.login(Cypress.env("email"), Cypress.env("password"));
        });
        cy.intercept("GET", "**/dashboard*").as("dashboard");

        cy.visit("/dashboard");
        cy.wait("@dashboard").then((interception) => {
            expect(interception.response.statusCode).to.eql(200);
        })
        cy.url().should("include", "dashboard");

    });

    it("Add New Products", () => {
        cy.fixture("ProductDetails").each((details) => { // using fixture file to add multiple products
            cy.addNewProducts(details.ProductName, details.ProductPrice, details.ProductCategory);
        });
    });

    it("Cancel Add New Products Action", () => {
        cy.fixture("ProductDetails").each((details) => { // using fixture file to add multiple products
            cy.cancelAddNewProductsAction(details.ProductName, details.ProductPrice, details.ProductCategory);
        });
    })
});