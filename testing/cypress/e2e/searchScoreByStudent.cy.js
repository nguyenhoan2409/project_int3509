describe('Search Score By Student Test ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.loginsignup-fields').find('input[type="email"]').type('trang42a1dqh@gmail.com')
        cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
        cy.get('form').submit();
        cy.contains('Tra cứu điểm').click()
    })

    it('Search by MSSV', () => {
        cy.get('.search').find('input[placeholder="Mssv .."]').type('10000001')
        cy.contains('Tìm kiếm').click()
        cy.get('.mssv').should('contain', '10000001')
    })

    it('Search by Name', () => {
        cy.get('.search').find('input[placeholder="Họ và tên .."]').type('Test Name 1')
        cy.contains('Tìm kiếm').click()
        cy.get('.fullname').should('contain', 'Test Name 1')
    })

    it('Search by Class', () => {
        cy.get('.search').find('input[placeholder="Lớp .."]').type('Class 1')
        cy.contains('Tìm kiếm').click()
        cy.get('.class').should('contain', 'Class 1')
    })

    it('Search by University', () => {
        cy.get('.search').find('input[placeholder="Trường .."]').type('Test Uni')
        cy.contains('Tìm kiếm').click()
        cy.get('.university').should('contain', 'Test Uni')
    })

    it('Search by all ', () => {
        cy.get('.search').find('input[placeholder="Mssv .."]').type('10000001')
        cy.get('.search').find('input[placeholder="Họ và tên .."]').type('Test Name 1')
        cy.get('.search').find('input[placeholder="Lớp .."]').type('Class 1')
        cy.get('.search').find('input[placeholder="Trường .."]').type('Test Uni')
        cy.contains('Tìm kiếm').click()
        cy.get('.mssv').should('contain', '10000001')
        cy.get('.fullname').should('contain', 'Test Name 1')
        cy.get('.class').should('contain', 'Class 1')
        cy.get('.university').should('contain', 'Test Uni')
    })
})