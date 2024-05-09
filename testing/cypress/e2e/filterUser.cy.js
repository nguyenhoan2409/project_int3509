describe('Filter User Test ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.loginsignup-fields').find('input[type="email"]').type('20020483@gmail.com')
        cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
        cy.get('form').submit();
        cy.contains('Quản lý người dùng').click()
    })

    it('Search by Name', () => {
        cy.get('.search-user').find('input[placeholder="Họ và tên ..."]').type('Nguyễn Thu Trang')
        cy.get('.search-user-btn-admin').click()
        cy.get('.name').should('contain', 'Nguyễn Thu Trang')
    })

    it('Search by Name not found', () => {
        cy.get('.search-user').find('input[placeholder="Họ và tên ..."]').type('Test 1')
        cy.get('.search-user-btn-admin').click()
        cy.get('.no-data-user').should('contain', 'Không có dữ liệu')
    })

    it('Search by Email', () => {
        cy.get('.search-user').find('input[placeholder="Email ..."]').type('20020483@gmail.com')
        cy.get('.search-user-btn-admin').click()
        cy.get('.email').should('contain', '20020483@gmail.com')
    })

    it('Search by Email not found', () => {
        cy.get('.search-user').find('input[placeholder="Email ..."]').type('test@gmail.com')
        cy.get('.search-user-btn-admin').click()
        cy.get('.no-data-user').should('contain', 'Không có dữ liệu')
    })

    it('Search by Phone Number', () => {
        cy.get('.search-user').find('input[placeholder="SĐT ..."]').type('0373311038')
        cy.get('.search-user-btn-admin').click()
        cy.get('.phone').should('contain', '0373311038')
    })   

    it('Search by Email not found', () => {
        cy.get('.search-user').find('input[placeholder="SĐT ..."]').type('0123456789')
        cy.get('.search-user-btn-admin').click()
        cy.get('.no-data-user').should('contain', 'Không có dữ liệu')
    })
    
    it('Search by Address', () => {
        cy.get('.search-user').find('input[placeholder="Địa chỉ ..."]').type('Hưng Yên')
        cy.get('.search-user-btn-admin').click()
        cy.get('.address').should('contain', 'Hưng Yên')
    })   

    it('Search by Address not found', () => {
        cy.get('.search-user').find('input[placeholder="Địa chỉ ..."]').type('Test address')
        cy.get('.search-user-btn-admin').click()
        cy.get('.no-data-user').should('contain', 'Không có dữ liệu')
    })

    it('Search by RoleID = 1', () => {
        cy.get('.search-user').find('select[placeholder="Quyền"]').select('Người dùng')
        cy.get('.search-user-btn-admin').click()
        cy.get('.role').should('contain', 'Người dùng')
    })   

    it('Search by RoleID = 2', () => {
        cy.get('.search-user').find('select[placeholder="Quyền"]').select('Quản trị viên')
        cy.get('.search-user-btn-admin').click()
        cy.get('.role').should('contain', 'Quản trị viên')
    })   

    it('Search by all', () => {
        cy.get('.search-user').find('input[placeholder="Họ và tên ..."]').type('Nguyễn Thu Trang')
        cy.get('.search-user').find('input[placeholder="Email ..."]').type('20020483@gmail.com')
        cy.get('.search-user').find('input[placeholder="SĐT ..."]').type('0373311038')
        cy.get('.search-user').find('input[placeholder="Địa chỉ ..."]').type('Hưng Yên')
        cy.get('.search-user').find('select[placeholder="Quyền"]').select('Quản trị viên')
        cy.get('.search-user-btn-admin').click()
        cy.get('.name').should('contain', 'Nguyễn Thu Trang')
        cy.get('.email').should('contain', '20020483@gmail.com')
        cy.get('.phone').should('contain', '0373311038')
        cy.get('.address').should('contain', 'Hưng Yên')
        cy.get('.role').should('contain', 'Quản trị viên')
    })   

    it('Search by all error 1', () => {
        cy.get('.search-user').find('input[placeholder="Họ và tên ..."]').type('Test')
        cy.get('.search-user').find('input[placeholder="Email ..."]').type('20020483@gmail.com')
        cy.get('.search-user').find('input[placeholder="SĐT ..."]').type('0373311038')
        cy.get('.search-user').find('input[placeholder="Địa chỉ ..."]').type('Hưng Yên')
        cy.get('.search-user').find('select[placeholder="Quyền"]').select('Quản trị viên')
        cy.get('.search-user-btn-admin').click()
        cy.get('.no-data-user').should('contain', 'Không có dữ liệu')
    })   

    it('Search by all error 2', () => {
        cy.get('.search-user').find('input[placeholder="Họ và tên ..."]').type('Nguyễn Thu Trang')
        cy.get('.search-user').find('input[placeholder="Email ..."]').type('test@gmail.com')
        cy.get('.search-user').find('input[placeholder="SĐT ..."]').type('0373311038')
        cy.get('.search-user').find('input[placeholder="Địa chỉ ..."]').type('Hưng Yên')
        cy.get('.search-user').find('select[placeholder="Quyền"]').select('Quản trị viên')
        cy.get('.search-user-btn-admin').click()
        cy.get('.no-data-user').should('contain', 'Không có dữ liệu')
    })   

    it('Search by all error 3', () => {
        cy.get('.search-user').find('input[placeholder="Họ và tên ..."]').type('Nguyễn Thu Trang')
        cy.get('.search-user').find('input[placeholder="Email ..."]').type('20020483@gmail.com')
        cy.get('.search-user').find('input[placeholder="SĐT ..."]').type('0123456789')
        cy.get('.search-user').find('input[placeholder="Địa chỉ ..."]').type('Hưng Yên')
        cy.get('.search-user').find('select[placeholder="Quyền"]').select('Quản trị viên')
        cy.get('.search-user-btn-admin').click()
        cy.get('.no-data-user').should('contain', 'Không có dữ liệu')
    })  

    it('Search by all error 4', () => {
        cy.get('.search-user').find('input[placeholder="Họ và tên ..."]').type('Nguyễn Thu Trang')
        cy.get('.search-user').find('input[placeholder="Email ..."]').type('20020483@gmail.com')
        cy.get('.search-user').find('input[placeholder="SĐT ..."]').type('0373311038')
        cy.get('.search-user').find('input[placeholder="Địa chỉ ..."]').type('Test address')
        cy.get('.search-user').find('select[placeholder="Quyền"]').select('Quản trị viên')
        cy.get('.search-user-btn-admin').click()
        cy.get('.no-data-user').should('contain', 'Không có dữ liệu')
    })  

    it('Search by all error 5', () => {
        cy.get('.search-user').find('input[placeholder="Họ và tên ..."]').type('Nguyễn Thu Trang')
        cy.get('.search-user').find('input[placeholder="Email ..."]').type('20020483@gmail.com')
        cy.get('.search-user').find('input[placeholder="SĐT ..."]').type('0373311038')
        cy.get('.search-user').find('input[placeholder="Địa chỉ ..."]').type('Hưng Yên')
        cy.get('.search-user').find('select[placeholder="Quyền"]').select('Người dùng')
        cy.get('.search-user-btn-admin').click()
        cy.get('.no-data-user').should('contain', 'Không có dữ liệu')
    })  
})
