
// kiểm thử chức năng tạo sản phẩm mới

describe('Update Product Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.loginsignup-fields').find('input[type="email"]').type('20020483@gmail.com')
        cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
        cy.get('form').submit();
        cy.contains('Quản lý sản phẩm').click()
        cy.get('.products-update-data').find('svg[id = "12"]').click();
    })
  
    // Test price
    it('Price Test 1', () => {
        cy.get('.update-product-right').find('input[name="price"]').clear().type('0')
        cy.get('.update-product-right').find('.btn-update-product').click()
        cy.get('.msg-update').should('contain', "Đã cập nhật sản phẩm thành công")
        cy.url().should('eq', 'http://localhost:3000/admin/products/list')
    })

    it('Price Test 2', () => {
        cy.get('.update-product-right').find('input[name="price"]').clear().type('-2')
        cy.get('.msg-update-error').should('contain', "Giá phải lớn hơn hoặc bằng 0")
        cy.get('.update-product-right').find('.btn-update-product').click()
        cy.get('.msg-update-error').should('contain', "Vui lòng điền đầy đủ thông tin!")
    })

    // Test quantity
    it('Quantity Test 1', () => {
        cy.get('.update-product-right').find('input[name="quantity"]').clear().type('99')
        cy.get('.update-product-right').find('.btn-update-product').click()
        cy.get('.msg-update').should('contain', "Đã cập nhật sản phẩm thành công")
        cy.url().should('eq', 'http://localhost:3000/admin/products/list')
    })

    it('Quantity Test 2', () => {
        cy.get('.update-product-right').find('input[name="quantity"]').clear().type('-2')
        cy.get('.msg-update-error').should('contain', "Số lượng kho phải lớn hơn hoặc bằng 0")
        cy.get('.update-product-right').find('.btn-update-product').click()
        cy.get('.msg-update-error').should('contain', "Vui lòng điền đầy đủ thông tin!")
    })


    // Test thumbnail
    it('Thumbnail Test 1', () => {
        cy.get('.update-product-right').find('input[name="thumbnail"]').selectFile('c:/Workspace/project_int3509/testing/cypress/e2e/image/test.jpg')
        cy.get('.update-product-right').find('.btn-update-product').click()
        cy.get('.msg-update').should('contain', "Đã cập nhật sản phẩm thành công")
        cy.url().should('eq', 'http://localhost:3000/admin/products/list')
    })
  
    // Test description
    it('Description Test 1', () => {
        cy.get('.update-product-right').find('input[name="description"]').clear().type('Description 1')
        cy.get('.update-product-right').find('.btn-update-product').click()
        cy.get('.msg-update').should('contain', "Đã cập nhật sản phẩm thành công")
        cy.url().should('eq', 'http://localhost:3000/admin/products/list')
    })

    it('Description Test 2', () => {
        cy.get('.update-product-right').find('input[name="description"]').clear().type('Nội dung mô tả sản phẩm có độ dài lớn hơn 50 kí tự .................................')
        cy.get('.msg-update-error').should('contain', "Mô tả sản phẩm không được quá 30 kí tự")
    })

    // Test product type
    it('Product Type Test 1', () => {
        cy.get('.update-product-right').find('select[name="product_type"]').select('Mua')
        cy.get('.update-product-right').find('.btn-update-product').click()
        cy.get('.msg-update').should('contain', "Đã cập nhật sản phẩm thành công")
        cy.url().should('eq', 'http://localhost:3000/admin/products/list')
    })
})