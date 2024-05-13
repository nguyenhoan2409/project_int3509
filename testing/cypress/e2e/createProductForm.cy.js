
// kiểm thử chức năng tạo sản phẩm mới

describe('Create Product Test', () => {
  beforeEach(() => {
      cy.visit('http://localhost:3000/')
      cy.get('.loginsignup-fields').find('input[type="email"]').type('20020483@gmail.com')
      cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
      cy.get('form').submit();
      cy.contains('Quản lý sản phẩm').click()
      cy.contains('Thêm sản phẩm').click(); 
  })

  // tạo sản phẩm thành công
it('Create Product Test 1', () => { 
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product 1')
  cy.get('.create-product-form').find('input[name="price"]').type('0')
  cy.get('.create-product-form').find('input[name="quantity"]').type('100')
  cy.get('.create-product-form').find('input[name="description"]').type('test 1')
  cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('cypress/e2e/image/test.jpg')
  cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.url().should('eq', 'http://localhost:3000/admin/products/list')
  })

  //kiểm tra trùng sản phẩm
it('Create Product Test 2', () => { 
  cy.get('.create-product-form').find('input[name="product_name"]').type('Bóng đá')
  cy.get('.create-product-form').find('input[name="price"]').type('0')
  cy.get('.create-product-form').find('input[name="quantity"]').type('100')
  cy.get('.create-product-form').find('input[name="description"]').type('test 1')
  cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile("cypress/e2e/image/test.jpg");
  cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Tên sản phẩm đã tồn tại, vui lòng nhập tên khác")
})


  //nhập thiếu trường tên
  it('Create Product Test Product Name 1', () => {
    cy.get('.create-product-form').find('input[name="price"]').type('0')
    cy.get('.create-product-form').find('input[name="quantity"]').type('100')
    cy.get('.create-product-form').find('input[name="description"]').type('test 2')
    cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('cypress/e2e/image/test.jpg')
    cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
    cy.get('.create-product-form').find('.create-product-btn').click();
    cy.get('.create-product-form').find('.msg-create-error').should('contain', "Vui lòng điền đầy đủ thông tin!")
})

// nhập tên quá 30 kí tự
it('Create Product Test Product Name 2', () => {  
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product test case check product name')
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Tên sản phẩm phải nhỏ hoặc bằng 30 ký tự")
})

// bỏ trống tên
it('Create Product Test Product Name 3', () => { 
  cy.get('.create-product-form').find('input[name="product_name"]').type('test').clear()
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Tên sản phẩm không được để trống")
})

 //nhập thiếu trường giá
it('Create Product Test Price 1', () => {
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product 3')
  cy.get('.create-product-form').find('input[name="quantity"]').type('100')
  cy.get('.create-product-form').find('input[name="description"]').type('test 3')
  cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('cypress/e2e/image/test.jpg')
  cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Vui lòng điền đầy đủ thông tin!")
})

// nhập price nhỏ hơn 0
it('Create Product Test Price 2', () => { 
  cy.get('.create-product-form').find('input[name="price"]').type('-1')
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Giá phải lớn hơn hoặc bằng 0")
})

//nhập thiếu trường số lượng kho
it('Create Product Test Quantity 1', () => {  
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product 4')
  cy.get('.create-product-form').find('input[name="price"]').type('0')
  cy.get('.create-product-form').find('input[name="description"]').type('test 4')
  cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('cypress/e2e/image/test.jpg')
  cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Vui lòng điền đầy đủ thông tin!")
})

// nhập quantity nhỏ hơn 0
it('Create Product Test Quantity 2', () => {
  cy.get('.create-product-form').find('input[name="quantity"]').type('-1')
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Số lượng trong kho phải lớn hơn hoặc bằng 0")
})

//không import ảnh
it('Create Product Test Thumbnail', () => { 
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product 5')
  cy.get('.create-product-form').find('input[name="price"]').type('0')
  cy.get('.create-product-form').find('input[name="quantity"]').type('100')
  cy.get('.create-product-form').find('input[name="description"]').type('test 5')
  cy.get('.create-product-form').find('select[name="product_type"]').select('Mượn')
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.get('.create-product-form').find('.msg-create-error').should('contain', "Vui lòng điền đầy đủ thông tin!")
})

// không chọn product_type
it('Create Product Test Product Type', () => { 
  cy.get('.create-product-form').find('input[name="product_name"]').type('Product 6')
  cy.get('.create-product-form').find('input[name="price"]').type('0')
  cy.get('.create-product-form').find('input[name="quantity"]').type('100')
  cy.get('.create-product-form').find('input[name="description"]').type('test 6')
  cy.get('.create-product-form').find('input[name="thumbnail"]').selectFile('cypress/e2e/image/test.jpg')
  cy.get('.create-product-form').find('select[name="product_type"]').should('contain', "Mượn")
  cy.get('.create-product-form').find('.create-product-btn').click();
  cy.url().should('eq', 'http://localhost:3000/admin/products/list')
})

it('Create Product Test Description', () => {
  cy.get('.create-product-form').find('input[name="description"]').clear().type('Nội dung mô tả sản phẩm có độ dài lớn hơn 30 kí tự .................................')
  cy.get('.msg-create-error').should('contain', "Mô tả sản phẩm không được quá 30 kí tự")
})


})