describe("Cypress Mini Shop UI Testing - using custom commands", () => {

    beforeEach(() => {

        cy.fixture("userDetails").then((user) => {

            cy.login(user.email,user.password).wait(500);
        
        });
        
        cy.then(()=>{
        
            cy.url().should("include","dashboard");
        
        });

    });

    it("Add New Product",()=>{
        
        cy.addProducts({
        
            "productName" : "Mobile",
            "productPrice" : "$1500",
            "productCategory" : "Electronics"
        
        });
        
    });

});
