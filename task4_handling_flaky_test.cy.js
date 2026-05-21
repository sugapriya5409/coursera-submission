describe("Cypress Mini Shop UI Testing - handling flaky test", () => {
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

        cy.pause();

        cy.url().should("include","dashboard");
        cy.get("h1").debug().should("contain.text","Product Dashboard");
    });
});