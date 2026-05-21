// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login",(email,password)=>{
    cy.visit("/login");
    cy.get("#email").type(email);
    cy.get("#password").type(password);
    cy.contains("button","Login").click();
});

Cypress.Commands.add("addProducts",(ProductDetails)=>{
    cy.visit("/dashboard");
    cy.contains("button","Go to Add Product").click().wait(500);
    cy.url().should("include","add-product");
    cy.get("h1").should("contain.text","Add New Product");
    cy.get("form").then(($form)=>{
        cy.wrap($form).find('[class="form-group"]').should("have.length",3);
    });
    cy.get("#name").type(ProductDetails.productName);
    cy.get("#price").type(ProductDetails.productPrice);
    cy.get("#category").type(ProductDetails.productCategory);
    cy.contains("button","Add Product").click();

    cy.on("window : alert",(alertMessage)=>{
        expect(alertMessage).should("contain.text","Product added successfully!");
        return true;
    })
});

Cypress.Commands.add("addNewProducts",(productName, productPrice, productCategory)=>{
    cy.visit("/dashboard");
    cy.contains("button","Go to Add Product").click().wait(500);
    cy.url().should("include","add-product");
    cy.get("h1").should("contain.text","Add New Product");
    cy.get("form").then(($form)=>{
        cy.wrap($form).find('[class="form-group"]').should("have.length",3);
    });
    cy.get("#name").type(productName);
    cy.get("#price").type(productPrice);
    cy.get("#category").type(productCategory);
    cy.contains("button","Add Product").click();

    cy.on("window : alert",(alertMessage)=>{
        expect(alertMessage).should("contain.text","Product added successfully!");
        return true;
    })
})

Cypress.Commands.add("cancelAddNewProductsAction",(productName, productPrice, productCategory)=>{
    cy.visit("/dashboard");
    cy.contains("button","Go to Add Product").click().wait(500);
    cy.url().should("include","add-product");
    cy.get("h1").should("contain.text","Add New Product");
    cy.get("form").then(($form)=>{
        cy.wrap($form).find('[class="form-group"]').should("have.length",3);
    });
    cy.get("#name").type(productName);
    cy.get("#price").type(productPrice);
    cy.get("#category").type(productCategory);
    cy.contains("button","Cancel").click();
})