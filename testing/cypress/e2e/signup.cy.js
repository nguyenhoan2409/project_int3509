describe("SignUp Page Tests", () => {
    let newAccount = {};
  beforeEach(() => {  
    cy.visit("http://localhost:3000/signup");
    cy.fixture("./signup.json").then((data) => {
        newAccount = data[0]; 
    })
  });

  
  it("lack of all info", () => {
    cy.get("button[type='submit']").click();
    if (cy.get("input[name='email']").should("not.have.value")) {
      cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(1) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập email");
    }

    if (cy.get("input[name='password']").should("not.have.value")) {
      cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(2) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập mật khẩu.");
    }

    if (cy.get("input[name='confirmPassword']").should("not.have.value")) {
      cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(3) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập lại mật khẩu");
    }

    if (cy.get("input[name='fullname']").should("not.have.value")) {
      cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(4) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập họ và tên");
    }

    if (cy.get("input[name='phonenumber']").should("not.have.value")) {
      cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(5) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập số điện thoại");
    }

    if (cy.get("input[name='address']").should("not.have.value")) {
      cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(6) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập địa chỉ");
    }
  });

  it("lack of email", () => { 
    cy.get("input[name='password']").type(newAccount.password); 
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword); 
    cy.get("input[name='fullname']").type(newAccount.fullname); 
    cy.get("input[name='phonenumber']").type(newAccount.phonenumber); 
    cy.get("input[name='address']").type(newAccount.address); 
    cy.get("button[type='submit']").click();
    cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(1) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập email");
  });

  it("lack of password", () => { 
    cy.get("input[name='email']").type(newAccount.email); 
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword); 
    cy.get("input[name='fullname']").type(newAccount.fullname); 
    cy.get("input[name='phonenumber']").type(newAccount.phonenumber); 
    cy.get("input[name='address']").type(newAccount.address); 
    cy.get("button[type='submit']").click();
    cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(2) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập mật khẩu.");
  });

  it("lack of confimrPassword", () => { 
    cy.get("input[name='email']").type(newAccount.email); 
    cy.get("input[name='password']").type(newAccount.password); 
    cy.get("input[name='fullname']").type(newAccount.fullname); 
    cy.get("input[name='phonenumber']").type(newAccount.phonenumber); 
    cy.get("input[name='address']").type(newAccount.address); 
    cy.get("button[type='submit']").click();
    cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(3) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập lại mật khẩu");
  });

  it("lack of fullname", () => { 
    cy.get("input[name='email']").type(newAccount.email); 
    cy.get("input[name='password']").type(newAccount.password); 
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword); 
    cy.get("input[name='phonenumber']").type(newAccount.phonenumber); 
    cy.get("input[name='address']").type(newAccount.address); 
    cy.get("button[type='submit']").click();
    cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(4) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập họ và tên");
  });

  it("lack of phonenumber", () => { 
    cy.get("input[name='email']").type(newAccount.email); 
    cy.get("input[name='password']").type(newAccount.password); 
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword); 
    cy.get("input[name='fullname']").type(newAccount.fullname); 
    cy.get("input[name='address']").type(newAccount.address); 
    cy.get("button[type='submit']").click();
    cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(5) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập số điện thoại");
  });

  it("lack of address", () => { 
    cy.get("input[name='email']").type(newAccount.email); 
    cy.get("input[name='password']").type(newAccount.password); 
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword); 
    cy.get("input[name='fullname']").type(newAccount.fullname); 
    cy.get("input[name='phonenumber']").type(newAccount.phonenumber); 
    cy.get("button[type='submit']").click();
    cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(6) > p:nth-child(3)"
      ).should("contain", "Vui lòng nhập địa chỉ");
  });

  it("confirmPassword does not match with password", () => { 
    cy.get("input[name='password']").type(newAccount.password); 
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword + "1").blur(); 
    cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(3) > p:nth-child(3)"
      ).should("contain", "Mật khẩu nhập lại không trùng khớp");
  });

  it("invalid email as lack of @", () => { 
    cy.get("input[name='email']").type("hoanpro"); 
    cy.get("input[name='password']").type(newAccount.password); 
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword); 
    cy.get("input[name='fullname']").type(newAccount.fullname); 
    cy.get("input[name='phonenumber']").type(newAccount.phonenumber); 
    cy.get("input[name='address']").type(newAccount.address); 
    cy.get("button[type='submit']").click();
    cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(1) > p:nth-child(3)"
      ).should("contain", "Định dạng email cần có @");
  });

  it("invalid email as lack of .", () => { 
    cy.get("input[name='email']").type("hoanpro@gmail"); 
    cy.get("input[name='password']").type(newAccount.password); 
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword); 
    cy.get("input[name='fullname']").type(newAccount.fullname); 
    cy.get("input[name='phonenumber']").type(newAccount.phonenumber); 
    cy.get("input[name='address']").type(newAccount.address); 
    cy.get("button[type='submit']").click();
    cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(1) > p:nth-child(3)"
      ).should("contain", "Email cần chứa dấu .");
  });

  it("invalid vietnam phone type", () => { 
    cy.get("input[name='email']").type(newAccount.email); 
    cy.get("input[name='password']").type(newAccount.password); 
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword); 
    cy.get("input[name='fullname']").type(newAccount.fullname); 
    cy.get("input[name='phonenumber']").type("03845678"); 
    cy.get("input[name='address']").type(newAccount.address); 
    cy.get("button[type='submit']").click();
    cy.get(
        "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(5) > p:nth-child(3)"
      ).should("contain", "Số điện thoại không hợp lệ, định dạng chuẩn 10 số dạng 0xxxx.. hoặc +84xxxx..");
  });


  it("email already exists", () => { 
    cy.get("input[name='email']").type("hoanpro24092002@gmail.com"); 
    cy.get("input[name='password']").type(newAccount.password); 
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword); 
    cy.get("input[name='fullname']").type(newAccount.fullname); 
    cy.get("input[name='phonenumber']").type(newAccount.phonenumber); 
    cy.get("input[name='address']").type(newAccount.address); 
    cy.get("button[type='submit']").click();
    cy.get(
        ".erroInfo"
      ).should("contain", "Tài khoản đã tồn tại, vui lòng lựa chọn email khác.");
  });

  it("valid all informations to register", () => {
    cy.get("input[name='email']").type(newAccount.email);
    cy.get("input[name='password']").type(newAccount.password);
    cy.get("input[name='confirmPassword']").type(newAccount.confirmPassword);
    cy.get("input[name='fullname']").type(newAccount.fullname);
    cy.get("input[name='phonenumber']").type(newAccount.phonenumber);
    cy.get("input[name='address']").type(newAccount.address);
    cy.get("button[type='submit']").click();
    cy.url().should("eq", "http://localhost:3000/notificationLoginSignup");
  });
});
