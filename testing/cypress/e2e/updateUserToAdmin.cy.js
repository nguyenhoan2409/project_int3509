describe('Update User To Admin Test ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.loginsignup-fields').find('input[type="email"]').type('20020483@gmail.com')
        cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
        cy.get('form').submit();
        cy.contains('Quản lý người dùng').click()
    })

    it('Update User To Admin Test 1', () => {
        cy.get('td[id="2"].role').should('contain', 'Người dùng')
        cy.get('.action').find('div[id="2"]').should('contain', 'Cấp quyền admin')
        cy.get('.action').find('div[id="2"]').contains('Cấp quyền admin').click()
        cy.get('.action').find('div[id="2"]').should('not.contain', 'Cấp quyền admin')
        cy.get('td[id="2"].role').should('contain', 'Quản trị viên')
    })

    it('Check Admin', () => {
        cy.get('.action').find('div[id="3"]').should('not.contain', 'Cấp quyền admin')
        cy.get('td[id="3"].role').should('contain', 'Quản trị viên')
    })

    it('Check User', () => {
        cy.get('.action').find('div[id="4"]').should('contain', 'Cấp quyền admin')
        cy.get('td[id="4"].role').should('contain', 'Người dùng')
    })
})
