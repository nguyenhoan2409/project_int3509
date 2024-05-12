describe("Create Request Page of User Role", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000"); 
        cy.get("input[name='email']").type("hoanpro24092002@gmail.com"); 
        cy.get("input[name='password']").type("2409"); 
        cy.get("button[type='submit']").click(); 
        cy.url().should("eq", "http://localhost:3000/home"); 
        cy.get('.navbar-container').should("be.visible"); 
        cy.get('.nav-menu > li:nth-child(2) > a:nth-child(2)').click();
    })

    // borrowing 
    it("valid info for borrowing", () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let formattedDate = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day; 
        cy.get("div[class='shopcategory-products'] div:nth-child(1) button.btn-request").should("contain", "Mượn").click(); 
        cy.url().should("contain", "http://localhost:3000/create-request"); 
        cy.get(".createRequestContainer").should("be.visible"); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)").click().type(formattedDate); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)").click().type(formattedDate); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)").click();
        cy.get('[data-value="1"]').click();  
        cy.get("button[type='submit']").click(); 
        cy.get("div[role='alert']").should("be.visible").should("contain", "Yêu cầu đã được tạo thành công, đang chuyển hướng...")
        cy.url({timeout: 1000}).should("contain", "http://localhost:3000/request"); 
    })

    it("lack all information for borrowing", () => {
        cy.get("div[class='shopcategory-products'] div:nth-child(1) button.btn-request").should("contain", "Mượn").click(); 
        cy.url().should("contain", "http://localhost:3000/create-request"); 
        cy.get(".createRequestContainer").should("be.visible");
        cy.get("button[type='submit']").click(); 
        cy.get(".create-request-form-container > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)").should("contain", "Vui lòng nhập ngày bắt đầu yêu cầu."); 
        cy.get(".create-request-form-container > div:nth-child(1) > div:nth-child(2) > p:nth-child(3)").should("contain", "Vui lòng nhập ngày kết thúc yêu cầu dự kiến.");
        cy.get(".create-request-form-container > div:nth-child(2) > div:nth-child(1) > p:nth-child(3)").should("contain", "Vui lòng lựa chọn khung giờ"); 
    })

    it("lack ending time for borrowing", () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let formattedDate = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day; 
        cy.get("div[class='shopcategory-products'] div:nth-child(1) button.btn-request").should("contain", "Mượn").click(); 
        cy.url().should("contain", "http://localhost:3000/create-request"); 
        cy.get(".createRequestContainer").should("be.visible");
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)").click().type(formattedDate); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)").click();
        cy.get('[data-value="1"]').click();  
        cy.get("button[type='submit']").click(); 
        cy.get(".create-request-form-container > div:nth-child(1) > div:nth-child(2) > p:nth-child(3)").should("contain", "Vui lòng nhập ngày kết thúc yêu cầu dự kiến."); 
    })

    it("lack timeline for borrowing", () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let formattedDate = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day; 
        cy.get("div[class='shopcategory-products'] div:nth-child(1) button.btn-request").should("contain", "Mượn").click(); 
        cy.url().should("contain", "http://localhost:3000/create-request"); 
        cy.get(".createRequestContainer").should("be.visible");
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)").click().type(formattedDate); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)").click().type(formattedDate); 
        cy.get("button[type='submit']").click(); 
        cy.get(".create-request-form-container > div:nth-child(2) > div:nth-child(1) > p:nth-child(3)").should("contain", "Vui lòng lựa chọn khung giờ"); 
    })

    it("lack starting time for borrowing", () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let formattedDate = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day; 
        cy.get("div[class='shopcategory-products'] div:nth-child(1) button.btn-request").should("contain", "Mượn").click(); 
        cy.url().should("contain", "http://localhost:3000/create-request"); 
        cy.get(".createRequestContainer").should("be.visible");
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)").click().type(formattedDate); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)").click();
        cy.get('[data-value="1"]').click();  
        cy.get("button[type='submit']").click(); 
        cy.get(".create-request-form-container > div:nth-child(1) > div:nth-child(1) > p:nth-child(3)").should("contain", "Vui lòng nhập ngày bắt đầu yêu cầu."); 
    })

    it("ending time is after starting time", () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let formattedDate = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day; 
        cy.get("div[class='shopcategory-products'] div:nth-child(1) button.btn-request").should("contain", "Mượn").click(); 
        cy.url().should("contain", "http://localhost:3000/create-request"); 
        cy.get(".createRequestContainer").should("be.visible");
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)").click().type(formattedDate); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)").click().type("2023-05-05"); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)").click();
        cy.get('[data-value="1"]').click();  
        cy.get("button[type='submit']").click(); 
        cy.get(".create-request-form-container > div:nth-child(1) > div:nth-child(2) > p:nth-child(3)").should("contain", "Ngày kết thúc không thể sau ngày bắt đầu."); 
    })

    it("quantity is bigger than its quantity in stock", () => {
        let currentDate = new Date();
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let formattedDate = year + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day; 
        cy.get("div[class='shopcategory-products'] div:nth-child(1) button.btn-request").should("contain", "Mượn").click(); 
        cy.url().should("contain", "http://localhost:3000/create-request"); 
        cy.get(".createRequestContainer").should("be.visible");
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2)").click().type(formattedDate); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2)").click().type(formattedDate); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2)").click();
        cy.get('[data-value="1"]').click(); 
        cy.get(".create-request-container-right > form:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(2)").click().type(1000000);
        cy.get("button[type='submit']").click(); 
        cy.get(".errorInfo").should("contain", "Số lượng còn lại không đủ để đáp ứng yêu cầu. Vui lòng chọn số lượng nhỏ hơn"); 
    })

    // buying 

    // renting 

})