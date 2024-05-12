describe("Request Page Of Admin Role", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000"); 
        cy.get("input[name='email']").type("20020483@gmail.com"); 
        cy.get("input[name='password']").type("trang"); 
        cy.get("button[type='submit']").click(); 
        cy.url().should("eq", "http://localhost:3000/admin/dashboard"); 
        cy.get('.sidebar-container').should("be.visible"); 
        cy.get('.sidebar-container > .menu-list-container > .menu-list > li:nth-child(3) > a:nth-child(1) > div:nth-child(1)').click();
    })

    it("show full information", () => {
        cy.get(".requestAdmin-filter-container").should('be.visible'); 
        cy.get("table[aria-label='sticky table']").should("be.visible"); 

        cy.get("#full-width-tab-1").click(); 
        cy.get(".requestAdmin-filter-container").should('be.visible'); 
        cy.get("table[aria-label='sticky table']").should("be.visible");

        cy.get("#full-width-tab-2").click(); 
        cy.get(".requestAdmin-filter-container").should('be.visible'); 
        cy.get("table[aria-label='sticky table']").should("be.visible");

        cy.get("#full-width-tab-3").click(); 
        cy.get(".requestAdmin-filter-container").should('be.visible'); 
        cy.get("table[aria-label='sticky table']").should("be.visible");
        
    })

    it("confirm request status to be approved", () => {
        cy.get("tbody tr:nth-child(1)").should("be.visible"); 
        cy.get("tbody > tr:nth-child(1) > td:nth-child(7) > div:nth-child(1) > button.confirm-approved-btn").click({force: true}); 
        cy.get("div[role='alert']").should("be.visible").should("contain", "Đã chấp nhận yêu cầu thành công"); 
    })

    it("confirm request status to be denied", () => {
        cy.get("tbody tr:nth-child(1)").should("be.visible"); 
        cy.get("tbody > tr:nth-child(1) > td:nth-child(7) > div:nth-child(1) > button.confirm-denied-btn").click({force: true}); 
        cy.get("div[role='alert']").should("be.visible").should("contain", "Đã từ chối yêu cầu thành công");
    })

    it("confirm request status to be completed", () => {
        cy.get("#full-width-tab-1").click(); 
        cy.get("tbody tr:nth-child(1)").should("be.visible"); 
        cy.get("tbody > tr:nth-child(1) > td:nth-child(8) > div:nth-child(1) > button.confirm-completed-btn").click({force: true}); 
        cy.get("div[role='alert']").should("be.visible").should("contain", "Yêu cầu đã hoàn tất và cập nhật thành công");
    })
})