describe('Import Student - Score Test ', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.get('.loginsignup-fields').find('input[type="email"]').type('20020483@gmail.com')
        cy.get('.loginsignup-fields').find('input[type="password"]').type('trang')
        cy.get('form').submit();
        cy.contains('Quản lý điểm').click()
        cy.contains('Nhập điểm').click();
    })

    it('Import Student Test', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/k65cd.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'Đã thêm thành công')
    })

    it('Import Score Test 1', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/football.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'Đã thêm thành công')
    })

    it('Import Score Test 2', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/basketball.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'Đã thêm thành công')
    })
    it('Import Score Test 3', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/badminton.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'Đã thêm thành công')
    })
    it('Import Score Test 4', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/golf.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'Đã thêm thành công')
    })
    it('Import Score Test 5', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/tabletennis.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'Đã thêm thành công')
    })
    it('Import Score Test 6', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/taekwondo.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'Đã thêm thành công')
    })
    it('Import Score Test 7', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/volleyball.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'Đã thêm thành công')
    })
    it('Import Score Test 8', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/air_volleyball.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'Đã thêm thành công')
    })
    it('Import Error Test 1', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/error1.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'File không hợp lệ!')
    })
    it('Import Error Test 2', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/error2.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'File không hợp lệ!')
    })
    it('Import Error Test 3', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/error3.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'File không hợp lệ!')
    })
    it('Import Error Test 4', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/error4.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'File không hợp lệ!')
    })
    it('Import Error Test 5', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/error5.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'File không hợp lệ!')
    })
    it('Import Error Test 6', () => {
        cy.get('.score-student-add-input').selectFile('cypress/e2e/excel/error6.xlsx')
        cy.get('.score-student-add-button').click().click()
        cy.get('.table-data-res').find('h2').should('contain', 'File không hợp lệ!')
    })
  


    
})