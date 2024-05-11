describe('Search Score By Admin Test ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.loginsignup-fields').find('input[type="email"]').type('20020483@gmail.com')
        cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
        cy.get('form').submit();
        cy.contains('Quản lý điểm').click()
    })
    it('Search by MSSV', () => {
        cy.get('.search-admin').find('input[placeholder="Mssv .."]').type('10000001')
        cy.contains('Tìm kiếm').click()
        cy.get('.mssv-admin-td').should('contain', '10000001')
    })

    
    /*
    it('Search error by MSSV', () => {
        cy.get('.search-admin').find('input[placeholder="Mssv .."]').type('10000003')
        cy.contains('Tìm kiếm').click()
        cy.get('.no-data-admin').should('contain', 'Không có dữ liệu')
    })
    */
    
    

    it('Search by Name', () => {
        cy.get('.search-admin').find('input[placeholder="Họ và tên .."]').type('Test Name 1')
        cy.contains('Tìm kiếm').click()
        cy.get('.fullname-admin-td').should('contain', 'Test Name 1')
    })

    
    /* 
    it('Search error by Name', () => {
        cy.get('.search-admin').find('input[placeholder="Họ và tên .."]').type('test name')
        cy.contains('Tìm kiếm').click()
        cy.get('.no-data-admin').should('contain', 'Không có dữ liệu')
    })
    */
    

    it('Search by Class', () => {
        cy.get('.search-admin').find('input[placeholder="Lớp .."]').type('Class 1')
        cy.contains('Tìm kiếm').click()
        cy.get('.class-admin-td').should('contain', 'Class 1')
    })

   
    /*
    it('Search error by Class', () => {
        cy.get('.search-admin').find('input[placeholder="Lớp .."]').type('test class')
        cy.contains('Tìm kiếm').click()
        cy.get('.no-data-admin').should('contain', 'Không có dữ liệu')
    })
    */

    it('Search by University', () => {
        cy.get('.search-admin').find('input[placeholder="Trường .."]').type('Test Uni')
        cy.contains('Tìm kiếm').click()
        cy.get('.university-admin-td').should('contain', 'Test Uni')
    })

   /*  it('Search error by Class', () => {
        cy.get('.search-admin').find('input[placeholder="Trường .."]').type('test university')
        cy.contains('Tìm kiếm').click()
        cy.get('.no-data-admin').should('contain', 'Không có dữ liệu')
    })
    */

    it('Search by CDR= Đ ', () => {
        cy.get('.search-admin').find('select[name="CDR"]').select('Đạt')
        cy.contains('Tìm kiếm').click()
        cy.get('.CDR-admin-td').should('contain', 'Đ')
    })

    it('Search by CDR= CĐ', () => {
        cy.get('.search-admin').find('select[name="CDR"]').select('Không')
        cy.contains('Tìm kiếm').click()
        cy.get('.CDR-admin-td').should('not.contain', 'Đ')
    })

    it('Search by all', () => {
        cy.get('.search-admin').find('input[placeholder="Mssv .."]').type('10000001')
        cy.get('.search-admin').find('input[placeholder="Họ và tên .."]').type('Test Name 1')
        cy.get('.search-admin').find('input[placeholder="Lớp .."]').type('Class 1')
        cy.get('.search-admin').find('input[placeholder="Trường .."]').type('Test Uni')
        cy.contains('Tìm kiếm').click()
        cy.get('.mssv-admin-td').should('contain', '10000001')
        cy.get('.fullname-admin-td').should('contain', 'Test Name 1')
        cy.get('.class-admin-td').should('contain', 'Class 1')
        cy.get('.university-admin-td').should('contain', 'Test Uni')
    })
})



 