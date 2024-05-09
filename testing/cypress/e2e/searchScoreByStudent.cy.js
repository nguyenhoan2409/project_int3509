describe('Search Score By Student Test ', () => {
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