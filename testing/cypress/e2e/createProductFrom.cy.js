
// kiểm thử chức năng tạo sản phẩm mới

describe('Create Product Test', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/')
      cy.get('.loginsignup-fields').find('input[type="email"]').type('20020483@gmail.com')
      cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
      cy.get('form').submit();
  })

  // tạo sản phẩm thành công
  it('Create Product Test 1', () => {
      cy.contains('Quản lý sản phẩm').click()
      cy.contains('Thêm sản phẩm').click();  
      cy.get('.create-product-form').find('input[name="product_name"]').type('Product 1')
      cy.get('.create-product-form').find('input[name="price"]').type('0')
      cy.get('.create-product-form').find('input[name="quantity"]').type('100')
      cy.get('.create-product-form').find('input[name="description"]').type('test 1')
      cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('c:/Workspace/project_int3509/testing/cypress/e2e/image/test.jpg')
      cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
      cy.get('.create-product-form').find('.create-product-btn').click();
      cy.url().should('eq', 'http://localhost:3000/admin/products/list')
  })

  //nhập thiếu trường tên
  it('Create Product Test 2', () => {
    cy.contains('Quản lý sản phẩm').click()
    cy.contains('Thêm sản phẩm').click();  
    cy.get('.create-product-form').find('input[name="price"]').type('0')
    cy.get('.create-product-form').find('input[name="quantity"]').type('100')
    cy.get('.create-product-form').find('input[name="description"]').type('test 2')
    cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('c:/Workspace/project_int3509/testing/cypress/e2e/image/test.jpg')
    cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
    cy.get('.create-product-form').find('.create-product-btn').click();
    cy.get('.create-product-form').find('.msg-create-error').should('contain', "Vui lòng điền đầy đủ thông tin!")
})

 //nhập thiếu trường giá
it('Create Product Test 3', () => {
  cy.contains('Quản lý sản phẩm').click()
  cy.contains('Thêm sản phẩm').click();  
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product 3')
  cy.get('.create-product-form').find('input[name="quantity"]').type('100')
  cy.get('.create-product-form').find('input[name="description"]').type('test 3')
  cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('c:/Workspace/project_int3509/testing/cypress/e2e/image/test.jpg')
  cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Vui lòng điền đầy đủ thông tin!")
})

//nhập thiếu trường số lượng kho
it('Create Product Test 4', () => {
  cy.contains('Quản lý sản phẩm').click()
  cy.contains('Thêm sản phẩm').click();  
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product 4')
  cy.get('.create-product-form').find('input[name="price"]').type('0')
  cy.get('.create-product-form').find('input[name="description"]').type('test 4')
  cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('c:/Workspace/project_int3509/testing/cypress/e2e/image/test.jpg')
  cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Vui lòng điền đầy đủ thông tin!")
})

//không import ảnh
it('Create Product Test 5', () => {
  cy.contains('Quản lý sản phẩm').click()
  cy.contains('Thêm sản phẩm').click();  
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product 5')
  cy.get('.create-product-form').find('input[name="price"]').type('0')
  cy.get('.create-product-form').find('input[name="quantity"]').type('100')
  cy.get('.create-product-form').find('input[name="description"]').type('test 5')
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Vui lòng điền đầy đủ thông tin!")
})

// không chọn product_type
it('Create Product Test 6', () => {
  cy.contains('Quản lý sản phẩm').click()
  cy.contains('Thêm sản phẩm').click();  
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product 6')
  cy.get('.create-product-form').find('input[name="price"]').type('0')
  cy.get('.create-product-form').find('input[name="quantity"]').type('100')
  cy.get('.create-product-form').find('input[name="description"]').type('test 6')
  cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('c:/Workspace/project_int3509/testing/cypress/e2e/image/test.jpg')
  cy.get('.create-product-form').find('select[name="product_type"]').should('contain', "Mượn")
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.url().should('eq', 'http://localhost:3000/admin/products/list')
})

// nhập price nhỏ hơn 0
it('Create Product Test 7', () => {
  cy.contains('Quản lý sản phẩm').click()
  cy.contains('Thêm sản phẩm').click();  
  cy.get('.create-product-form').find('input[name="price"]').type('-1')
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Giá phải lớn hơn hoặc bằng 0")
})

// nhập price nhỏ hơn 0
it('Create Product Test 8', () => {
  cy.contains('Quản lý sản phẩm').click()
  cy.contains('Thêm sản phẩm').click();  
  cy.get('.create-product-form').find('input[name="quantity"]').type('-1')
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Số lượng trong kho phải lớn hơn hoặc bằng 0")
})

// nhập tên quá 30 kí tự
it('Create Product Test 9', () => {
  cy.contains('Quản lý sản phẩm').click()
  cy.contains('Thêm sản phẩm').click();  
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product test case check product name')
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Tên sản phẩm phải nhỏ hoặc bằng 30 ký tự")
})

// bỏ trống tên
it('Create Product Test 10', () => {
  cy.contains('Quản lý sản phẩm').click()
  cy.contains('Thêm sản phẩm').click();  
  cy.get('.create-product-form').find('input[name="product_name"]').type('test').clear()
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Tên sản phẩm không được để trống")
})

//kiểm tra trùng sản phẩm
it('Create Product Test 11', () => {
  cy.contains('Quản lý sản phẩm').click()
  cy.contains('Thêm sản phẩm').click();  
  cy.get('.create-product-form').find('input[name="product_name"]').type('Bóng đá')
  cy.get('.create-product-form').find('input[name="price"]').type('0')
  cy.get('.create-product-form').find('input[name="quantity"]').type('100')
  cy.get('.create-product-form').find('input[name="description"]').type('test 1')
  cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('c:/Workspace/project_int3509/testing/cypress/e2e/image/test.jpg')
  cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Tên sản phẩm đã tồn tại, vui lòng nhập tên khác")
})

})