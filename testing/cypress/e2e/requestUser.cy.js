describe("Request Page Of User Role", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000"); 
        cy.get("input[name='email']").type("hoanpro24092002@gmail.com"); 
        cy.get("input[name='password']").type("2409"); 
        cy.get("button[type='submit']").click(); 
        cy.url().should("eq", "http://localhost:3000/home"); 
        cy.get('.navbar-container').should("be.visible"); 
        cy.get('.nav-menu > li:nth-child(4) > a:nth-child(2)').click(); 
    })

    it("show full information of request page", () => {
        cy.get(".request-filter-container").should('be.visible'); 
        cy.get("table[aria-label='sticky table']").should('be.visible'); 
    })

    it("test product name filter", () => {
        cy.get(".request-filter-container > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)").click(); 
        cy.get("div[id='menu-'] li:nth-child(2)").click(); 
        cy.get("button.submitBtn-filter").click(); 
        cy.get("tbody tr:nth-child(1)").should('be.visible'); 
        cy.get("tbody tr:nth-child(1) td:nth-child(2)").should("contain", "Bóng rổ"); 
    })

    it("test starting time filter", () => {
        cy.get(".request-filter-container > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)").click().type("2024-05-02"); 
        cy.get("button.submitBtn-filter").click();
        cy.get("tbody tr:nth-child(1)").should('be.visible'); 
        cy.get("tbody tr:nth-child(1) td:nth-child(4)").should("contain", "02-05-2024");
    })

    it("test ending time filter", () => {
        cy.get(".request-filter-container > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)").click().type("2024-05-05"); 
        cy.get("button.submitBtn-filter").click();
        cy.get("tbody tr:nth-child(1)").should('be.visible'); 
        cy.get("tbody tr:nth-child(1) td:nth-child(4)").should("contain", "05-05-2024");
    })

    it("test request status filter", () => {
        cy.get(".request-filter-container > div:nth-child(4) > div:nth-child(2) > div:nth-child(1)").click(); 
        cy.get("div[id='menu-'] li:nth-child(2)").click(); 
        cy.get("button.submitBtn-filter").click(); 
        cy.get("tbody tr:nth-child(1)").should('be.visible'); 
        cy.get("tbody tr:nth-child(1) td:nth-child(6)").should("contain", "Đang gửi yêu cầu mượn đồ và đợi admin xử lý"); 
    })

    it("test return-default filter", () => {
        cy.get(".request-filter-container > div:nth-child(1) > div:nth-child(2) > div:nth-child(1)").click(); 
        cy.get("div[id='menu-'] li:nth-child(2)").click(); 
        cy.get("button.submitBtn-filter").click(); 
        cy.get("tbody tr:nth-child(1)").should('be.visible'); 
        cy.get("tbody tr:nth-child(1) td:nth-child(2)").should("contain", "Bóng rổ"); 
        cy.get(".MuiTablePagination-displayedRows").should("contain", "1–1 trong 1"); 
        cy.get("button.returnToDefaultBtn-filter").click(); 
        cy.get(".MuiTablePagination-displayedRows").should("contain", "1–3 trong 3");
    })

    it("test request detail information", () => {
        cy.get("tbody tr:nth-child(1)").should('be.visible'); 
        cy.get("tbody tr:nth-child(1) td:nth-child(7) button.request-detail-btn").click();
        cy.get(".modal-request-detail-container").should("be.visible"); 
    })
})