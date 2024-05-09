describe('Filter Score(Admin) Test ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.loginsignup-fields').find('input[type="email"]').type('20020483@gmail.com')
        cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
        cy.get('form').submit();
        cy.contains('Quản lý điểm').click()
    })
    it('Search by MSSV', () => {
        cy.get('.search-admin').find('input[placeholder="Mssv .."]').type('20020483')
        cy.contains('Tìm kiếm').click()
        cy.get('.mssv-admin-td').should('contain', '20020483')
    })

    /*
    it('Search error by MSSV', () => {
        cy.get('.search-admin').find('input[placeholder="Mssv .."]').type('0')
        cy.contains('Tìm kiếm').click()
        cy.get('.no-data-admin').should('contain', 'Không có dữ liệu')
    })
    */
    

    it('Search by Name', () => {
        cy.get('.search-admin').find('input[placeholder="Họ và tên .."]').type('Nguyễn Thị Thu Trang')
        cy.contains('Tìm kiếm').click()
        cy.get('.fullname-admin-td').should('contain', 'Nguyễn Thị Thu Trang')
    })

    
    /* 
    it('Search error by Name', () => {
        cy.get('.search-admin').find('input[placeholder="Họ và tên .."]').type('test name')
        cy.contains('Tìm kiếm').click()
        cy.get('.no-data-admin').should('contain', 'Không có dữ liệu')
    })
    */
    

    it('Search by Class', () => {
        cy.get('.search-admin').find('input[placeholder="Lớp .."]').type('QH-2020-I/CQ-C-D')
        cy.contains('Tìm kiếm').click()
        cy.get('.class-admin-td').should('contain', 'QH-2020-I/CQ-C-D')
    })

   
    /*
    it('Search error by Class', () => {
        cy.get('.search-admin').find('input[placeholder="Lớp .."]').type('test class')
        cy.contains('Tìm kiếm').click()
        cy.get('.no-data-admin').should('contain', 'Không có dữ liệu')
    })
    */

    it('Search by University', () => {
        cy.get('.search-admin').find('input[placeholder="Trường .."]').type('ULIS')
        cy.contains('Tìm kiếm').click()
        cy.get('.university-admin-td').should('contain', 'ULIS')
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
        cy.get('.search-admin').find('input[placeholder="Mssv .."]').type('20020483')
        cy.get('.search-admin').find('input[placeholder="Họ và tên .."]').type('Nguyễn Thị Thu Trang')
        cy.get('.search-admin').find('input[placeholder="Lớp .."]').type('QH-2020-I/CQ-C-D')
        cy.get('.search-admin').find('input[placeholder="Trường .."]').type('UET')
        cy.contains('Tìm kiếm').click()
        cy.get('.mssv-admin-td').should('contain', '20020483')
        cy.get('.fullname-admin-td').should('contain', 'Nguyễn Thị Thu Trang')
        cy.get('.class-admin-td').should('contain', 'QH-2020-I/CQ-C-D')
        cy.get('.university-admin-td').should('contain', 'UET')
    })
})

describe('Filter User(User) Test ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.loginsignup-fields').find('input[type="email"]').type('trang42a1dqh@gmail.com')
        cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
        cy.get('form').submit();
        cy.contains('Tra cứu điểm').click()
    })

    it('Search by MSSV', () => {
        cy.get('.search').find('input[placeholder="Mssv .."]').type('20020483')
        cy.contains('Tìm kiếm').click()
        cy.get('.mssv').should('contain', '20020483')
    })

    it('Search by Name', () => {
        cy.get('.search').find('input[placeholder="Họ và tên .."]').type('Nguyễn Thị Thu Trang')
        cy.contains('Tìm kiếm').click()
        cy.get('.fullname').should('contain', 'Nguyễn Thị Thu Trang')
    })

    it('Search by Class', () => {
        cy.get('.search').find('input[placeholder="Lớp .."]').type('QH-2020-I/CQ-C-D')
        cy.contains('Tìm kiếm').click()
        cy.get('.class').should('contain', 'QH-2020-I/CQ-C-D')
    })

    it('Search by University', () => {
        cy.get('.search').find('input[placeholder="Trường .."]').type('UL')
        cy.contains('Tìm kiếm').click()
        cy.get('.university').should('contain', 'UL')
    })

    it('Search by all ', () => {
        cy.get('.search').find('input[placeholder="Mssv .."]').type('20020483')
        cy.get('.search').find('input[placeholder="Họ và tên .."]').type('Nguyễn Thị Thu Trang')
        cy.get('.search').find('input[placeholder="Lớp .."]').type('QH-2020-I/CQ-C-D')
        cy.get('.search').find('input[placeholder="Trường .."]').type('UET')
        cy.contains('Tìm kiếm').click()
        cy.get('.mssv').should('contain', '20020483')
        cy.get('.fullname').should('contain', 'Nguyễn Thị Thu Trang')
        cy.get('.class').should('contain', 'QH-2020-I/CQ-C-D')
        cy.get('.university').should('contain', 'UET')
    })
})

 