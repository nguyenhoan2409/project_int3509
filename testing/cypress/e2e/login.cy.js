describe("Login Page Tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("valid email and valid password", () => {
    cy.get("input[name='email']").type("hoanpro24092002@gmail.com");
    cy.get("input[name='password']").type("2409");
    cy.get("button[type='submit']").click();
    cy.url().should("eq", "http://localhost:3000/home");
  });

  it("email not exist", () => {
    cy.get("input[name='email']").type("hoanpro2409@gmail.com");
    cy.get("input[name='password']").type("2409");
    cy.get("button[type='submit']").click();
    cy.get(".erroInfo")
      .should("be.visible")
      .should(
        "contain",
        "Tài khoản không tồn tại, vui lòng kiểm tra lại email"
      );
  });

  it("blank email and blank password", () => {
    cy.get("button[type='submit']").click();
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(1) > p:nth-child(3)"
    ).should("contain", "Vui lòng nhập email.");
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(2) > p:nth-child(3)"
    ).should("contain", "Vui lòng nhập mật khẩu.");
  });

  it("blank email and typed password", () => {
    cy.get("input[name='password']").type("2409");
    cy.get("button[type='submit']").click();
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(1) > p:nth-child(3)"
    ).should("contain", "Vui lòng nhập email.");
  });

  it("typed email and blank password", () => {
    cy.get("input[name='email']").type("hoanpro24092002@gmail.com");
    cy.get("button[type='submit']").click();
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(2) > p:nth-child(3)"
    ).should("contain", "Vui lòng nhập mật khẩu.");
  });

  it("wrong password", () => {
    cy.get("input[name='email']").type("hoanpro24092002@gmail.com");
    cy.get("input[name='password']").type("24092002");
    cy.get("button[type='submit']").click();
    cy.get(".erroInfo")
      .should("be.visible")
      .should("contain", "Mật khẩu nhập sai, vui lòng kiểm tra lại.");
  });

  it("forgot password and blank email", () => {
    cy.get(".forgottenPassword").click();
    cy.url().should("eq", "http://localhost:3000/notificationLoginSignup");
    cy.get("button[type='submit']").click();
    cy.get(
      ".MuiFormHelperText-root.Mui-error.MuiFormHelperText-sizeLarge.MuiFormHelperText-contained.css-1wc848c-MuiFormHelperText-root"
    ).contains("Vui lòng nhập email");
  });

  it("forgot password and email does not exist", () => {
    cy.get(".forgottenPassword").click();
    cy.url().should("eq", "http://localhost:3000/notificationLoginSignup");
    cy.get('input[name="forgottenPassword-email"]').type('hoan@gmail.com');
    cy.get("button[type='submit']").click();
    cy.get('.erroInfo').should("be.visible").should("contain", "Email người dùng không tồn tại, vui lòng kiểm tra lại"); 
  });
});
